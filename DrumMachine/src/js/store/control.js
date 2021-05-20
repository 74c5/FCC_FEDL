import { updateDisplay, setBank, setEnable } from './ui';

// default state
const DEFSTORE = {
    enabled   : true,   // true || false.
    keylist   : {},     // allows registration of key pad letters
    banklist  : [],
    volume    : 0,      //0 to 1
};

// action list
const ACTIONS = {
    REGISTERKEY : 'control/registerKey',
    ENDISABLE   : 'common/toggleEnable',
    SELECTBANK  : 'common/bankselect',
    SETBANKLIST : 'common/setbanklist',
    SETVOLUME   : 'control/volume',
}

// action functions
export const playClip = (id) => (dispatch, getState) => {
    const enabled = getState().control.enabled;
    const volume = getState().control.volume;
    if (enabled) {
        const audio = document.querySelector(`#${id}`);
        if (audio) {
            const desc = audio.dataset.description;
            dispatch(updateDisplay(desc, 2000));
            //audio.load();
            audio.volume = volume;
            audio.play();
        } else {
            dispatch(updateDisplay('unknown clip', 1500));
        }
    }
}

export const registerKey = (key) => (dispatch, getState) => {
    dispatch({ type: ACTIONS.REGISTERKEY, payload: key })
};

export const selectBank = (id) => (dispatch, getState) => {
    const enabled = getState().control.enabled;
    const banklist = getState().control.banklist;
    if (enabled) {
        dispatch(setBank(banklist[id]));
        dispatch({type: ACTIONS.SELECTBANK, payload: id})
    }
}

export const setBankList = (banklist) => (dispatch, getState) => {
    const enabled = getState().control.enabled;
    if (enabled) dispatch({type: ACTIONS.SETBANKLIST, payload : banklist});
}

export const setVolume = (payload) => (dispatch, getState) => {
    dispatch({type: ACTIONS.SETVOLUME, payload})
}

export const toggleEnable = (dispatch, getState) => {
    const enabled = getState().control.enabled;
    
    if (enabled) { // power down cycle
        dispatch(updateDisplay("Don't do it Dave...", 1500));
        setTimeout(()=> {
            // check we are still powered down, then disable ui
            if (getState().control.enabled === false) {
                dispatch(setEnable(!enabled))
            }
        }, 2000);
    } else {
        dispatch(setEnable(!enabled));
        setTimeout(()=> {
            // If we are still powered up - display a welcome message
            if (getState().control.enabled === true) {
                dispatch(updateDisplay("Hello, Dave...", 1500))
            }

            }, 500);
    }
    dispatch({type: ACTIONS.ENDISABLE, payload: !enabled});
};

//reducer
export const reducer = (store=DEFSTORE, {type, payload}) => {
    switch (type) {
        case ACTIONS.REGISTERKEY:
            const newlist = {...store.keylist};
            newlist[payload] = 'enabled';
            return { ...store, keylist: newlist };

        case ACTIONS.ENDISABLE:
            return { ...store, enabled: payload };

        case ACTIONS.SETBANKLIST:
            return { ...store, banklist : payload};
        
        case ACTIONS.SETVOLUME:
            return { ...store, volume: payload };

        default:
            return store;
    };
}

export default reducer;
