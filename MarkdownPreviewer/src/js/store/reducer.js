// At the minute we only have simple state - it is all lumped in together
import marked from 'marked';
import DOMpurify from 'dompurify';

// action enums
const SET_OUTPUT = 'set-output';
const SET_INPUT = 'set-input';
const SET_STATUS = 'set-status';
const SET_MODE = 'set-mode';

// action functions
export const setInput = (text) => (dispatch, getState) => {
    const { mode } = getState();
    dispatch({type: SET_INPUT, payload: text});
    
    if (mode === 'interactive') dispatch(translate);
}; 

export const translate = (dispatch, getState) => {
    const {input, status} = getState();
    
    if (status === 'busy') return {type: undefined}; //ignore futher calls for translation

    dispatch({type: SET_STATUS, payload: 'busy'});

    const html = marked(input, {breaks: true});
    const clean = DOMpurify.sanitize(html);

    dispatch({type: SET_OUTPUT, payload: clean}); //todo: use converted input
}

export const setMode = (mode) => (dispatch, getState) => dispatch({type: SET_MODE, payload: mode});


// defaults
const text = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can be here, | and it can be here.... | or there
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![FavIcon](./favicon.ico)
`;

const defaultStore = {
    input:  text,
    output: DOMpurify.sanitize(marked(text, {breaks: true})),
    mode:   'interactive',  // interactive || manual
    status: 'idle',  // idle || busy
}


// reducers
const markdownReducer = (store=defaultStore, {type, payload}) => {
    switch (type) {
        case SET_INPUT:
            return {...store, input: payload};
        case SET_OUTPUT:
            return ({...store, output: payload, status: 'idle'});
        case SET_STATUS:
            return ({...store, status: payload});
        case SET_MODE:
            console.log(`new mode is ${payload}?`)
            return ({...store, mode: payload});
        default:
            return store;
    }
}

export default markdownReducer;
export {markdownReducer as rootReducer};