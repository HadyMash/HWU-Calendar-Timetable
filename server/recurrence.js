/**
 * Generates a recurrence rule for a set of weeks
 * @param currentDate
 * @param weeks an array of week intervals or single weeks (e.g. ['1-12'] or ['1-4', '8'] or ['1-5'. '7-12'])
 * @param startTime the event's start time
 * @param hostTimeZoneOffset the offset of the host timezone in hours
 * @param targetTimeZone the target timezone id
 * @returns {string}
 */
export function generateRecurrence(
  currentDate,
  weeks,
  startTime,
  hostTimeZoneOffset,
  targetTimeZone,
) {
  /*
   * cases:
   * 1. m-n (e.g. 1-12)
   * 2. m-n, ..., p-q (e.g. 1-5, 7-12)
   * 3. m (e.g. 5)
   * 4. m-m (e.g. 5-5)
   */

  const formatEXDATE = (date) => {
    const tempDate = new Date(date);
    tempDate.setHours(tempDate.getHours() + hostTimeZoneOffset);
    let isoString = tempDate.toISOString();
    isoString = isoString.replace(/[:.-]|Z/g, '');
    // Truncate milliseconds
    return isoString.slice(0, 15);
  };

  if (weeks.length === 1) {
    // m-n or m-m case
    return generateSingleRecurrence(weeks[0]);
  } else {
    // m-n, ..., p-q case
    const excludedDays = [];
    const startingInterval = weeks[0].split('-')[0] - 1;
    for (let i = 1; i < weeks.length; i++) {
      const firstIntervalSplit = weeks[i - 1].split('-');
      const firstIntervalEnd = parseInt(
        firstIntervalSplit[firstIntervalSplit.length - 1],
      );
      const secondIntervalStart = parseInt(weeks[i].split('-')[0]);
      const gap = secondIntervalStart - firstIntervalEnd - 1;
      for (let j = firstIntervalEnd; j < gap + firstIntervalEnd; j++) {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 7 * (j - startingInterval));
        newDate.setHours(startTime.split(':')[0], startTime.split(':')[1]);
        // add excluded week
        excludedDays.push(formatEXDATE(newDate));
      }
    }

    return `${generateSingleRecurrence(
      weeks[0],
      weeks[weeks.length - 1],
    )}\nEXDATE;TZID=${targetTimeZone}:${excludedDays.join(',')}`;
  }
}

/**
 * Returns a recurrence rule for a single set of weeks
 * @param firstInterval m-n, m-n, m
 * @param lastInterval the last interval in the set of weeks (e.g. m-n, m-n, m)
 */
function generateSingleRecurrence(firstInterval, lastInterval) {
  // if there is only 1 interval, return a recurrence rule for that interval
  if (!lastInterval) {
    const arr = firstInterval.split('-');
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
    const firstArr = firstInterval.split('-');
    const lastArr = lastInterval.split('-');
    let m = parseInt(firstArr[0]);

    let n = parseInt(lastArr[lastArr.length - 1]);

    const diff = n - m;
    return `FREQ=WEEKLY;INTERVAL=1;COUNT=${diff + 1}`;
  }
}
