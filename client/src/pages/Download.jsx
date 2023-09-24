import { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import PropagateLoader from 'react-spinners/PropagateLoader.js';
import { useLocation } from 'react-router-dom';

export function Download() {
  const location = useLocation();
  // TODO: rename to avoid confusion
  const serverResponse = location.state.response;
  const startWeek = location.state.startWeek;
  const endWeek = location.state.endWeek;
  const alert = location.state.alert;
  const [aliasMap, setAliasMap] = useState({});
  const [showDuplicates, setShowDuplicates] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const generateAliasRows = () => {
    const aliasRows = [];
    for (const course in courses) {
      aliasRows.push(
        <>
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
        </>,
      );
    }
    return aliasRows;
  };

  // TODO: implement
  const generateDuplicateChoices = () => {
    return <>Not yet implemented</>;
  };

  // TODO: implement
  const handleDownload = () => {};

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
            'Get Timetable'
          )}{' '}
        </button>
      </div>
    </div>
  );
}
