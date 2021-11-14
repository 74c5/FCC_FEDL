import { createSlice } from '@reduxjs/toolkit';

// default state
const initialState = {
    show : false,
    session: {
        default: 25,          // number of minutes in session
        limit  : 0.1,
        color  : 'green'
    },
    shortBreak: {
        default: 5,           // number of minutes in a break
        limit  : 0.05,
        color  : 'red'
    },
    mode : 'continuous',
};


const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        toggleShow : {
            reducer: (state) => { 
                state.show = !(state.show)
            },
        },
        setMode : {
            reducer: (state, action) => { state.mode = action.payload; },
            prepare: (mode) => ({ payload: mode }),
        },
    }
});

export const actions = settingsSlice.actions;
export default settingsSlice.reducer;

