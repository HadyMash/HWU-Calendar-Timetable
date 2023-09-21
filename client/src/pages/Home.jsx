import { useRef, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { courses, semesters } from '../data.js';

export function Home() {
  /* Things to implement
   * 1. from week n
   * 2. to week n
   * 3. detect overlaps for multiple classrooms for the same subject
   * 4. alerts before event
   */
  const coursesRef = useRef(null);
  const semesterRef = useRef(null);
  const startWeekRef = useRef(null);
  const endWeekRef = useRef(null);
  const alertRef = useRef(null);

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loadingSubmit) return;

    const showErrorMessage = (message) => {
      toast.error(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    };

    const courses = coursesRef.current.state.selectValue;
    const semester = semesterRef.current.state.selectValue[0];
    const startWeek = startWeekRef.current.state.selectValue[0];
    const endWeek = endWeekRef.current.state.selectValue[0];
    const alert = alertRef.current.state.selectValue[0];

    // validate
    let valid = true;

    if (!courses || courses.length === 0) {
      showErrorMessage('Please select at least one course');
      valid = false;
    }
    if (!semester) {
      showErrorMessage('Please select a semester');
      valid = false;
    }
    if (!startWeek) {
      showErrorMessage('Please select a start week');
      valid = false;
    }
    if (!endWeek) {
      showErrorMessage('Please select an end week');
      valid = false;
    }

    if (!valid) return;

    // make call to rest api
    setLoadingSubmit(true);
    try {
      const response = await axios.post('http://localhost:3000/timetable', {
        courses,
        semester,
        startWeek,
        endWeek,
        alert,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
      showErrorMessage('Something went wrong, check console for log');
    } finally {
      setLoadingSubmit(false);
    }
  };

  const generateWeekOptions = () => {
    const options = new Array(12);

    for (let i = 1; i <= 12; i++) {
      options[i - 1] = { value: `Week ${i}`, label: `Week ${i}` };
    }

    return options;
  };

  return (
    <div className={'home'}>
      <div className={'welcome-text'}>
        <h1>Welcome to Heriot-Watt University Calendar Timetable</h1>
        <p>Please select your courses to add them to your calendar as events</p>
      </div>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label>Courses:</label>
              </td>
              <td>
                {/* TODO: get list of courses from server and store for a short while*/}
                <Select
                  id={'courses'}
                  options={courses}
                  closeMenuOnSelect={false}
                  isDisabled={loadingSubmit}
                  isSearchable={true}
                  name={'courses'}
                  ref={coursesRef}
                  defaultValue={'F28WP-S1'}
                  isMulti
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Semester:</label>
              </td>
              <td>
                <Select
                  id={'semester'}
                  name="semester"
                  defaultValue={semesters[0]}
                  isDisabled={loadingSubmit}
                  isSearchable={true}
                  options={semesters}
                  ref={semesterRef}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>From week:</label>
              </td>
              <td>
                <Select
                  id={'start-week'}
                  name={'start-week'}
                  defaultValue={{ value: 'Week 1', label: 'Week 1' }}
                  isDisabled={loadingSubmit}
                  isSearchable={true}
                  options={generateWeekOptions()}
                  ref={startWeekRef}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>To week:</label>
              </td>
              <td>
                <Select
                  id={'end-week'}
                  name={'end-week'}
                  defaultValue={{ value: 'Week 12', label: 'Week 12' }}
                  isDisabled={loadingSubmit}
                  isSearchable={true}
                  options={generateWeekOptions()}
                  ref={endWeekRef}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Default alert:</label>
              </td>
              <td>
                <Select
                  id={'alert'}
                  name="alert"
                  isDisabled={loadingSubmit}
                  ref={alertRef}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" disabled={loadingSubmit}>
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
