## Javascript Calculator

- fix rubrik errors

- [x] finish logic interpreting tokens

- [x] finish conversion to tokenizer of inputs
    - token manipulation into calculator
    - controller glues updated tokens to state
    - use array of keys for numbers (instead of string values);
    - stringify tokens (print functions)

- [x] basic calculator 
    - [x] parse tokens
        - single operations
        - negative numbers
        - complex operations
    - recursive calculation function on tree
        - [x] basic tests pass
        - advanced tests and error branches

- [x] ans used as default after calculation
    - current behaviour is for formula to continue

- [?] create mapping for token to formula/screen display - which is not the token id.
    - [x] ish - seperated out functions in the symbol map

- [x] prevent entry of double operators
    - last operator takes precidence

- [x] test harness for functional code
    - jest is built into react-app

- [x] nice fonts
- display chars (unicode for mult and divide)

- additional functions
    - backspace
    - sqrt
    - constants
    - brackets?
    - trig
    - memory functions
    - calculation list

- look at react and redux debugging toolkit

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
