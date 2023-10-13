import { useRef, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
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
  const [weeks, setWeeks] = useState(null);
  const [alertOptions, setAlertOptions] = useState([
    { value: 10, label: '10 minutes after' },
    { value: 0, label: 'At time of event' },
    { value: -5, label: '5 minutes before' },
    { value: -10, label: '10 minutes before' },
    { value: -15, label: '15 minutes before' },
    { value: -30, label: '30 minutes before' },
    { value: -60, label: '1 hour before' },
    { value: -60 * 2, label: '2 hours before' },
    { value: -60 * 3, label: '3 hours before' },
    { value: -60 * 6, label: '6 hours before' },
    { value: -60 * 8, label: '8 hours before' },
    { value: -60 * 12, label: '12 hours before' },
    { value: -60 * 24, label: '1 day before' },
  ]);
  const coursesRef = useRef(null);
  const weeksRef = useRef(null);
  const alertRef = useRef(null);

  const [loadingCampusOptions, setLoadingCampusOptions] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const animatedComponents = makeAnimated();

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
    const alerts = getSelectedValues(alertRef);

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
        alerts,
      });
      console.log(response);
      navigate('/download', {
        state: {
          response,
          campus,
          alerts,
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

  // remove non-numeric characters keeping negative and positive signs
  const cleanAlertInput = (inputValue) =>
    inputValue.trim().replace(/[^-0-9]/g, '');

  const handleNewAlert = (inputValue) => {
    // remove non-numeric characters
    inputValue = cleanAlertInput(inputValue);
    console.log(inputValue);
    const alertNumber = parseInt(inputValue);
    if (isNaN(alertNumber)) {
      showErrorMessage('Please enter a valid number');
      return;
    }

    const newAlert = {
      value: alertNumber,
      label: `${Math.abs(alertNumber)} minutes ${
        alertNumber < 0 ? 'before' : 'after'
      }`,
    };
    setAlertOptions((old) => {
      if (old.find((obj) => obj.value === newAlert.value)) {
        return old;
      }
      return [newAlert, ...old];
    });
    alertRef.current.setValue([...alertRef.current.getValue(), newAlert]);
    return newAlert;
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
                  components={animatedComponents}
                  isOptionDisabled={() =>
                    coursesRef.current.getValue().length >= 8
                  }
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
                  components={animatedComponents}
                  isMulti
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Default alert:</label>
              </td>
              <td>
                <CreatableSelect
                  id={'alert'}
                  name="alert"
                  isDisabled={loadingSubmit}
                  ref={alertRef}
                  options={alertOptions}
                  formatCreateLabel={(inputValue) => {
                    const x = parseInt(cleanAlertInput(inputValue));
                    if (isNaN(x)) return `Invalid number: ${inputValue}`;
                    if (x === 0) return 'At time of event';
                    return `Custom (negative for before, positive for after): ${Math.abs(
                      x,
                    )} minute${x > 1 ? 's' : ''} ${x < 0 ? 'before' : 'after'}`;
                  }}
                  onCreateOption={handleNewAlert}
                  isValidNewOption={(inputValue) =>
                    !isNaN(parseInt(cleanAlertInput(inputValue)))
                  }
                  components={animatedComponents}
                  isMulti
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button className={'my-button'} type="submit" disabled={loadingSubmit}>
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
