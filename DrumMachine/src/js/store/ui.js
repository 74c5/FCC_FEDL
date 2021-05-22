import { createSlice } from '@reduxjs/toolkit';

// default state
const initialState = {
    enabled  : true, // or 'disabled'
    display  : "",   // text to display on ui element
    bank     : {},   // mapping of letter (e.g. 'Q') to audio src and description
    bankID   : -1,
    banklist : [],   // list of bank names - the index is used as a key
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setEnable : {
            reducer: (state, action) => { state.enabled = action.payload; },
            prepare: (enabled) => ({ payload: enabled }),
        },
        display: {
            reducer: (state, action) => { state.display = action.payload; },
            prepare: (text) => ({payload: text}),
        },
        setBank : {
            reducer: (state, action) => { state.bank = action.payload; },
            prepare: (bank) => ({payload: bank})
        },
        setBankList : {
            reducer: (state, action) => { state.banklist = action.payload },
            prepare: (nameArray) => ({ payload: nameArray }),
        }
    }
});

export const { setEnable, display, setBank, setBankList } = uiSlice.actions;
export default uiSlice.reducer;

// // action list
// const ACTIONS = {
//     SETENABLE   : 'ui/setEnable',
//     DISPLAY     : 'ui/display',
//     SETBANK     : 'ui/setbank',
//     SETBANKLIST : 'common/setbanklist',

// }

// // action functions
// export const updateDisplay = (text, timeout=-1) => (dispatch, getState) => {
//     dispatch({ type: ACTIONS.DISPLAY, payload: text} );
//     if (timeout > 0) {
//         // clear down the message after timeout period...
//         setTimeout(()=> {
//             const current = getState().ui.display;
//             if (current === text) {
//                 dispatch({ type: ACTIONS.DISPLAY, payload: "" });
//             }
//         }, timeout);
//     }
// };

// export const setBank = (bank) => (dispatch,getState) => {
//     dispatch({ type: ACTIONS.SETBANK, payload: bank});
// };

// export const setEnable = (flag) => (dispatch, getState) => {
//     dispatch({ type: ACTIONS.SETENABLE, payload: flag});
// };

// //reducer
// export const reducer = (store=DEFSTORE, {type, payload}) => {
//     switch (type) {
//         case ACTIONS.DISPLAY:
//             return { ...store, display : payload };
        
//         case ACTIONS.SETBANK:
//             return { ...store, bank : payload };

//         case ACTIONS.SETBANKLIST:
//             return { ...store, banklist : payload.map(val => val.name)};
    
//         case ACTIONS.SETENABLE:
//             return { ...store, enabled: payload };

//         default:
//             return store;
//     }
// }

// export default reducer;
