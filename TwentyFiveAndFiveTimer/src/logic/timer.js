import store, {dispatch} from '../store/store';
import { actions as timer } from '../store/timerSlice';
import { getNextSession } from './settings';

// Application constants
export const TIMER_STATES = {
    running : 'running',
    paused  : 'paused',
    stopped : 'stopped'
};

const TIMER_PERIOD = 1000;  // ms

// Application state
const state = {
    intervalID : 0,     // id of interval event used when timer is running
    tick       : 0,     // time of last tick while the timer was running
}

// utility functions
/**
 * Should be called by Timeout callback every TIMER_PERIOD ms.
 */
const updateTimer = () => {
    const { value, limit, label } = store.getState().timer;
    const now = Date.now();
    const elapsed = value + now - state.tick;

    if (elapsed < limit) { 
        state.tick = now;
        dispatch( timer.updateTimer( elapsed ) );

    } else { // timer has expired
        // TODO: set off alarm
        const { label: newLabel, limit, color, run, increment } = getNextSession(label);
        dispatch( timer.resetTimer( {label: newLabel, limit, color} ) );
        if ( !run ) {
            clearInterval(state.intervalID);
            dispatch( timer.setStatus( TIMER_STATES.stopped ));
        }
        if ( increment ) dispatch( timer.incrementCount() );
        state.tick = now;
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


export const stopTimer = () => {
    clearInterval(state.intervalID);
    dispatch( timer.updateTimer( 0 ) );
    dispatch( timer.setStatus( TIMER_STATES.stopped ) );
};