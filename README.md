# Heriot Watt University Google Calendar Timetable
***NOTE:*** **This project is in no way affiliated with Heriot Watt University or Google**

# Known Issues
* Sometimes, not all the course options are scraped by the server, if you don't find your course try refreshing.
* Time zone definitions aren't added so this might not work for all calendars, however, it should still work with popular calendar apps
* Google calendar doesn't support notifications after events
* Alerts
  * If you're having an issue with importing the file try not adding an alert.
  * The library used to generate the iCal (.ics) file has a bug with creating alerts. I've created an issue which you can check here in case this is resolved: https://github.com/adamgibbons/ics/issues/253
  * I'm currently working around this by replacing it but there may be other cases I haven't come across which the regex doesn't detect.
