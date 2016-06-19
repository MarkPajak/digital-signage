# Digital Signage
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
 

SETUP

 - to see basic use, download the zip and open startme.bat (in windows)
 - use Chrome dev tools>emulator to set screen dimensions to 1080 x 1920 or 1920 x 1080
 
ADVANCED

*GOOGLE DRIVE*
 - change the google drive public url to a publi image directory
 - set folders in the directory to match venue and machine name

*EVENTS FEED*
 - configure the backbone models to connect to an events api (field names must match the source data - these will need updating throughout the app if different)
 - 
