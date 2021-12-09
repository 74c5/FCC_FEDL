import { createSlice } from '@reduxjs/toolkit';

// default state
const initialState = {
    session: {
        limit  : 25,       // timer limit for session in minutes
        color  : 'green'
    },
    shortBreak: {
        limit  : 5,      // timer limit for session in minutes
        color  : 'red'
    },
    mode : 'continuous',
};


const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setMode : {
            reducer: (state, action) => { state.mode = action.payload; },
            prepare: (mode) => ({ payload: mode }),
        },
        setSessionLimit : {
            reducer: (state, action) => { state.session.limit = action.payload; },
            prepare: (limit) => ({ payload: limit }),
        },
        setShortBreakLimit : {
            reducer: (state, action) => { state.shortBreak.limit = action.payload; },
            prepare: (limit) => ({ payload: limit }),
        }
    }
});

export const actions = settingsSlice.actions;
export default settingsSlice.reducer;

