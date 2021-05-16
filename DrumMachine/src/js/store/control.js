import { updateDisplay } from './ui';

// default state
const DEFSTORE = {
    playerMap : {},     //letter to playAudio function mapping
    power     : 'on',   //'on' || 'off'
    volume    : 0,      //0 to 1
};

// action list
const ACTIONS = {
    REGISTERKEY : 'control/registerKey',
    POWER       : 'control/power',
    SETVOLUME   : 'control/volume',
}

// action functions
export const registerKey = (key, player) => (dispatch, getState) => {
    dispatch({ type: ACTIONS.REGISTERKEY, payload: {key, player} })
};

export const togglePower = (dispatch, getState) => {
    const power = getState().control.power;

    if (power === 'on') { // then power down - add a small delay allow message display
        dispatch(updateDisplay('Turning Off - Goodbye'));
        setTimeout(()=> dispatch({type: ACTIONS.POWER, payload: 'off'}), 2000);
    
    } else { // power up
        dispatch({type: ACTIONS.POWER, payload: 'on'});
        dispatch(updateDisplay('Hello, Dave...', 2000));
    }
};

export const setVolume = (payload) => (dispatch, getState) => {
    dispatch({type: ACTIONS.SETVOLUME, payload})
}

//reducer
export const reducer = (store=DEFSTORE, {type, payload}) => {
    switch (type) {
        case ACTIONS.REGISTERKEY:
            const playerMap = {...store.playerMap};
            playerMap[payload.key] = payload.player;

            return { ...store, playerMap };

        case ACTIONS.POWER:
            return { ...store, power: payload };

        case ACTIONS.SETVOLUME:
            return { ...store, volume: payload };

        default:
            return store;
    };
}

export default reducer;
