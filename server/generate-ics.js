import * as ics from 'ics';

/**
 * Generates an ICS file from a timetable. The ICS file contains events for each course in the timetable and uses iCal recurrence rules to repeat events on a weekly basis excluding weeks when each course does not run.
 * @param timetable the timetable returned by /timetable
 * @param aliasMap a js object mapping course names to aliases
 * @param startWeek the week to start the timetable from (1-12)
 * @param endWeek the week to end the timetable at (1-12)
 * @param alert
 * @returns {Promise}
 */
// TODO: implement timezones with campus locations
export const generateICS = (timetable, aliasMap, startWeek, endWeek, alert) => {
  // iCal events
  const events = [];

  // TODO: update to use user's timezone
  const targetTimeZone = 'Asia/Dubai';

  // get timezone offset in hours since the ics library adjusts the time by the timezone, so we want to undo it
  const hostTimeZoneOffsetMinutes = new Date().getTimezoneOffset() * -1;
  const hostTimeZoneOffset = hostTimeZoneOffsetMinutes / 60;

  // loop through each course
  for (const course in timetable) {
    // TODO: implement start and end weeks
    const startDate = new Date(timetable[course].dates.start);
    const endDate = new Date(timetable[course].dates.end);
    const days = timetable[course].days;

    // check if startDate is a Sunday
    if (startDate.getDay() !== 1) {
      // TODO: handle case
      throw new Error('Start date is not a Monday');
    }

    // check if endDate is not a Sunday
    if (endDate.getDay() !== 0) {
      // TODO: handle case
      throw new Error('End date is not a Sunday');
    }

    // check if startDate is before endDate
    if (startDate.getTime() > endDate.getTime()) {
      throw new Error('Start date is after end date');
    }

    // check if startWeek is before endWeek
    if (startWeek > endWeek) {
      throw new Error('Start week is after end week');
    }

    // loop through each day
    for (const day in days) {
      // loop through events on each day
      for (const event of days[day]) {
        // recurrence rules function
        /**
         * Generates a recurrence rule for a set of weeks
         * @param currentDate
         * @param weeks a string of weeks separated by commas and spaces (e.g. '1-12' or '1-5, 7-12')
         * @returns {string}
         */
        function generateRecurrence(currentDate, weeks) {
          /*
           * cases:
           * 1. m-n (e.g. 1-12)
           * 2. m-n, ..., p-q (e.g. 1-5, 7-12)
           * 3. m (e.g. 5)
           * 4. m-m (e.g. 5-5)
           */

          /**
           * Returns a recurrence rule for a single set of weeks
           * @param firstInerval m-n, m-n, m
           * @param lastInterval the last interval in the set of weeks (e.g. m-n, m-n, m)
           */
          const generateSingleRecurrence = (firstInerval, lastInterval) => {
            // if there is only 1 interval, return a recurrence rule for that interval
            if (!lastInterval) {
              const arr = firstInerval.split('-');
              if (arr.length === 1) {
                // m case, no recurrence
                return '';
              } else {
                // m-n or m-m case
                const m = parseInt(arr[0]);
                const n = parseInt(arr[1]);

                const diff = n - m;

                // return a recurrence rule for diff weeks
                return `FREQ=WEEKLY;INTERVAL=1;COUNT=${diff + 1}`;
              }
            } else {
              // if there is more than 1, return a recurrence from the first to the last interval
              const firstArr = firstInerval.split('-');
              const lastArr = lastInterval.split('-');
              let m = parseInt(firstArr[0]);

              let n = parseInt(lastArr[lastArr.length - 1]);

              const diff = n - m;
              return `FREQ=WEEKLY;INTERVAL=1;COUNT=${diff + 1}`;
            }
          };

          const formatEXDATE = (date) => {
            const tempDate = new Date(date);
            tempDate.setHours(tempDate.getHours() + hostTimeZoneOffset);
            let isoString = tempDate.toISOString();
            isoString = isoString.replace(/[:.-]|Z/g, '');
            // Truncate milliseconds
            return isoString.slice(0, 15);
          };

          // split by commas
          const splitWeeks = weeks.split(', ');
          if (splitWeeks.length === 1) {
            // m-n or m-m case
            return generateSingleRecurrence(splitWeeks[0]);
          } else {
            // m-n, ..., p-q case
            const excludedDays = [];
            for (let i = 1; i < splitWeeks.length; i++) {
              const firstIntervalEnd = parseInt(
                splitWeeks[i - 1].split('-')[1],
              );
              const secondIntervalStart = parseInt(splitWeeks[i].split('-')[0]);
              const gap = secondIntervalStart - firstIntervalEnd - 1;
              for (let j = firstIntervalEnd; j < gap + firstIntervalEnd; j++) {
                const newDate = new Date(currentDate);
                newDate.setDate(newDate.getDate() + 7 * j);
                newDate.setHours(
                  event.startTime.split(':')[0],
                  event.startTime.split(':')[1],
                );
                // add excluded week
                excludedDays.push(formatEXDATE(newDate));
              }
            }

            return `${generateSingleRecurrence(
              splitWeeks[0],
              splitWeeks[splitWeeks.length - 1],
            )}\nEXDATE;TZID=${targetTimeZone}:${excludedDays.join(',')}`;
          }
        }

        // create a new date to change the day using day increment
        const dayMap = {
          Monday: 1,
          Tuesday: 2,
          Wednesday: 3,
          Thursday: 4,
          Friday: 5,
          Saturday: 6,
          Sunday: 0,
        };
        const currentDate = moveDateToDayOfWeek(startDate, dayMap[day]);
        // move date to the correct week
        currentDate.setDate(
          currentDate.getDate() + 7 * (event.weeks.split('-')[0] - 1),
        );

        const rrule = generateRecurrence(currentDate, event.weeks);

        const iCalEvent = {
          // TODO: implement aliasMap
          title: course,
          description: event.type,
          location: event.room,
          // TODO: fix organizer issue
          // organizer: {
          //   name: event.staff.split('; ').join(', '),
          // },
          // [year, month, day, hour, minute]
          start: [
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            currentDate.getDate(),
            parseInt(event.startTime.split(':')[0]),
            parseInt(event.startTime.split(':')[1]),
          ],
          end: [
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            currentDate.getDate(),
            parseInt(event.endTime.split(':')[0]),
            parseInt(event.endTime.split(':')[1]),
          ],
          recurrenceRule: rrule,
          busyStatus: 'BUSY',
          // TODO: implement alert
        };
        events.push(iCalEvent);
      }
    }
  }

  // create ICS file
  let { error, value } = ics.createEvents(events);
  if (error) {
    console.error('error creating ics:', error);
    throw error;
  }

  // regex to get any start/end times for the events and replace them with a time including timezone
  const dtstartendRegex = /(DT(?:START|END)):(\d{8}T\d{6}Z)/g;

  function parseICSDateTime(dateTimeString) {
    const year = parseInt(dateTimeString.substr(0, 4));
    const month = parseInt(dateTimeString.substr(4, 2)) - 1;
    const day = parseInt(dateTimeString.substr(6, 2));
    const hour = parseInt(dateTimeString.substr(9, 2));
    const minute = parseInt(dateTimeString.substr(11, 2));
    const second = parseInt(dateTimeString.substr(13, 2));

    const utcTime = Date.UTC(year, month, day, hour, minute, second);
    return new Date(utcTime);
  }

  function formatDate(dateStr) {
    return dateStr.replace(/[:.]/g, '').replace(/-/g, '');
  }

  const formatICSDT = (_, dtType, dateTime) => {
    const utcDate = parseICSDateTime(dateTime);
    utcDate.setUTCHours(utcDate.getUTCHours() + hostTimeZoneOffset);
    const formattedTime = utcDate.toISOString().replace(/\.\d{3}Z$/, '');
    return `${dtType};TZID=${targetTimeZone}:${formatDate(formattedTime)}`;
  };

  value = value.replace(dtstartendRegex, formatICSDT);

  // TODO: replace PRODID

  return value;
};

function moveDateToDayOfWeek(currentDate, targetDay) {
  const currentDay = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const daysToAdd = (targetDay - currentDay + 7) % 7; // Calculate days to add
  const newDate = new Date(currentDate);
  newDate.setDate(newDate.getDate() + daysToAdd);
  return newDate;
}

//
// // ! temp
// const timetable = {
//   'Principles of Chemistry': {
//     days: {
//       Wednesday: [
//         {
//           type: 'Lec',
//           startTime: '13:00',
//           endTime: '15:00',
//           weeks: '1-12',
//           room: '2.03',
//           staff: 'M. Nair',
//         },
//       ],
//       Thursday: [
//         {
//           type: 'Tut',
//           startTime: '13:00',
//           endTime: '15:00',
//           weeks: '1-4, 7-12',
//           room: '2.03',
//           staff: 'M. Nair',
//         },
//       ],
//     },
//     dates: {
//       start: '11 Sep 2023',
//       end: '3 Dec 2023',
//     },
//   },
// };
//
// generateICS(timetable, {}, 1, 12, 0);
