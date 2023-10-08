import express from 'express';
import cors from 'cors';
import { getCampusOptions, getTimetable } from './pptr.js';
import { generateICS } from './generate-ics.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// TODO: implement caching courses
app.get('/:campus/options', async (req, res) => {
  try {
    const campus = req.params.campus;
    if (!campus) {
      res.status(400).send('Campus is required');
      return;
    }

    const courses = await getCampusOptions(campus);
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

    const weeks = req.body.weeks;
    if (!weeks) {
      res.status(400).send('At least 1 week is required');
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

    const timetable = await getTimetable(campus, courses, weeks);
    res.send(timetable);
  } catch (e) {
    console.error(e);
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
    const alert = req.body.alert ?? 0;

    const ics = generateICS(campus, timetable, aliasMap, alert);

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
