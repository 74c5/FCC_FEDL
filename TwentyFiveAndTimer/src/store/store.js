import { createSlice, configureStore } from '@reduxjs/toolkit'

export const TIMER_STATES = { running: 'running', stopped: 'stopped', paused: 'paused'};
export const ALARM_STATES = { alarm : 'alarm', none: 'none', reset: 'reset'};
const DEFAULTS = {
    session : { length : 25 },
    break   : { length : 5 }
}

// initial state
const initialState = {
    session : { length : 10/60,
                color  : 'green',
                label  : 'session',
    },
    break   : { length : 5/60,
                color  : 'red',
                label  : 'break',
    },
    timer   : { status     : TIMER_STATES.stopped,
                alarm      : ALARM_STATES.reset,
                label      : 'session',
                length     : 25*60000/150,      // in ms
                color      : 'green',
                value      : 0,
                intervalId : 0,             // timeout id, increment the value
                tick       : 0,             // time of previous timer check
    },
    notify: {
        queue: [],
    }
};

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setSessionLength : {
            reducer: (state, action) => { 
                state.session.length = action.payload;
                if (state.timer.label == 'session') {
                    state.timer.length = action.payload*60000;
                }
            },
            prepare: (length) => ({ payload: (length < 1)? 1 : ( (length > 60)? 60 : length ) }),
        },
        setBreakLength : {
            reducer: (state, action) => { 
                state.break.length = action.payload; 
                if (state.timer.label == 'break') {
                    state.timer.length = action.payload*60000;
                }
            },
            prepare: (length) => ({ payload: (length < 1)? 1 : ( (length > 60)? 60 : length ) }),
        },
        toggleTimer : {
            reducer: (state, action) => { 
                // calculate updated value of the timer
//console.log('toggle', state.timer.status);
                if (state.timer.status == TIMER_STATES.running ) {
                    //this way of updating the timer value - breaks test rubrik
                    //state.timer.value += action.payload - state.timer.tick;
                    //state.timer.tick = action.payload;

                    clearInterval(state.timer.intervalId);
                    state.timer.status = TIMER_STATES.paused;

                } else {
                    state.timer.tick = action.payload;
                    state.timer.intervalId = setInterval(timerUpdateCallback, 1000);
                    state.timer.status = TIMER_STATES.running;
                    state.timer.alarm  = ALARM_STATES.none;
                }
            },
            prepare: () => ({ payload: Date.now() }),
        },
        resetTimer : {
            reducer: (state) => { 
                //if ( state.timer.status != TIMER_STATES.stopped ) {
                    state.timer.status = TIMER_STATES.stopped;
                //}
                //if ( state.timer.status == TIMER_STATES.running ) {
                    clearInterval(state.timer.intervalId);
                //}
                state.timer.alarm  = ALARM_STATES.reset;
                state.timer.length = DEFAULTS.session.length*60000;
                state.timer.label  = state.session.label;
                state.timer.color  = state.session.color;
                state.timer.value  = 0;

                state.session.length = DEFAULTS.session.length;
                state.break.length = DEFAULTS.break.length;
            },
        },
        updateTimer : {
            reducer: (state, action) => { 
//console.log('update', state.timer.status, state.timer.alarm, state.timer.value, state.timer.length, action.payload, state.timer.tick);
                if ( state.timer.value >= state.timer.length ) { // the last tick cause timer to over run
                    if (state.timer.label == 'session') {
                        state.timer.label  = state.break.label;
                        state.timer.color  = state.break.color;
                        state.timer.length = state.break.length * 60000;
                    } else {
                        state.timer.label  = state.session.label;
                        state.timer.color  = state.session.color;
                        state.timer.length = state.session.length * 60000;
                    } 
                    state.timer.value = 0;
                    state.timer.tick   = action.payload; // + remaining;
                    state.timer.alarm  = ALARM_STATES.none;
                    
                } else { // this is a normal tick
                    const value = state.timer.value + (action.payload - state.timer.tick);
                    
                    if ( value < state.timer.length ) {
                        // advance the timer
                        state.timer.value = value;
                        state.timer.tick  = action.payload;
                    
                    } else { // timer has expired
                        state.timer.value  = state.timer.length;
                        state.timer.tick   = action.payload; // + state.timer.length - value;
                        state.timer.alarm  = ALARM_STATES.alarm;
                    }
                }
            },
            prepare: () => ({ payload: Date.now() }),
        },
    }
});


// Devtools, thunk middelware and reducer composer are built into configureStore
const store = configureStore( { reducer: slice.reducer });

const timerUpdateCallback = () => { store.dispatch(slice.actions.updateTimer() )}

export default store;
export const actions = slice.actions;
export const dispatch = store.dispatch;