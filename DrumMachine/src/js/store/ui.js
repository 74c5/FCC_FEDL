// default state
const DEFSTORE = {
    display  : {text : "", timeout: 0},
    bank     : {},   // mapping of letter (e.g. 'Q') to audio src and description
    bankID   : -1,
    banklist : [],   // list of bank names - the index is used as a key
};

// action list
const ACTIONS = {
    DISPLAY     : 'ui/display',
    SETBANK     : 'ui/setbank',
    SELECTBANK  : 'common/bankselect',
    SETBANKLIST : 'common/setbanklist',
}

// action functions
export const updateDisplay = (text, timeout=-1) => (dispatch, getState) => {
    dispatch({ type: ACTIONS.DISPLAY, payload: {text, timeout} })
};

export const setBank = (bank) => (dispatch,getState) => {
    dispatch({ type: ACTIONS.SETBANK, payload: bank});
}

//reducer
export const reducer = (store=DEFSTORE, {type, payload}) => {
    switch (type) {
        case ACTIONS.DISPLAY:
            return {
                ...store,
                display : {
                    text   : payload.text, 
                    timeout: payload.timeout || 0
                }
            };
        
        case ACTIONS.SETBANK:
            // console.log('ui bank:');
            // console.log(payload);
            return { ...store, bank : payload};

        case ACTIONS.SELECTBANK:
            return { ...store, bankID : payload};

        case ACTIONS.SETBANKLIST:
            // console.log(`ui banklist: ${payload.map(val => val.name)}`);        
            return { ...store, banklist : payload.map(val => val.name)};
    
        default:
            return store;
    }
}

export default reducer;
