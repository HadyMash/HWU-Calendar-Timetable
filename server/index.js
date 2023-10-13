import express from 'express';
import cors from 'cors';
import { getCampusOptions, getTimetable } from './pptr.js';
import { generateICS } from './generate-ics.js';

const api = express();
api.use(express.json());

const allowedOrigins = ['https://hadymash.github.io'];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

api.use(cors(corsOptions));

const campuses = [
  'dubai',
  'malaysia',
  'edinburgh',
  'orkney',
  'scottish borders',
];

api.get('/health', (req, res) => res.send('OK'));

// TODO: implement caching courses
api.get('/:campus/options', async (req, res) => {
  try {
    const campus = req.params.campus;
    if (!campus) {
      res.status(400).send('Campus is required');
      return;
    }
    if (!campuses.includes(campus.trim().toLowerCase())) {
      res.status(400).send('Invalid campus');
      return;
    }

    const courses = await getCampusOptions(campus.trim().toLowerCase());
    res.send(courses);
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal server error');
  }
});

api.post('/timetable', async (req, res) => {
  try {
    const campus = req.body.campus;
    if (!campus) {
      res.status(400).send('Campus is required');
      return;
    }
    if (!campuses.includes(campus.trim().toLowerCase())) {
      res.status(400).send('Invalid campus');
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

    const timetable = await getTimetable(
      campus.trim().toLowerCase(),
      courses,
      weeks,
    );
    res.send(timetable);
  } catch (e) {
    console.error(e);
    // TODO: save error to log file
    res.status(500).send('Internal server error');
  }
});

api.post('/generate-ics', (req, res) => {
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
    const alerts = req.body.alerts;

    const ics = generateICS(campus, timetable, aliasMap, alerts);

    res.setHeader('Content-Type', 'text/calendar');
    res.setHeader('Content-Disposition', 'attachment; filename=timetable.ics');

    res.send(ics);
  } catch (e) {
    console.error(e);
    // TODO: save error to log file
    res.status(500).send('Internal server error');
  }
});

export const app = api;
