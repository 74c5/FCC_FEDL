## Drum Machine


- [x] power button uses button

- [x] remove react warnings...

- [x] power button
- [x] volume slider

- [x] get rubrik to pass...
- [x] mobile view

- [x] section state into more meaningful sections
    - pad is redrawn for lots of unnecessary reasons
    - ? should I make a component for player (somehow?)

- [x] decouple player from interface
    - separate logic to play clips => easier to switch banks (i.e. no dispatch change?)
    - but, dispatch can only be called in components (messaging? and consistancy?)

- [x] decouple power mode from interface
    - disable action in control (or dispatch and not in components...)
    - need ui 'enabled/disabled' flag for styling...

- [x] DrumMachine styling needs to know id's of sub-components in order to correctly lay those components out.
    - this "should" be decoupled

- [x] Cleanup code (on aisle 9)

- Redux :use slices instead of old style reducers
    - deferred since this project is simple and 
    - usage of Immer,means no longer empasizing immutable reducer functions

- improvements / questions:
    - SCSS - I'm relying on calc() to do heavy lifting for component sizes
        - is this scalable? who do I exclude?
        - is there a better way or do I need to make peace with tradeoffs?

- look at react and redux debugging toolkit

- react context for app level constants?
    - e.g. power state?

- Basic Styling
    - ? undecided on selector styling (should just be more pads?)
    - display fadeout animation? where?

- Sound Board Selector
    - [x] with radio?
    - use icons for selectors (on/off like power button)
        - use SVG icons? means custom class and not a library? but fa doesn't do cowbells...
        - https://uxwing.com/?s=power

- Cosmetics
    - power button glow and colours / power down indication on other components




## next

- sass should probably be a dev dependency?


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
