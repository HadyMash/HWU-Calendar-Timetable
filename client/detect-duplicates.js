export function detectDuplicates(courses) {
  const duplicates = {};
  for (const courseKey in courses) {
    const days = courses[courseKey].days;
    for (const dayKey in days) {
      const day = days[dayKey];

      for (let i = 0; i < day.length; i++) {
        const event1 = day[i];
        for (let j = i + 1; j < day.length; j++) {
          const event2 = day[j];
          if (isDuplicateEvent(event1, event2)) {
            if (!duplicates[courseKey]) {
              duplicates[courseKey] = {};
            }
            const key = `${dayKey} ${event1.type} ${event1.startTime}-${
              event1.endTime
            } weeks: ${event1.weeks.join(',')}`;
            if (!duplicates[courseKey][key]) {
              duplicates[courseKey][key] = {
                duplicates: [],
                chosenIndices: [0],
              };
            }

            const alreadyAdded = (event) => {
              for (const duplicate of duplicates[courseKey][key].duplicates) {
                if (duplicate.event === event) {
                  return true;
                }
              }
              return false;
            };

            if (!alreadyAdded(event1)) {
              duplicates[courseKey][key].duplicates.push({
                day: dayKey,
                event: event1,
              });
            }
            break;
          }
        }
      }
    }
  }

  return duplicates;
}

export function isDuplicateEvent(event1, event2) {
  if (event1 === event2) {
    return false;
  }
  return (
    event1.startTime === event2.startTime &&
    event1.endTime === event2.endTime &&
    arraysAreEqual(event1.weeks, event2.weeks)
  );
}

function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}
