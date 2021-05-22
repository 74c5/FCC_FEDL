// import {  } from "redux";
import store from '../store/store';
import { actions as uiActions } from '../store/ui';
import { actions as dataActions } from '../store/data'

// Application Constants
// const KEYMAP = { Q:'KeyQ', W:'KeyW', E:'KeyE', A:'KeyA', S:'KeyS', D:'KeyD', Z:'KeyZ', X:'KeyX', C:'KeyC' };
const MAPKEY = { 'KeyQ':'Q', 'KeyW':'W', 'KeyE':'E', 'KeyA':'A', 'KeyS':'S', 'KeyD':'D', 'KeyZ':'Z', 'KeyX':'X', 'KeyC':'C' };

const BANKS = [
    {   name: 'bell',
        Q: {src: `${process.env.PUBLIC_URL}/media/audio/cowbell-C.mp3`,   desc: 'Cowbell C' },
        W: {src: `${process.env.PUBLIC_URL}/media/audio/cowbell-D.mp3`,   desc: 'Cowbell D' },
        E: {src: `${process.env.PUBLIC_URL}/media/audio/cowbell-E.mp3`,   desc: 'Cowbell E' },
        A: {src: `${process.env.PUBLIC_URL}/media/audio/cowbell-F.mp3`,   desc: 'Cowbell F' },
        S: {src: `${process.env.PUBLIC_URL}/media/audio/cowbell-G.mp3`,   desc: 'Cowbell G' },
        D: {src: `${process.env.PUBLIC_URL}/media/audio/cowbell-A.mp3`,   desc: 'Cowbell A' },
        Z: {src: `${process.env.PUBLIC_URL}/media/audio/cowbell-B.mp3`,   desc: 'Cowbell B' },
        X: {src: `${process.env.PUBLIC_URL}/media/audio/cowbell-C4D.mp3`, desc: 'Cowbell C (lower)' },
        C: {src: `${process.env.PUBLIC_URL}/media/audio/cowbell-D4A.mp3`, desc: 'Cowbell D (amp & distort)' },
    },
    {   name: 'cow',
        Q: {src: `${process.env.PUBLIC_URL}/media/audio/cow-C.mp3`,  desc: 'Cow C' },
        W: {src: `${process.env.PUBLIC_URL}/media/audio/cow-D.mp3`,  desc: 'Cow D' },
        E: {src: `${process.env.PUBLIC_URL}/media/audio/cow-E.mp3`,  desc: 'Cow E' },
        A: {src: `${process.env.PUBLIC_URL}/media/audio/cow-F.mp3`,  desc: 'Cow F' },
        S: {src: `${process.env.PUBLIC_URL}/media/audio/cow-G.mp3`,  desc: 'Cow G' },
        D: {src: `${process.env.PUBLIC_URL}/media/audio/cow-A.mp3`,  desc: 'Cow A' },
        Z: {src: `${process.env.PUBLIC_URL}/media/audio/cow-B.mp3`,  desc: 'Cow B' },
        X: {src: `${process.env.PUBLIC_URL}/media/audio/cow-FS.mp3`, desc: 'Cow F#' },
        C: {src: `${process.env.PUBLIC_URL}/media/audio/cow-GSorig.mp3`,  desc: 'Cow G#' },
    }
];


// app actions
export const display = (msg, timeout=0) => {
    store.dispatch(uiActions.display(msg));
    if (timeout > 0) {
        setTimeout(()=> { store.dispatch(uiActions.display("")) }, timeout);
    }
};

export const playClip = (id) => {
    const enabled = store.getState().data.enabled;
    const volume  = store.getState().data.volume;
    if (enabled) {
        const audio = document.querySelector(`#${id}`);
        if (audio) {
            const desc = audio.dataset.description;
            display(desc, 2000);
            //audio.load();
            audio.volume = volume;
            audio.currentTime = 0;
            audio.play();
        } else {
            display('unknown clip', 1500);
        }
    }
}

export const selectBank = (id) => {
    const enabled  = store.getState().data.enabled;
    if (enabled) {
        const banklist = store.getState().data.banklist;
        store.dispatch(uiActions.setBank(id, banklist[id]));
    }
}

export const setBankList = (banklist) => {
    const enabled = store.getState().data.enabled;
    if (enabled) {
        store.dispatch(uiActions.setBankList(banklist.map(bank => bank.name)));
        store.dispatch(dataActions.setBankList(banklist));
    }
}

export const setEnable = (enable) => {
    if (enable) { // power up cycle
        store.dispatch(dataActions.setEnable(true));
        store.dispatch(uiActions.setEnable(true));
        setTimeout(()=> {
            // If we are still powered up - display a welcome message
            if (store.getState().data.enabled === true) {
                display("Hello, Dave...", 1500);
            }
        }, 500);
    
    } else { // power down cycle
        store.dispatch(dataActions.setEnable(false));
        display("Don't do it Dave...", 1500);
        setTimeout(()=> {
            // check we are still powered down, then disable ui
            if (store.getState().data.enabled === false) {
                store.dispatch(uiActions.setEnable(false))
            }
        }, 2000);
    }
};

// re-export simple actions as controller functions
export const registerKey = (key) => {
    store.dispatch(dataActions.registerKey(key));
};

export const setVolume = (volume) => {
    store.dispatch(dataActions.setVolume(volume))
};

// keycode event handler
const keyDown = (event) => {
    const keylist = store.getState().data.keylist;
    const id = MAPKEY[event.code];
    if (keylist[id] === 'enabled') {
        playClip(id);
    }
}

// Startup sequence for the programme
export const initialise = () => {
    display("");
    setEnable(true);
    setBankList(BANKS);
    selectBank(0);
    setVolume(0.5);
    document.addEventListener('keydown', keyDown);
};

export default initialise;