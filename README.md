# Digital Signage (museum, venue, gallery)
Digital signage web application capable of multiple orientation, online offline, events list and poster modes

This application is running across multiple Bristol Museum Venues, on various screen sizes and orientations.

 - Poster mode
 - Events list mode
 - Sponsor list mode
 - Instagram mode
 - Integrates with Google Drive to load posters for private events - overrides normal settings
 - Runs posters locally when wifi is down
 - Connects to api to load events & posters
 - Optimised for 1080 x 1920 landscape and portrait screens
 - Can have screen-specific settings to manage different venues / branding
 - Timings for each mode can be configured
 - automatic content refresh to allow for remote control
 - different event types displayed differently - facilities | special events | exhibitions | visitor information
 - filter specific event types for each screen or venue
 

#SETUP

 - to see basic use, download the zip and open startme.bat (in windows)
 - use Chrome dev tools>emulator to set screen dimensions to 1080 x 1920 or 1920 x 1080
 
#ADVANCED

 - set machine specific settings by building your own settings.JSON file
 - use the url parameters to load up the settings

#GOOGLE DRIVE

 - change the google_drive_public_dir to your public image directory (router.js)
 - set folders in the directory to match venue and machine name in the url parameters
 - current functionality is dependent on the following google web service:
  
https://script.google.com/macros/s/AKfycbwM0s-BIV9oOHtyV-wAoNirZHaf1eWXph8klsh8seYp3VdVE_JA/exec

This returns a list of the images and folders in the Google public directory of th euser hosting the google Apps Script. To make this work with your onw google drive you'll need to copy the script and republish under your hosting.

The script is embedded in the follwoing public google sheet, which you can copy:

https://docs.google.com/spreadsheets/d/1AjghZlrQOOjs4OzW0rpt_WOftFG9Uidm7PnP4rncqsw/edit?usp=sharing





#EVENTS FEED

 - configure the backbone models to connect to an events api (field names must match the source data - these will need updating throughout the app if different)
 - publish events.JSON at your own url using this structure:
 
 http://museums.bristol.gov.uk/sync/data/events.JSON


 
