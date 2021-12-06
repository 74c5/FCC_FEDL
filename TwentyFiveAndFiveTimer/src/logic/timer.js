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
    // load next session/break interval
    state.sessionType = getNextSession(state.sessionType);
    setSessionParams();

    // stop timer if not in continuous mode
    if ( state.isContinuous == false ) {
        clearInterval(state.intervalID);
        dispatch( timer.setStatus( TIMER_STATES.stopped ));
    }

    // reset timer value to zero
    dispatch( timer.setValue(0) );
}

// Public operations

/**
 * Should be called by Timeout callback every TIMER_PERIOD ms.
 */
const updateTimer = () => {
    const { value, limit, label } = store.getState().timer;
    const now = Date.now();
    const elapsed = value + now - state.tick;
    state.tick = now;

    if (elapsed < limit) { 
        dispatch( timer.setValue( elapsed ) );

    } else { // timer has expired
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
    const {label, limit, color, alarm, isContinuous} = getSessionParams(state.sessionType);
    state.clip         = new Audio(alarm);
    state.isContinuous = isContinuous;
    dispatch( timer.setParams( {label, limit, color} ) );
}

export const stopTimer = () => {
    clearInterval(state.intervalID);
    dispatch( timer.setValue( 0 ) );
    dispatch( timer.setStatus( TIMER_STATES.stopped ) );
};

export const initialise = () => {
    state.sessionType = SESSION_TYPES.session;
    setSessionParams();
}