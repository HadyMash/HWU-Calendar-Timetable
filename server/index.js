import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post('/timetable', (req, res) => {
  try {
    const semester = req.body.semester;
    if (!semester) {
      res.status(400).send('Semester is required');
      return;
    }
    const startWeek = req.body.startWeek;
    if (!startWeek) {
      res.status(400).send('Week from is required');
      return;
    }
    const endWeek = req.body.endWeek;
    if (!endWeek) {
      res.status(400).send('Week to is required');
      return;
    }
    const alert = req.body.alert ?? 0;

    const courses = req.body.courses;
    if (!courses) {
      res.status(400).send('Courses are required');
      return;
    }

    res.send({
      courses,
      semester,
      startWeek,
      endWeek,
      alert,
    });
  } catch (e) {
    console.log(e);
    // TODO: save error to log file
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
