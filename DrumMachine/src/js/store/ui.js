// default state
const DEFSTORE = {
    display : {text : "", timeout: 0},
    banks   : [],
    bankID  : -1,
};

// action list
const ACTIONS = {
    DISPLAY     : 'ui/display',
    SELECTBANK  : 'ui/bankselect',
    SETBANKS    : 'ui/banks'
}

// action functions
export const updateDisplay = (text, timeout=-1) => (dispatch, getState) => {
    dispatch({ type: ACTIONS.DISPLAY, payload: {text, timeout} })
};

export const configureBanks = (bank) => (dispatch, getState) => {
    dispatch({type: ACTIONS.SETBANKS, payload : bank});
}

export const selectBank = (id) => (dispatch, getState) => {
    dispatch({type: ACTIONS.SELECTBANK, payload: id});
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
        
        case ACTIONS.SETBANKS:
            return { ...store, banks : payload};
        
        case ACTIONS.SELECTBANK:
                return { ...store, bankID : payload};

        default:
            return store;
    }
}

export default reducer;
