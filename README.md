# Heriot-Watt University Calendar Timetable

***NOTE:*** **This project is in no way affiliated with Heriot-Watt University or Google**

You can use this to add your Heriot-Watt University timetable to your calendar app. It supports most popular calendar
apps such as Apple and Google Calendar, or any calendar which supports importing with an iCal (.ics) file.

You can try it out here: https://hadymash.github.io/HWU-Calendar-Timetable/

# Known Issues

* It's slow. A request usually takes 10-20 seconds. This is because there isn't enough traffic so the server goes to
  sleep and requires a few seconds to wake up.
* Sometimes, not all the course options are scraped by the server, if you don't find your course try refreshing.
* Time zone definitions aren't added so this might not work for all calendars, however, it should still work with
  popular calendar apps
* Google calendar doesn't support notifications after events
* Alerts
    * If you're having an issue with importing the file try not adding an alert.
    * The library used to generate the iCal (.ics) file has a bug with creating alerts. I've created an issue which you
      can check here in case this is resolved: https://github.com/adamgibbons/ics/issues/253
    * I'm currently working around this by replacing it but there may be other cases I haven't come across which the
      regex doesn't detect.

# How to use

## Home Page

1. Select a campus. This will load the available courses and week options for your campus. Note this may take a few
   seconds..
2. Select 1-8 courses any combination of weeks you'd like.
3. Optionally add any alerts you'd like. You can choose from the already available ones or write one yourself. Just type
   the duration in minutes (positive for after the event and negative for after). Please note Google Calendar doesn't
   support alerts after the event.
4. Click the submit button and wait and you'll be routed to the Download page soon.

## Download Page

1. Optionally rename any of the courses. The name will be used for the calendar event titles.
2. If there are duplicates (often this is caused when an event takes place in multiple rooms) choose which ones you'd
   like. By default, the first one is selected.
3. Click the download button and the events will be downloaded as an iCal (.ics) file. Simply open it and your default
   calendar should prompt you to import the events.
    * It's recommended to import it to a new or unimportant calendar in case there are any issues with the file, so you
      can simply delete the calendar and try again.
    * I've had issues with importing the file to non-main calendars on Google Calendar as the alerts don't work
      properly.
4. To use it again, simply reload the page.

# How it works

The front-end is written in [React](https://react.dev/) using [Vite](https://vitejs.dev/). The back-end is hosted
on [Google Cloud](https://cloud.google.com/?hl=en) using Cloud Functions.
The apis were made with [express](https://expressjs.com/). The campus options and timetable data is scraped
using [puppeteer](https://pptr.dev/) from the
university's [timetable website](https://www.hw.ac.uk/uk/students/studies/timetables.htm). The calendar files are
generated using the [ics](https://www.npmjs.com/package/ics)
library. However, the library isn't fully complete and has some issues, so I've had to modify some of the generated ics. 