import { useRef, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export function Home() {
  /* Things to implement
   * 3. detect overlaps for multiple classrooms for the same subject
   * 4. alerts before event
   */
  const navigate = useNavigate();
  const [campus, setCampus] = useState(null);
  const [coursesAbortController, setCoursesAbortController] = useState(null);
  const [courses, setCourses] = useState(null);
  // TODO: add multiselect and implement reading each set
  const [weeks, setWeeks] = useState(null);
  const coursesRef = useRef(null);
  const weeksRef = useRef(null);
  const alertRef = useRef(null);

  const [loadingCampusOptions, setLoadingCampusOptions] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

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

  const handleCampusChange = async (e) => {
    setCampus(e.value);
    setLoadingCampusOptions(true);

    // cancel previous request if it exists
    if (coursesAbortController) {
      coursesAbortController.abort();
    }

    // clear courses and weeks currently selected values
    coursesRef.current.clearValue();
    weeksRef.current.clearValue();

    const abortController = new AbortController();
    setCoursesAbortController(abortController);

    let cancelled = false;

    try {
      const response = await axios.get(
        `http://localhost:3000/${e.value}/options`,
        {
          signal: abortController.signal,
        },
      );

      if (response.status === 200) {
        console.log(response.data);
        const data = response.data;
        setCourses(data.courses);
        setWeeks(data.weeks);
      } else {
        console.log(response.data);
        showErrorMessage(`Error ${response.status}: ${response.data}`);
      }
    } catch (e) {
      if (e.message === 'canceled') {
        cancelled = true;
        return;
      }
      console.error(e);
      showErrorMessage(`Error: ${e.message}`);
    } finally {
      if (!cancelled) setLoadingCampusOptions(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loadingSubmit) return;

    const getSelectedValues = (ref) =>
      ref.current.state.selectValue.map((obj) => obj.value);

    const courses = getSelectedValues(coursesRef);
    const weeks = getSelectedValues(weeksRef);
    const alert = getSelectedValues(alertRef)[0];

    // validate
    let valid = true;

    if (!campus) {
      showErrorMessage('Please select a campus');
      valid = false;
    }

    if (!courses || courses.length === 0) {
      showErrorMessage('Please select at least one course');
      valid = false;
    }
    if (!weeks) {
      showErrorMessage('Please select at least one week');
      valid = false;
    }
    if (!valid) return;

    // make call to api
    setLoadingSubmit(true);
    try {
      const response = await axios.post('http://localhost:3000/timetable', {
        campus,
        courses,
        weeks,
        alert,
      });
      console.log(response);
      // TODO: route to download page
      navigate('/download', {
        state: {
          response,
          campus,
          alert,
        },
      });
    } catch (error) {
      console.error(error);
      showErrorMessage(
        `Something went wrong (status code ${
          error?.response?.status ?? 'unknown'
        }). Check console for log`,
      );
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className={'center'}>
      <div className={'top-text'}>
        <h1>Welcome to Heriot-Watt University Calendar Timetable</h1>
        <p>Please select your courses to add them to your calendar as events</p>
      </div>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label>Campus:</label>
              </td>
              <td>
                <Select
                  id={'campus'}
                  name="campus"
                  options={[
                    { value: 'Dubai', label: 'Dubai' },
                    { value: 'Malaysia', label: 'Malaysia' },
                    { value: 'Edinburgh', label: 'Edinburgh' },
                    { value: 'Scottish Borders', label: 'Scottish Borders' },
                    { value: 'Orkney', label: 'Orkney' },
                  ].sort((a, b) => a.value.localeCompare(b.value))}
                  isDisabled={loadingSubmit}
                  isSearchable={true}
                  onChange={handleCampusChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Courses:</label>
              </td>
              <td>
                {/* TODO: get list of courses from server and store for a short while*/}
                {/* TODO: add animation to multi select*/}
                {/* TODO: don't allow selecting more than 8*/}
                <Select
                  id={'courses'}
                  options={courses}
                  closeMenuOnSelect={false}
                  isDisabled={
                    loadingSubmit ||
                    loadingCampusOptions ||
                    !courses ||
                    courses?.length === 0
                  }
                  isSearchable={true}
                  name={'courses'}
                  isLoading={loadingCampusOptions}
                  placeholder={
                    loadingCampusOptions
                      ? 'Loading...'
                      : !campus
                      ? 'Please select a campus'
                      : !courses || courses?.length === 0
                      ? 'No courses found'
                      : 'Select courses'
                  }
                  ref={coursesRef}
                  isMulti
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Weeks:</label>
              </td>
              <td>
                <Select
                  id={'weeks'}
                  name="weeks"
                  isLoading={loadingCampusOptions}
                  isDisabled={
                    loadingSubmit ||
                    loadingCampusOptions ||
                    !weeks ||
                    weeks?.length === 0
                  }
                  isSearchable={true}
                  options={weeks}
                  placeholder={
                    loadingCampusOptions
                      ? 'Loading...'
                      : !campus
                      ? 'Please select a campus'
                      : !courses || courses?.length === 0
                      ? 'No weeks found'
                      : 'Select weeks'
                  }
                  ref={weeksRef}
                  closeMenuOnSelect={false}
                  isMulti
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
        {/* TODO: add alias feature */}
        <button type="submit" disabled={loadingSubmit}>
          {loadingSubmit ? (
            <PropagateLoader color={'white'} loading={true} size={5} />
          ) : (
            'Get Timetable'
          )}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
