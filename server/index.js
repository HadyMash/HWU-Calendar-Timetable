import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/timetable', (req, res) => {
  try {
    const semester = req.query.semester;
    if (!semester) {
      res.status(400).send('Semester is required');
      return;
    }
    const startWeek = req.query.startWeek;
    if (!startWeek) {
      res.status(400).send('Week from is required');
      return;
    }
    const endWeek = req.query.endWeek;
    if (!endWeek) {
      res.status(400).send('Week to is required');
      return;
    }
    const alert = req.query.alert ?? 0;

    const serializedCourses = req.query.courses;
    if (!serializedCourses) {
      res.status(400).send('Courses are required');
      return;
    }

    // TODO: serialize in a better way to avoid comma in course name
    const courses = serializedCourses.split(',');

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
