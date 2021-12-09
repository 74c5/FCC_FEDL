import store, {dispatch} from '../store/store';
import { actions as timer } from '../store/timerSlice';
import { SESSION_TYPES, getNextSession, getSessionParams } from './settings';

// Application constants
export const TIMER_STATES = {
    running : 'running',
    paused  : 'paused',
    stopped : 'stopped'
};

const TIMER_PERIOD = 1000;  // ms

// Application state
const state = {
    sessionType  : 0,        // currently running session type
    intervalID   : 0,        // id of interval (interupt/event) used when timer is running
    tick         : 0,        // time of last tick while the timer was running
    clip         : null,     // audio object which plays the clip
    isContinuous : false     // should next interval be started automagically?
}

// utility functions

const playClip = () => {
    if (state.clip) {
        //clip.volume = volume;
        //state.clip.currentTime = 0;
        state.clip.play();
    } else {
        console.log(`unknown alarm clip: ${state.audio}`);
    }
}

/**
 * moves to next timer state - without incrementing the count
 */
 export const nextTimer = () => {
    // stop timer if not in continuous mode
    if ( state.isContinuous == false ) {
        clearInterval(state.intervalID);
        dispatch( timer.setStatus( TIMER_STATES.stopped ));
    }

    // load next session/break interval
    state.sessionType = getNextSession(state.sessionType);
    
    const {label, limit, color, alarm, isContinuous} = getSessionParams(state.sessionType);
    state.clip         = new Audio(alarm);
    state.isContinuous = isContinuous;
    dispatch( timer.setParams( {label, limit, color} ) );
    dispatch( timer.setValue(limit) );  // reset the timer value
}

// Public operations

/**
 * Should be called by Timeout callback every TIMER_PERIOD ms.
 */
const updateTimer = () => {
    const value = store.getState().timer.value;
    const now = Date.now();
    const remaining = value - (now - state.tick);

    dispatch( timer.setValue( remaining ) );
    state.tick = now;

    if (remaining <= 0) {   // timer has expired
        // set off alarm
        playClip(state.alarm);
        // increment counter
        if ( state.sessionType == SESSION_TYPES.session ) {
            dispatch( timer.incrementCount() );
        }
        
        nextTimer();
    }
}

// application functions
export const toggleTimer = () => {
    const status = store.getState().timer.status;
    if ( status == TIMER_STATES.running ) {
        updateTimer();
        clearInterval(state.intervalID);
        dispatch( timer.setStatus( TIMER_STATES.paused ) );

    } else {
        state.tick       = Date.now();
        state.intervalID = setInterval(updateTimer, TIMER_PERIOD);
        dispatch( timer.setStatus( TIMER_STATES.running ) );
    }
}

export const setSessionParams = () => {
    const {limit: prevLimit, value} = store.getState().timer;
    const {label, limit: newLimit, color, alarm, isContinuous} = getSessionParams(state.sessionType);

    state.clip         = new Audio(alarm);
    state.isContinuous = isContinuous;
    dispatch( timer.setParams( {label, limit: newLimit, color} ) );

    if (prevLimit != newLimit) {
        dispatch( timer.setValue(value + (newLimit - prevLimit)) );  // this could create a race condition with the Timeout (running every second)...
    }
}

export const stopTimer = () => {
    clearInterval(state.intervalID);
    dispatch( timer.setValue( store.getState().timer.limit ) );
    dispatch( timer.setStatus( TIMER_STATES.stopped ) );
};

export const initialise = () => {
    state.sessionType = SESSION_TYPES.session;
    const {label, limit, color, alarm, isContinuous} = getSessionParams(state.sessionType);
    state.clip         = new Audio(alarm);
    state.isContinuous = isContinuous;
    dispatch( timer.setParams( {label, limit, color} ) );
    dispatch( timer.setValue(limit) );  // reset the timer value
}