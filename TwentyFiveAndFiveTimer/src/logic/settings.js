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

const SESSION_TYPES = {
    session    : 'Session',
    shortBreak : 'Break'
}

// utility functions

// application functions
export const toggleSettingsModal = () => {
    dispatch( settings.toggleShow() );
};

const incrementSessionTime = () => {console.log('todo: incrementSessionTime')};
const decrementSessionTime = () => {console.log('todo: decrementSessionTime')};
const incrementBreakTime = () => {console.log('todo: incrementBreakTime')};
const decrementBreakTime = () => {console.log('todo: decrementBreakTime')};
const resetToDefaults = () => {console.log('todo: resetToDefaults')};

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

// control functions
export const getNextSession = (label) => {
    const { mode, session, shortBreak } = store.getState().settings;
    if (label == SESSION_TYPES.session) {
        const {limit, color} = shortBreak;
        return {
            label    : SESSION_TYPES.shortBreak,
            limit    : limit * 60000,
            color,
            run:        (mode == TIMER_MODES.continuous),
            increment:  true
        };
    } else {
        const {limit, color} = session;
        return {
            label    : SESSION_TYPES.session,
            limit    : limit * 60000,
            color,
            run:        (mode == TIMER_MODES.continuous),
            increment:  false
        }
    }
}


// Startup sequence for the programme
export const initialise = () => {
    // dispatch(data.clearSymbols());
    // dispatch(ui.display('0'));
    // document.addEventListener('keydown', keyDown);
};

export default initialise;