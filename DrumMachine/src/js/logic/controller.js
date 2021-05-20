// import {  } from "redux";
import { setVolume, setBankList, selectBank, playClip } from '../store/control';

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
        Q: {src: `${process.env.PUBLIC_URL}/media/audio/cow-C.mp3`,   desc: 'Cow C' },
        W: {src: `${process.env.PUBLIC_URL}/media/audio/cow-D.mp3`,   desc: 'Cow D' },
        E: {src: `${process.env.PUBLIC_URL}/media/audio/cow-E.mp3`,   desc: 'Cow E' },
        A: {src: `${process.env.PUBLIC_URL}/media/audio/cow-F.mp3`,   desc: 'Cow F' },
        S: {src: `${process.env.PUBLIC_URL}/media/audio/cow-G.mp3`,   desc: 'Cow G' },
        D: {src: `${process.env.PUBLIC_URL}/media/audio/cow-A.mp3`,   desc: 'Cow A' },
        Z: {src: `${process.env.PUBLIC_URL}/media/audio/cow-B.mp3`,   desc: 'Cow B' },
        X: {src: `${process.env.PUBLIC_URL}/media/audio/cow-FS.mp3`,  desc: 'Cow F#' },
        C: {src: `${process.env.PUBLIC_URL}/media/audio/cow-GSorig.mp3`,  desc: 'Cow G#' },
    }
];


// universal keycode event handler
const createKeyDown = (store) => (event) => {
    const keylist = store.getState().control.keylist;
    const id = MAPKEY[event.code];
    if (keylist[id] === 'enabled') {
        store.dispatch( playClip(id) );
    }
}

// Startup sequence for the programme
export const initialise = (store) => {
    setBankList(BANKS)(store.dispatch, store.getState);
    selectBank(0)(store.dispatch, store.getState);
    setVolume(0.5)(store.dispatch, store.getState);
    document.addEventListener('keydown', createKeyDown(store));
};

export default initialise;