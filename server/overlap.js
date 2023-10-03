/**
 * Get the overlapping weekIntervals between 2 lists of week intervals
 * e.g. ['1-5', '7-12'] and ['1-3', '5-7', '9'] will return ['1-3', '5', '7', '9']
 * @param list1
 * @param list2
 */
export function overlappingWeeks(list1, list2) {
  // TODO: sort lists

  // indices for each list
  let i = 0,
    j = 0;

  const overlappingWeeks = [];

  while (i < list1.length && j < list2.length) {
    const interval1 = list1[i].split('-');
    const interval2 = list2[j].split('-');

    const m = parseInt(interval1[0]),
      n = parseInt(interval1[1]);
    const p = parseInt(interval2[0]),
      q = parseInt(interval2[1]);

    const start = Math.max(m, p);
    const end = Math.min(isNaN(n) ? m : n, isNaN(q) ? p : q);

    if (start < end) {
      overlappingWeeks.push(`${start}-${end}`);
    } else if (start === end) {
      overlappingWeeks.push(`${start}`);
    }

    const x = isNaN(n) ? m : n;
    const y = isNaN(q) ? p : q;
    const b = x < y;
    if (x < y) {
      i++;
    } else if (x > y) {
      j++;
    } else {
      if (i === list1.length - 1) {
        j++;
      } else {
        i++;
      }
    }
  }

  return overlappingWeeks;
}
