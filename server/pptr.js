import puppeteer from 'puppeteer';

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080 });
  // Navigate to login
  await page.goto('https://timetable.hw.ac.uk/WebTimetables/LiveDU/login.aspx');

  try {
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
    const courses = [
      'B17CA-S1',
      'B18AP-S1',
      'B27MW-S1',
      'B30EI-S1',
      'B30UB-S1',
    ];
    await select('select#dlObject', courses);

    // select semester
    const semester = '2;3;4;5;6;7;8;9;10;11;12;13';
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
      await page.click(viewTimetableSelector);
    }

    await page.waitForNavigation();

    // TODO: read timetable from html
  } catch (e) {
    console.error(e);
  }
})();
