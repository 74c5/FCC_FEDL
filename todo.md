## TwentyFive and Five Timer

- [x] migrate demos to 74c5.github.io/demos/FEDL
    - turn off github pages for FEDL

- https://www.freecodecamp.org/news/designing-keyboard-accessibility-for-complex-react-experiences/

help modal from the settings/controls/main screen?

Advanced Settings - colors/ theme?

Blinking clock face on pause?

- display for mode on main screen

Retain settings in a cookie? or browser cache?

- look at react and redux debugging toolkit

shortcut keys

## Javascript Calculator

- additional features
    - constants
    - trig
    - memory functions
    - calculation list
    - editable formula bar
    - keyboard input / shortcuts

## Drum Machine

- improvements / questions:
    - SCSS - I'm relying on calc() to do heavy lifting for component sizes
        - is this scalable? who do I exclude?
        - is there a better way or do I need to make peace with tradeoffs?

- react context for app level constants?
    - e.g. power state?

- Styling
    - animations. e.g. display fadeout animation? where?
    - button click on keypresses
    - power button glow and colours / power down indication on other components

- Sound Board Selector
    - use icons for selectors (on/off like power button)
        - use SVG icons? means custom class and not a library? but fa doesn't do cowbells...
        - https://uxwing.com/?s=power


## Markdown Previewer 

- Improvements:
    - clean reducer function
        - move default initial state to store creation and work with sensible defaults
        - move business logic (functionality) to separate files or area (logic/business/functions folder?)

## Random Quote Machine

Tweaks
- how to make main color white on buttons - with lighter themes?
- favicon
- fancy quotations for quoted text

## template

- babel to ES5? though that is done on prod builds - by default?
