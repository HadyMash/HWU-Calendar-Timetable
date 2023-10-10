import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import PropagateLoader from 'react-spinners/PropagateLoader.js';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Checkbox from '@mui/joy/Checkbox';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { detectDuplicates, isDuplicateEvent } from '../../detect-duplicates.js';

export function Download() {
  const location = useLocation();
  const { data: courses } = location.state.response;
  const alerts = location.state.alerts;
  const [aliasMap, setAliasMap] = useState({});
  const [duplicates, setDuplicates] = useState({});
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    setDuplicates(detectDuplicates(courses));
  }, []);

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

  const generateAliasRows = () => {
    const aliasRows = [];
    for (const course in courses) {
      aliasRows.push(
        <React.Fragment key={course}>
          <label
            htmlFor={`${course}-alias`}
            data-tooltip-id={`${course}-tooltip`}
            data-tooltip-content={course}
          >
            {course}:
          </label>
          <Tooltip id={`${course}-tooltip`} delayShow={800} />
          <input
            id={`${course}-alias`}
            placeholder={course}
            onChange={(e) =>
              setAliasMap((prev) => ({ ...prev, [course]: e.target.value }))
            }
          />
        </React.Fragment>,
      );
    }
    return aliasRows;
  };

  const generateDuplicateChoices = () => {
    return Object.keys(duplicates).map((courseName) => {
      return Object.keys(duplicates[courseName]).map((duplicateKey) => {
        const chosenIndices =
          duplicates[courseName][duplicateKey].chosenIndices;
        const currDuplicates = duplicates[courseName][duplicateKey].duplicates;
        const anySelected = () => chosenIndices.length > 0;
        const allSelected = () =>
          chosenIndices.length === currDuplicates.length;
        const toggleSelections = () => {
          if (allSelected()) {
            setDuplicates((prev) => {
              const newDuplicates = { ...prev };
              newDuplicates[courseName][duplicateKey].chosenIndices = [];
              return newDuplicates;
            });
          } else {
            setDuplicates((prev) => {
              const newDuplicates = { ...prev };
              newDuplicates[courseName][duplicateKey].chosenIndices = [
                ...Array(currDuplicates.length).keys(),
              ];
              return newDuplicates;
            });
          }
        };
        const updateChosenDuplicates = (event, index) => {
          setDuplicates((prev) => {
            const newDuplicates = { ...prev };
            const currChosenIndices =
              newDuplicates[courseName][duplicateKey].chosenIndices;
            if (event.target.checked && !currChosenIndices.includes(index)) {
              newDuplicates[courseName][duplicateKey].chosenIndices = [
                ...currChosenIndices,
                index,
              ];
            } else if (
              !event.target.checked &&
              currChosenIndices.includes(index)
            ) {
              newDuplicates[courseName][duplicateKey].chosenIndices =
                currChosenIndices.filter((i) => i !== index);
            }
            return newDuplicates;
          });
        };
        return (
          <div
            key={`${courseName}${duplicateKey}`}
            className={'duplicate-header'}
          >
            <h3>
              {courseName} - {duplicateKey}
            </h3>
            <table>
              <thead>
                <tr>
                  <th>
                    <Checkbox
                      checked={allSelected()}
                      indeterminate={anySelected() && !allSelected()}
                      onChange={toggleSelections}
                    />
                  </th>
                  <th>Type</th>
                  <th>Start time</th>
                  <th>End time</th>
                  <th>Location</th>
                  <th>Staff</th>
                </tr>
              </thead>
              <tbody>
                {currDuplicates.map((duplicate, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Checkbox
                          checked={chosenIndices.includes(index)}
                          onChange={(e) => updateChosenDuplicates(e, index)}
                        />
                      </td>
                      <td>{duplicate.event.type}</td>
                      <td>{duplicate.event.startTime}</td>
                      <td>{duplicate.event.endTime}</td>
                      <td>{duplicate.event.room}</td>
                      <td>{duplicate.event.staff}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      });
    });
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const coursesClone = JSON.parse(JSON.stringify(courses));
      for (const courseKey in duplicates) {
        console.log('courseKey', courseKey);
        const course = duplicates[courseKey];
        for (const duplicateKey in course) {
          const duplicateInstance = course[duplicateKey];
          const day = duplicateInstance.duplicates[0].day;
          const chosenIndices = duplicateInstance.chosenIndices;

          console.log('duplicateInstance in loop', duplicateInstance);

          const filter = (val) => {
            for (const index of chosenIndices) {
              const event = duplicateInstance.duplicates[index].event;
              if (!isDuplicateEvent(val, event)) {
                return true;
              } else {
                if (val.room === event.room) {
                  return true;
                }
              }
            }
            return false;
          };

          coursesClone[courseKey].days[day] =
            coursesClone[courseKey].days[day].filter(filter);
        }
      }
      console.log('coursesClone', coursesClone);

      const response = await axios.post(
        `http://localhost:3000/generate-ics`,
        {
          campus: location.state.campus,
          timetable: coursesClone,
          aliasMap,
          alerts,
        },
        {
          responseType: 'blob',
        },
      );

      const blob = new Blob([response.data], { type: 'text/calendar' });
      saveAs(blob, `HWU ${new Date().getFullYear()} Timetable.ics`);

      // if (response.status)
    } catch (error) {
      console.error(error);
      showErrorMessage('Something went wrong, please try again later');
    } finally {
      setDownloading(false);
    }
  };

  return !courses || Object.keys(courses).length === 0 ? (
    <div className={'download'}>
      <div className={'center'}>
        <h1>No events found</h1>
      </div>
    </div>
  ) : (
    <div className={'download'}>
      <div className={'center'}>
        <h1>Download</h1>
      </div>
      <div className={'alias'}>
        <h2>Aliases</h2>
        <h4>
          Rename any course, it will be used for event titles on the calendar
        </h4>
        <div className={'alias-table'}>{generateAliasRows()}</div>
      </div>
      {Object.keys(duplicates).length > 0 && (
        <div className={'Duplicates'}>
          <h2>Duplicates</h2>
          <h4>
            Choose which duplicate you would like to use. You can always edit
            this and any other information later in your calendar app.
          </h4>
          {generateDuplicateChoices()}
        </div>
      )}
      <div className={'center'} style={{ marginTop: '20px' }}>
        <button onClick={handleDownload} disabled={downloading}>
          {downloading ? (
            <PropagateLoader color={'white'} loading={true} size={5} />
          ) : (
            'Download'
          )}{' '}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
