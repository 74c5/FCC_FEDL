## TwentyFive and Five Timer

- Fav Icon and tab name
    - PomoGoTime

- https://www.freecodecamp.org/news/designing-keyboard-accessibility-for-complex-react-experiences/

Layout
    - radial count representation
    - settings modal
        - https://www.netlify.com/blog/2020/12/17/react-children-the-misunderstood-prop/
        - https://daveceddia.com/open-modal-in-react/

clockface font?

Blinking clock face on pause?

Retain settings in a cookie? or browser cache?

- look at react and redux debugging toolkit

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
