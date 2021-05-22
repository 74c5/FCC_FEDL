import { createSlice } from '@reduxjs/toolkit';

// default state
const initialState = {
    enabled   : true,   // true || false.
    keylist   : {},     // allows registration of key pad letters
    banklist  : [],
    volume    : 0,      //0 to 1
};


const uiSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setEnable : {
            reducer: (state, action) => { state.enabled = action.payload; },
            prepare: (enabled) => ({ payload: enabled }),
        },
        registerKey : {
            reducer: (state, action) => { state.keylist[action.payload] = 'enabled'; },
            prepare: (key) => ({ payload: key }),
        },
        setBankList : {
            reducer: (state, action) => { state.banklist = action.payload; },
            prepare: (banklist) => ({ payload: banklist }),
        },
        setVolume : {
            reducer: (state, action) => { state.volume = action.payload; },
            prepare: (volume) => ({ payload: volume }),
        },
    }
});

export const actions = uiSlice.actions;
export default uiSlice.reducer;

