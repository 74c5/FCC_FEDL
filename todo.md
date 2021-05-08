## Markdown Previewer 

- [x] Remove bootstrap
- [x] spin it up

- [x] basic template

- [x] react hookup
    - local state for input? - nope!
    - transfer to output on button push

- [x] fonts
    - include code font

- [x] basic template mobile
    - [x] fix styling for controls and layout for mobile vs full
    - [x] non-interactive update (only on button press)

- rubrik
    - [x] names
    - [x] passing

- markdown translation
    - [x] problem: output is set as raw string... \n are ignored as are html tags
        - [x] how to output html text?
        - [x] use dangerouslySetInnerHTML on component
    - [x] use library??? - marked
    - [x] html sanitiser - DOMpurify
    - [x] add styling to output

- [x] allow max size instead of limiting...

- [x] react warnings

- Redux Hookup
    - [x] push input to output


- Redux :use slices instead of old style reducers
    - deferred since this project is simple and 
    - usage of Immer,means no longer empasizing immutable reducer functions

- Improvements:
    - clean reducer function
        - move default initial state to store creation and work with sensible defaults
        - move business logic (functionality) to separate files or area (logic/business/functions folder?)



- [x] interactive mode


## Random Quote Machine

Tweaks
- how to make main color white on buttons - with lighter themes?
- favicon
- fancy quotations for quoted text

## template

- babel to ES5? though that is done on prod builds - by default?
