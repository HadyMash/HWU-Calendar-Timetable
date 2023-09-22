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
 * Get the timetable for a list of courses in a semester
 * @param courses
 * @param semester the semester to get the timetable for (September or January)
 * @returns {Promise<void>}
 */
export async function getTimetable(courses, semester) {
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
      const text = element.textContent.trim();
      const [start, end] = text.split('-');
      return { start, end };
    });

    // delete header
    const headerSelector = 'table.header-border-args';
    await page.waitForSelector(headerSelector);
    await deleteElement(page, headerSelector);

    // TODO: read each day
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
          element.textContent.trim(),
        );

        // get start time
        const startTimeSelector = columnSelector(4);
        await page.waitForSelector(startTimeSelector);
        const startTime = await page.$eval(startTimeSelector, (element) =>
          element.textContent.trim(),
        );

        // get end time
        const endTimeSelector = columnSelector(5);
        await page.waitForSelector(endTimeSelector);
        const endTime = await page.$eval(endTimeSelector, (element) =>
          element.textContent.trim(),
        );

        // get weeks
        const weeksSelector = columnSelector(6);
        await page.waitForSelector(weeksSelector);
        const weeks = await page.$eval(weeksSelector, (element) =>
          element.textContent.trim(),
        );

        // get room
        const roomSelector = columnSelector(7);
        await page.waitForSelector(roomSelector);
        const room = await page.$eval(
          roomSelector,
          (element) => element.textContent.trim().split('-')[0],
        );

        const staffSelector = columnSelector(8);
        await page.waitForSelector(staffSelector);
        const staff = await page.$eval(staffSelector, (element) =>
          element.textContent.trim(),
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

        if (!data[courseTitle]) data[courseTitle] = {};
        if (!data[courseTitle][day]) data[courseTitle][day] = [];
        data[courseTitle][day].push(session);

        await page.waitForSelector('tr');
        const nextRow = await table.$('tr');
        if (!nextRow) break;
      }

      await page.waitForSelector(tableSelector);
      await deleteElement(page, tableSelector);
    }

    // TODO: check for identical sessions clashing

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

  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1920, height: 1080 });
    // Navigate to login
    await page.goto(
      'https://timetable.hw.ac.uk/WebTimetables/LiveDU/login.aspx',
    );

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

    // TODO: check if valid selections were made
    {
      const errorTitleSelector = 'span#errTitle';
      const errorLabelSelector = 'span#errLabel';

      await page.waitForSelector('body');

      const errorTitle = await page.$(errorTitleSelector);
      const errorLabel = await page.$(errorLabelSelector);

      if (errorTitle || errorLabel) {
        // read error from error label
        const error = await errorLabel.evaluate((element) =>
          element.textContent.trim(),
        );

        throw new Error(`Error: ${error}`);
      }
    }

    // TODO: read timetable from html
    for (let i = 0; i < courses.length; i++) {
      await readCourse(page);
    }

    return data;
  } finally {
    await page.close();
  }
}
