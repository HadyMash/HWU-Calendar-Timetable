import express from 'express';
import cors from 'cors';
import { getCourses, getTimetable } from './pptr.js';
import { generateICS } from './generate-ics.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// TODO: implement caching courses
app.get('/courses/:campus', async (req, res) => {
  try {
    const campus = req.params.campus;
    if (!campus) {
      res.status(400).send('Campus is required');
      return;
    }

    const courses = await getCourses(campus);
    res.send(courses);
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal server error');
  }
});

app.post('/timetable', async (req, res) => {
  try {
    const campus = req.body.campus;
    if (!campus) {
      res.status(400).send('Campus is required');
      return;
    }

    const semester = req.body.semester;
    if (!semester) {
      res.status(400).send('Semester is required');
      return;
    }

    const courses = req.body.courses;
    if (!courses || courses.length === 0) {
      res.status(400).send('Courses are required');
      return;
    }

    if (courses.length > 8) {
      res.status(400).send('You can only select between 1 and 8 courses');
      return;
    }

    const timetable = await getTimetable(campus, courses, semester);
    res.send(timetable);
  } catch (e) {
    console.log(e);
    // TODO: save error to log file
    res.status(500).send('Internal server error');
  }
});

app.post('/generate-ics', (req, res) => {
  try {
    const campus = req.body.campus;
    if (!campus) {
      res.status(400).send('Campus is required');
      return;
    }
    const timetable = req.body.timetable;
    if (!timetable) {
      res.status(400).send('Timetable is required');
      return;
    }
    const aliasMap = req.body.aliasMap;
    const startWeek = req.body.startWeek ?? 1;
    const endWeek = req.body.endWeek ?? 12;
    if (startWeek > endWeek) {
      res.status(400).send('Start week is after end week');
      return;
    }
    const alert = req.body.alert ?? 0;

    const ics = generateICS(
      campus,
      timetable,
      aliasMap,
      startWeek,
      endWeek,
      alert,
    );

    console.log('api ics', ics);

    res.setHeader('Content-Type', 'text/calendar');
    res.setHeader('Content-Disposition', 'attachment; filename=timetable.ics');

    res.send(ics);
  } catch (e) {
    console.error(e);
    // TODO: save error to log file
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
