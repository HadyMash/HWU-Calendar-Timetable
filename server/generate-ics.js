import * as ics from 'ics';
import { generateRecurrence } from './recurrence.js';

const campusTimezones = {
  dubai: 'Asia/Dubai',
  malaysia: 'Asia/Kuala_Lumpur',
  edinburgh: 'Europe/London',
  orkney: 'Europe/London',
  'scottish borders': 'Europe/London',
};

/**
 * Generates an ICS file from a timetable. The ICS file contains events for each course in the timetable and uses iCal recurrence rules to repeat events on a weekly basis excluding weeks when each course does not run.
 * @param campus
 * @param timetable the timetable returned by /timetable
 * @param aliasMap a js object mapping course names to aliases
 * @param alerts ics alarms
 * @returns {string}
 */
export const generateICS = (campus, timetable, aliasMap, alerts) => {
  // iCal events
  const events = [];
  aliasMap = aliasMap || {};

  const targetTimeZone = campusTimezones[campus.toLowerCase()];
  if (!targetTimeZone) {
    throw new Error('Campus timezone not found');
  }

  // get timezone offset in hours since the ics library adjusts the time by the timezone, so we want to undo it
  const hostTimeZoneOffsetMinutes = new Date().getTimezoneOffset() * -1;
  const hostTimeZoneOffset = hostTimeZoneOffsetMinutes / 60;

  // loop through each course
  for (const course in timetable) {
    const startDate = new Date(timetable[course].dates.start);
    const endDate = new Date(timetable[course].dates.end);
    const days = timetable[course].days;
    const intervalStartWeek = timetable[course].dates.intervalStartWeek;

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

    // loop through each day
    for (const day in days) {
      // loop through events on each day
      for (const event of days[day]) {
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
          currentDate.getDate() +
            7 * (parseInt(event.weeks[0].split('-')[0]) - intervalStartWeek),
        );

        const rrule = generateRecurrence(
          currentDate,
          event.weeks,
          event.startTime,
          hostTimeZoneOffset,
          targetTimeZone,
        );

        const iCalEvent = {
          title: aliasMap[course] || course,
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
        };

        if (alerts && alerts.length > 0) {
          iCalEvent.alarms = alerts.map((value) => {
            return {
              action: 'display',
              description: 'Reminder',
              trigger: alertTrigger(value),
            };
          });
        }

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
  const dtStartEndRegex = /(DT(?:START|END)):(\d{8}T\d{6}Z)/g;

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

  value = value.replace(dtStartEndRegex, formatICSDT);

  // regex to find any TRIGGER:PT without pt value
  const triggerRegex = /TRIGGER:PT/g;
  // regex to find any TRIGGER-PT without pt value
  const triggerRegex2 = /TRIGGER-PT/g;

  value = value
    .replace(triggerRegex, 'TRIGGER:PT0M')
    .replace(triggerRegex2, 'TRIGGER-PT0M');

  // regex to find any faulty alarms PT0M followed by anything (e.g. PT0M10M, PT0M9999999M, etc.)
  // This is done because of a bug in the ics library where if an alarm is set to be after, it adds a 0M before the actual time.
  // I created an issue you can check here: https://github.com/adamgibbons/ics/issues/253.
  const faultyAlarmRegex = /TRIGGER:PT0M(.+?)(?=\s|$)/g;
  value = value.replace(faultyAlarmRegex, 'TRIGGER:PT$1');

  // replace PRODID with custom value
  return value.replace(
    /PRODID:.*/g,
    'PRODID:-//HadyMashhour//HWUCalendarTimetable//EN',
  );
};

function moveDateToDayOfWeek(currentDate, targetDay) {
  const currentDay = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const daysToAdd = (targetDay - currentDay + 7) % 7; // Calculate days to add
  const newDate = new Date(currentDate);
  newDate.setDate(newDate.getDate() + daysToAdd);
  return newDate;
}

function alertTrigger(value) {
  value = Math.round(value);
  if (value === 0) {
    return {};
  }

  const before = value < 0;
  value = Math.abs(value);

  const hours = Math.floor(value / 60);
  const minutes = value % 60;

  return { hours, minutes, before };
}
