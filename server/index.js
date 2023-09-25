import express from 'express';
import cors from 'cors';
import { getTimetable } from './pptr.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post('/timetable', async (req, res) => {
  try {
    const semester = req.body.semester;
    if (!semester) {
      res.status(400).send('Semester is required');
      return;
    }

    const courses = req.body.courses;
    if (!courses) {
      res.status(400).send('Courses are required');
      return;
    }

    const timetable = await getTimetable(courses, semester);
    res.send(timetable);
  } catch (e) {
    console.log(e);
    // TODO: save error to log file
    res.status(500).send('Internal server error');
  }
});

app.post('/generate-ics', async (req, res) => {
  try {
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

    const ics = await generateICS(
      timetable,
      aliasMap,
      startWeek,
      endWeek,
      alert,
    );
  } catch (e) {
    console.error(e);
    // TODO: save error to log file
    res.status(500).send('Internal server error');
  }
});

// TODO: make requests which return the available courses for a given semester

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
