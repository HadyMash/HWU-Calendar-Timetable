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
// TODO: implement timezones
export const generateICS = async (
  timetable,
  aliasMap,
  startWeek,
  endWeek,
  alert,
) => {
  // iCal events
  const events = [];

  // loop through each course
  for (const course in timetable) {
    console.log('course:', course);
    // TODO: implement start and end weeks
    const startDate = new Date(timetable[course].dates.start);
    const endDate = new Date(timetable[course].dates.end);
    const days = timetable[course].days;

    console.log('timetable[course]:', timetable[course]);
    console.log('startDate:', startDate);
    console.log('endDate:', endDate);
    console.log('days:', days);

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
      console.log('day:', day);
      // loop through events on each day
      for (const event of days[day]) {
        console.log('event:', event);
        // TODO: handle timezones

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

          const isoString = (date) => {
            const isoString = date.toISOString(); // Convert to ISO 8601 format

            // Remove colons and decimal seconds from the ISO string and add hyphens
            const formattedDate = isoString
              .replace(/[:.]/g, '')
              .replace(/-/g, '');

            // // Add 'T' and 'Z' to the formatted date to match the desired format
            // const utcFormattedDate =
            //   formattedDate.slice(0, 8) + 'T' + formattedDate.slice(8) + 'Z';

            return formattedDate;
          };

          // split by commas
          const splitWeeks = weeks.split(', ');
          if (splitWeeks.length === 1) {
            // m-n or m-m case
            // return {
            //   rrule: generateSingleRecurrence(splitWeeks[0]),
            //   exdate: undefined,
            // };
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
                excludedDays.push(isoString(newDate));

                // excludedDays.push(
                //   `${newDate.getFullYear()}${
                //     newDate.getMonth() + 1
                //   }${newDate.getDate()}`,
                // );
              }
            }

            // return {
            //   rrule: generateSingleRecurrence(
            //     splitWeeks[0],
            //     splitWeeks[splitWeeks.length - 1],
            //   ),
            //   exdate: excludedDays.join(','),
            // };

            return `${generateSingleRecurrence(
              splitWeeks[0],
              splitWeeks[splitWeeks.length - 1],
            )}`;
            // \nEXDATE=${excludedDays.join(',')} `;
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
  console.log('events:', events);

  // create ICS file
  let { error, value } = ics.createEvents(events);
  if (error) {
    console.error('error creating ics:', error);
    throw error;
  }

  // TODO: replace DTSTART and DTEND with timezone timestamp
  const dtstartRegex = /DTSTART:(\d{8}T\d{6})Z/g;
  const dtendRegex = /DTEND:(\d{8}T\d{6})Z/g;

  // TODO: update when implementing timezones
  const timezone = 'Asia/Dubai';

  value = value
    .replace(dtstartRegex, `DTSTART;TZID=${timezone}:$1`)
    .replace(dtendRegex, `DTEND;TZID=${timezone}:$1`);

  console.log(value);

  // TODO: replace EXDATEs with timezone timestamps

  return value;
};

function moveDateToDayOfWeek(currentDate, targetDay) {
  const currentDay = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const daysToAdd = (targetDay - currentDay + 7) % 7; // Calculate days to add
  const newDate = new Date(currentDate);
  newDate.setDate(newDate.getDate() + daysToAdd);
  return newDate;
}

// ! temp

const timetable = {
  'Principles of Chemistry': {
    days: {
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
          weeks: '1-5, 7-12',
          room: '2.03',
          staff: 'M. Nair',
        },
      ],
    },
    dates: {
      start: '11 Sep 2023',
      end: '3 Dec 2023',
    },
  },
};

await generateICS(timetable, {}, 1, 12, 0);
