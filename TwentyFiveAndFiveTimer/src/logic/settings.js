import store, {dispatch} from '../store/store';
import { actions as settings } from '../store/settingsSlice'

// Application Constants
export const TIMER_MODES = {
    continuous : 'continuous',
    paused     : 'paused',
}

export const MODE_MAP = new Map();
MODE_MAP.set(TIMER_MODES.continuous, {text: 'Continuous', desc: 'After the timer runs out, reset the timer for the next session/break interval and start the countdown.'});
MODE_MAP.set(TIMER_MODES.paused,     {text: 'Paused',     desc: 'After the timer runs out, reset the timer to the next session/break interval and pause.'});

export const MODE_LIST =  Object.entries(TIMER_MODES)
                                .reduce((acc, [key, value]) => {
                                    if ( TIMER_MODES.hasOwnProperty(key) ) {
                                        const detail = MODE_MAP.get(value);
                                        acc.push({ value : value,
                                                text  : detail.text,
                                                tip   : detail.desc 
                                                });
                                    }
                                    return acc;
                                }, []);

export const SESSION_TYPES = {
    session    : 'session',
    shortBreak : 'shortBreak'
}

const SESSION_DEFAULTS = new Map();
SESSION_DEFAULTS.set(SESSION_TYPES.session, {label: 'Session', limit: 25});
SESSION_DEFAULTS.set(SESSION_TYPES.shortBreak, {label: 'Session', limit: 5});

// utility functions

// application functions
/**
 * @param {integer} value // time in minutes for the session
 *                        // a value <= 0 will reset the time to default
 */
export const setSessionLimit = (value) => {
    dispatch( settings.setSessionLimit( (value > 0)? value : SESSION_DEFAULTS.get(SESSION_TYPES.session).limit ) );
};

/**
 * @param {integer} value // time in minutes for the session
 *                        // a value <= 0 will reset the time to default
 */
export const setShortBreakLimit = (value) => {
    dispatch( settings.setShortBreakLimit( (value > 0)? value : SESSION_DEFAULTS.get(SESSION_TYPES.session).limit ) );
};

export const selectMode = (mode) => {
    dispatch( settings.setMode(mode) );
}

// keycode event handler
// const keyDown = (event) => {
//     const keylist = store.getState().data.keylist;
//     const id = MAPKEY[event.code];
//     if (keylist[id] === 'enabled') {
//         playClip(id);
//     }
// }

/**
 * @param {SESSION_TYPES} type
 * @returns type of the next session
 */
export const getNextSession = (type) => {
    return (type == SESSION_TYPES.session)? SESSION_TYPES.shortBreak : SESSION_TYPES.session;
};

/**
 * Accessor Method for currently timer parameters - from store (and defaults)
 * @param {SESSION_TYPE} type 
 * @returns 
 */    
export const getSessionParams = (type) => {
    const state = store.getState().settings;
    return {
        label        : SESSION_DEFAULTS.get(type).label,
        limit        : state[type].limit * 60000,
        color        : state[type].color,
        isContinuous : (state.mode == TIMER_MODES.continuous),
    }
}


// Startup sequence for the programme
export const initialise = () => {
    // dispatch(data.clearSymbols());
    // dispatch(ui.display('0'));
    // document.addEventListener('keydown', keyDown);
};

export default initialise;