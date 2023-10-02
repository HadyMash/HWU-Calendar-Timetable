import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import PropagateLoader from 'react-spinners/PropagateLoader.js';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { saveAs } from 'file-saver';

export function Download() {
  const location = useLocation();
  // TODO: rename to avoid confusion
  const serverResponse = location.state.response;
  const courses = serverResponse.data;
  const startWeek = location.state.startWeek;
  const endWeek = location.state.endWeek;
  const alert = location.state.alert;
  const [aliasMap, setAliasMap] = useState({});
  const [showDuplicates, setShowDuplicates] = useState(false);
  const [downloading, setDownloading] = useState(false);

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

  // TODO: implement
  const generateDuplicateChoices = () => {
    return <>Not yet implemented</>;
  };

  // TODO: implement
  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await axios.post(
        'http://localhost:3000/generate-ics',
        {
          timetable: courses,
          aliasMap,
          startWeek,
          endWeek,
          alert,
        },
        {
          responseType: 'blob',
        },
      );

      const blob = new Blob([response.data], { type: 'text/calendar' });
      const semesterLabel = location.state.semesterLabel;
      saveAs(
        blob,
        `HWU ${new Date().getFullYear()} ${semesterLabel} Timetable.ics`,
      );

      // if (response.status)
    } catch (error) {
      console.error(error);
      showErrorMessage('Something went wrong, please try again later');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className={'download'}>
      <div className={'center'}>
        <h1>Download</h1>
      </div>
      <div className={'alias'}>
        <h2>Alias</h2>
        <h4>
          Rename any course, it will be used for event titles on the calendar
        </h4>
        <div className={'alias-table'}>{generateAliasRows()}</div>
      </div>
      {showDuplicates && (
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
