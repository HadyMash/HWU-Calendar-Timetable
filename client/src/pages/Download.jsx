import { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import PropagateLoader from 'react-spinners/PropagateLoader.js';

export function Download() {
  // ! temp
  const sampleData = {
    'Principles of Chemistry': {
      Wednesday: [
        {
          type: 'Lec',
          startTime: '13:00',
          endTime: '15:00',
          weeks: '1-12',
          room: '2.03',
          staff: 'M. Nair',
        },
      ],
      Thursday: [
        {
          type: 'Tut',
          startTime: '13:00',
          endTime: '15:00',
          weeks: '1-5,  7-12',
          room: '2.03',
          staff: 'M. Nair',
        },
      ],
    },
    'Chemical Thermodynamics & Introductory Chemical Kinetics for Chemical Engineers':
      {
        Monday: [
          {
            type: 'Lec',
            startTime: '15:00',
            endTime: '17:00',
            weeks: '1-12',
            room: '2.04',
            staff: 'M. Nair',
          },
        ],
        Tuesday: [
          {
            type: 'Tut',
            startTime: '10:00',
            endTime: '12:00',
            weeks: '1-12',
            room: '2.04',
            staff: 'M. Nair',
          },
        ],
      },
    'Mechanics, Fields and Forces': {
      Monday: [
        {
          type: 'Lec',
          startTime: '16:00',
          endTime: '18:00',
          weeks: '1-6',
          room: '6.37',
          staff: 'R. Sharqi',
        },
        {
          type: 'Lec',
          startTime: '16:00',
          endTime: '18:00',
          weeks: '7-12',
          room: '6.37',
          staff: 'Dr O. Potapova',
        },
      ],
      Wednesday: [
        {
          type: 'Tut',
          startTime: '12:00',
          endTime: '14:00',
          weeks: '1-6',
          room: '5.28',
          staff: 'R. Sharqi',
        },
      ],
      Friday: [
        {
          type: 'Tut',
          startTime: '10:00',
          endTime: '12:00',
          weeks: '7-12',
          room: '6.37',
          staff: 'Dr O. Potapova',
        },
      ],
    },
    'Advanced Analogue Electronics': {
      Monday: [
        {
          type: 'Lec',
          startTime: '9:00',
          endTime: '11:00',
          weeks: '1-6',
          room: '6.29',
          staff: 'Al Musleh,  Mohamed',
        },
        {
          type: 'Lec',
          startTime: '9:00',
          endTime: '11:00',
          weeks: '7-12',
          room: '6.29',
          staff: 'Dr M. Nour',
        },
      ],
      Thursday: [
        {
          type: 'Lec',
          startTime: '15:00',
          endTime: '16:00',
          weeks: '1-6',
          room: '5.13',
          staff: 'Al Musleh,  Mohamed',
        },
        {
          type: 'Lec',
          startTime: '15:00',
          endTime: '16:00',
          weeks: '7-12',
          room: '5.13',
          staff: 'Dr M. Nour',
        },
        {
          type: 'Tut',
          startTime: '16:00',
          endTime: '17:00',
          weeks: '1-6',
          room: '5.13',
          staff: 'Al Musleh,  Mohamed',
        },
        {
          type: 'Tut',
          startTime: '16:00',
          endTime: '17:00',
          weeks: '7-12',
          room: '5.13',
          staff: 'Dr M. Nour',
        },
      ],
    },
    'User-Centred Experimental Design': {
      Monday: [
        {
          type: 'Lec',
          startTime: '13:00',
          endTime: '15:00',
          weeks: '1-5,  7-12',
          room: '5.12',
          staff: 'Uddin,  Md Azher;  Dr. R. Soobhany',
        },
        {
          type: 'CLab',
          startTime: '15:00',
          endTime: '17:00',
          weeks: '1-5,  7-12',
          room: '5.32',
          staff: 'Uddin,  Md Azher;  Dr. R. Soobhany',
        },
        {
          type: 'CLab',
          startTime: '15:00',
          endTime: '17:00',
          weeks: '1-5,  7-12',
          room: '5.35A',
          staff: 'Uddin,  Md Azher;  Dr. R. Soobhany',
        },
        {
          type: 'CLab',
          startTime: '15:00',
          endTime: '17:00',
          weeks: '1-5,  7-12',
          room: '5.35C',
          staff: 'Uddin,  Md Azher;  Dr. R. Soobhany',
        },
        {
          type: 'CLab',
          startTime: '15:00',
          endTime: '17:00',
          weeks: '1-5,  7-12',
          room: '5.35B',
          staff: 'Uddin,  Md Azher;  Dr. R. Soobhany',
        },
      ],
    },
  };

  const [aliasMap, setAliasMap] = useState({});
  const [showDuplicates, setShowDuplicates] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const generateAliasRows = () => {
    const aliasRows = [];
    for (const course in sampleData) {
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
