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
            reducer: (state, action) => {
                state.bankID = action.payload.bankID;
                state.bank   = action.payload.bank;
            },
            prepare: (bankID, bank) => ({payload : { bankID, bank}})
        },
        setBankList : {
            reducer: (state, action) => { state.banklist = action.payload },
            prepare: (nameArray) => ({ payload: nameArray }),
        }
    }
});

export const actions = uiSlice.actions;
export default uiSlice.reducer;