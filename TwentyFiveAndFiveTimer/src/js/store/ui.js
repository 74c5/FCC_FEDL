import { createSlice } from '@reduxjs/toolkit';

// default state
const initialState = {
    timer : {
        status  : 'playing', // playing, paused or stopped
        label   : 'Pomo',    // which timer is running
        value   : '23:43',   // current timer value
        percent : 15,        // percent complete ??? todo: needed?
    },
    session: {
        limit : 25,          // number of minutes in session
        count : 3,           // number of sessions completed
    },
    break: {
        limit : 5,           // number of minutes in a break
    },
    showSettings : false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        timer: {
            reducer: (state, action) => { state.timer = action.payload; },
            prepare: (timer) => ({payload: timer})
        },
        timerStatus: {
            reducer: (state, action) => { state.timer.status = action.payload; },
            prepare: (status) => ({payload: status}),
        },
        timerLabel: {
            reducer: (state, action) => { state.timer.label = action.payload; },
            prepare: (text) => ({payload: text}),
        },
        timerValue: {
            reducer: (state, action) => { state.timer.value = action.payload; },
            prepare: (text) => ({payload: text}),
        },
        timerPercent: {
            reducer: (state, action) => { state.timer.percent = action.payload; },
            prepare: (value) => ({payload: value}),
        },
        session: {
            reducer: (state, action) => { state.session = action.payload; },
            prepare: (session) => ({payload: session})
        },
        sessionLimit: {
            reducer: (state, action) => { state.session.limit = action.payload; },
            prepare: (value) => ({payload: value}),
        },
        sessionCount: {
            reducer: (state, action) => { state.session.count = action.payload; },
            prepare: (value) => ({payload: value}),
        },
        showSettings: {
            reducer: (state, action) => { state.showSettings = action.payload; },
            prepare: (bool) => ({payload: bool}),
        },
    }
});

export const actions = uiSlice.actions;
export default uiSlice.reducer;