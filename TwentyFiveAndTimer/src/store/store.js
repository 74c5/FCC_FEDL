import { createSlice, configureStore } from '@reduxjs/toolkit'

export const TIMER_STATES = { running: 'running', stopped: 'stopped'};

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
                label      : 'session',
                length     : 25*60000/150,      // in ms
                color      : 'green',
                value      : 0,
                intervalId : 0,             // timeout id, increment the value
                tick       : 0,             // time of previous timer check
    },
    temp: "hello world",
};

// reference to HTML audio clip
const audio = (process.browser)? document.querySelector('#beep') : null;

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
                if (state.timer.status == TIMER_STATES.stopped) {
                    // start the timer
                    state.timer.tick = Date.now();
                    state.timer.intervalId = setInterval(timerUpdateCallback, 1000);
                    state.timer.status = TIMER_STATES.running;
                } else { // running
                    // update the timer value - breaks test rubrik
                    //state.timer.value += action.payload - state.timer.tick;
                    //state.timer.tick = action.payload;

                    clearInterval(state.timer.intervalId);
                    state.timer.status = TIMER_STATES.stopped;
                }
            },
            prepare: () => ({ payload: Date.now() }),
        },
        resetTimer : {
            reducer: (state, action) => { 
                if (state.timer.status == TIMER_STATES.running) {
                    state.timer.status = TIMER_STATES.stopped;
                    clearInterval(state.timer.intervalId);
                }
                state.timer.length = DEFAULTS.session.length*60000;
                state.timer.label  = state.session.label;
                state.timer.color  = state.session.color;
                state.timer.value  = 0;

                state.session.length = DEFAULTS.session.length;
                state.break.length = DEFAULTS.break.length;

                // rewind alarm clip playing
                //const audio = document.querySelector("#beep");
                if ( audio ) {
                    //audio.load();
                    audio.pause();
                    audio.currentTime = 0;
                } else {
                    console.log('Error unable to pause clip with id: "beep"');
                }
            },
        },
        updateTimer : {
            reducer: (state, action) => { 
                const value = state.timer.value + (action.payload - state.timer.tick);
                const remaining = state.timer.length - value;

                if (remaining >= 0) {    
                    // advance the timer
                    state.timer.value = value;
                    state.timer.tick  = action.payload;
                
                } else { // timer has expired
                    // rewind and start alarm playing
                    // const audio = document.querySelector("#beep");
                    if ( audio ) {
                        //audio.load();
                        //audio.volume = volume;
                        audio.currentTime = 0;
                        audio.play();
                    } else {
                        console.log('Error unable to play clip with id: "beep"');
                    }
                    
                    // set-up next session
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
                    state.timer.tick  = action.payload + remaining;
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