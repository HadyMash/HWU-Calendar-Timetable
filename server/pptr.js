import puppeteer from 'puppeteer';
// import util from 'util';

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const campusTimetableUrls = {
  dubai: 'https://timetable.hw.ac.uk/WebTimetables/LiveDU/login.aspx',
  malaysia: 'https://timetable.hw.ac.uk/WebTimetables/LiveMP/login.aspx',
  edinburgh: 'https://timetable.hw.ac.uk/WebTimetables/LiveED/login.aspx',
  orkney: 'https://timetable.hw.ac.uk/WebTimetables/LiveOR/login.aspx',
  'scottish borders':
    'https://timetable.hw.ac.uk/WebTimetables/LiveSB/login.aspx',
};

const browser = await puppeteer.launch({ headless: 'new' });
// const browser = await puppeteer.launch({ headless: false });

// ! temp
// const courses = [
//   'B17CA-S1',
//   'B18AP-S1',
//   'B27MW-S1',
//   'B30EI-S1',
//   'B30UB-S1',
//   'F28ED-S1',
// ];
// const courses = ['B17CA-S1', 'B18AP-S1'];
// const courses = ['F28ED-S1'];
// const semester = '2;3;4;5;6;7;8;9;10;11;12;13';

// console.log(
//   util.inspect(
//     await getTimetable(courses, semester),
//     false,
//     null,
//     true /* enable colors */,
//   ),
// );

/**
 * Get a list of courses for a campus and semester
 * @param campus
 * @param semester
 * @returns {Promise} a promise that resolves to a list of courses
 */
export async function getCourses(campus, semester) {
  const url = campusTimetableUrls[campus.toLowerCase()];
  if (!url) {
    throw new Error(`Campus ${campus} not found`);
  }

  const page = await browser.newPage();

  try {
    // TODO: refactor into a function to avoid duplication between this and getTimetable
    await page.setViewport({ width: 1920, height: 1080 });
    // Navigate to login
    // TODO: add campus selection
    await page.goto(url);

    // login as guest
    {
      const guestButtonSelector = '#bGuestLogin';
      await page.waitForSelector(guestButtonSelector);
      await page.click(guestButtonSelector);
    }

    // go to courses
    {
      const coursesSelector = '#LinkBtn_modules';
      await page.waitForSelector(coursesSelector);
      await page.click(coursesSelector);
    }

    // query for courses
    const coursesSelectorQuery = 'select#dlObject';
    await page.waitForSelector(coursesSelectorQuery);
    const coursesSelector = await page.$(coursesSelectorQuery);

    // read select options and map them to return each's value and label
    const courses = await coursesSelector.$$eval('option', (options) => {
      return options.map((option) => {
        return {
          value: option.value,
          label: option.textContent.trim().replace('  ', ' '),
        };
      });
    });

    return courses;
  } finally {
    await page.close();
  }
}

/**
 * Get the timetable for a list of courses in a semester
 * @param campus
 * @param courses
 * @param semester the semester to get the timetable for (September or January)
 * @returns {Promise} an object containing each course and it's scheduled sessions
 */
export async function getTimetable(campus, courses, semester) {
  const data = {};

  /**
   * Read a course from the page and append it to the timetable
   * @param page
   * @returns {Promise<void>}
   */
  async function readCourse(page) {
    // get course title
    const titleSelector = 'span.header-0-0-3';
    await page.waitForSelector(titleSelector);
    const courseTitle = await page.$eval(titleSelector, (element) =>
      element.textContent.trim().replace('  ', ' '),
    );

    // get semester start and end dates
    const datesSelector = 'span.header-1-2-3';
    await page.waitForSelector(datesSelector);
    const dates = await page.$eval(datesSelector, (element) => {
      const text = element.textContent.trim().replace('  ', ' ');
      const [start, end] = text.split('-');
      return { start, end };
    });

    // delete header
    const headerSelector = 'table.header-border-args';
    await page.waitForSelector(headerSelector);
    await deleteElement(page, headerSelector);

    // read each day
    for (const day of days) {
      // delete day name
      await page.waitForSelector('p');
      await deleteElement(page, 'p');

      // check if day is empty
      const tableSelector = 'table.spreadsheet';
      await page.waitForSelector(tableSelector);
      const table = await page.$(tableSelector);
      {
        await page.waitForSelector('tbody');
        const tableBody = await table.$('tbody');

        if (!tableBody) {
          await page.waitForSelector(tableSelector);
          await deleteElement(page, tableSelector);
          continue;
        }
      }

      // delete column titles
      const titlesSelector = 'tr.columnTitles';
      await page.waitForSelector(titlesSelector);
      await deleteElement(page, titlesSelector);

      // read each row
      async function readRow() {
        const columnSelector = (n) => `tr > td:nth-child(${n})`;

        // get type
        const typeSelector = columnSelector(3);
        await page.waitForSelector(typeSelector);
        const type = await page.$eval(typeSelector, (element) =>
          element.textContent.trim().replace('  ', ' '),
        );

        // get start time
        const startTimeSelector = columnSelector(4);
        await page.waitForSelector(startTimeSelector);
        const startTime = await page.$eval(startTimeSelector, (element) =>
          element.textContent.trim().replace('  ', ' '),
        );

        // get end time
        const endTimeSelector = columnSelector(5);
        await page.waitForSelector(endTimeSelector);
        const endTime = await page.$eval(endTimeSelector, (element) =>
          element.textContent.trim().replace('  ', ' '),
        );

        // get weeks
        const weeksSelector = columnSelector(6);
        await page.waitForSelector(weeksSelector);
        const weeks = await page.$eval(weeksSelector, (element) =>
          element.textContent.trim().replace('  ', ' '),
        );

        // get room
        const roomSelector = columnSelector(7);
        await page.waitForSelector(roomSelector);
        const room = await page.$eval(
          roomSelector,
          (element) =>
            element.textContent.trim().replace('  ', ' ').split('-')[0],
        );

        const staffSelector = columnSelector(8);
        await page.waitForSelector(staffSelector);
        const staff = await page.$eval(staffSelector, (element) =>
          element.textContent.trim().replace('  ', ' '),
        );

        // delete row
        await page.waitForSelector('tr');
        await deleteElement(page, 'tr');

        return {
          type,
          startTime,
          endTime,
          weeks,
          room,
          staff,
        };
      }

      while (true) {
        const session = await readRow();

        if (!data[courseTitle]) data[courseTitle] = { days: {} };
        if (!data[courseTitle].days[day]) data[courseTitle].days[day] = [];
        data[courseTitle].days[day].push(session);

        await page.waitForSelector('tr');
        const nextRow = await table.$('tr');
        if (!nextRow) break;
      }

      if (data[courseTitle]) {
        data[courseTitle].dates = dates;
      }

      await page.waitForSelector(tableSelector);
      await deleteElement(page, tableSelector);
    }

    // delete footer
    await page.waitForSelector('table.footer-border-args');
    await deleteElement(page, 'table.footer-border-args');
  }

  /**
   * Delete an element from the page using a selector
   * @param page
   * @param selector the element's selector
   * @returns {Promise<void>}
   */
  async function deleteElement(page, selector) {
    await page.$eval(selector, (element) => element.remove());
  }

  const url = campusTimetableUrls[campus.toLowerCase()];
  if (!url) {
    throw new Error(`Campus ${campus} not found`);
  }

  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1920, height: 1080 });
    // Navigate to login
    // TODO: add campus selection
    await page.goto(url);

    // login as guest
    {
      const guestButtonSelector = '#bGuestLogin';
      await page.waitForSelector(guestButtonSelector);
      await page.click(guestButtonSelector);
    }

    // go to courses
    {
      const coursesSelector = '#LinkBtn_modules';
      await page.waitForSelector(coursesSelector);
      await page.click(coursesSelector);
    }

    async function select(selector, values) {
      await page.waitForSelector(selector);
      const select = await page.$(selector);
      await select.select(...values);
    }

    // select courses
    await select('select#dlObject', courses);

    // select semester
    await select('select#lbWeeks', [semester]);

    // select all days
    const allDays = '1-7';
    await select('select#lbDays', [allDays]);

    // select DayEvening
    const dayEvening = '1-56';
    await select('select#dlPeriod', [dayEvening]);

    // select list view
    const listView = 'TextSpreadsheet;swsurl;SWSCUST Module TextSpreadsheet';
    await select('select#dlType', [listView]);

    // click view timetable
    {
      const viewTimetableSelector = '#bGetTimetable';
      await page.waitForSelector(viewTimetableSelector);
      await page.click(viewTimetableSelector, {
        waitUntil: 'domcontentloaded',
      });
    }

    // check if valid selections were made
    {
      const errorTitleSelector = 'span#errTitle';
      const errorLabelSelector = 'span#errLabel';

      await page.waitForSelector('body');

      const errorTitle = await page.$(errorTitleSelector);
      const errorLabel = await page.$(errorLabelSelector);

      if (errorTitle || errorLabel) {
        // read error from error label
        const error = await errorLabel.evaluate((element) =>
          element.textContent.trim().replace('  ', ' '),
        );

        throw new Error(`Error: ${error}`);
      }
    }

    // read timetable from html
    for (let i = 0; i < courses.length; i++) {
      await readCourse(page);
    }

    return data;
  } finally {
    await page.close();
  }
}
