import store, {dispatch} from '../store/store';
import { actions as ui } from '../store/ui';
import { actions as data } from '../store/data'
import { } from './timer';

// Application Constants

// utility functions


// App Functions
const incrementSessionTime = () => {console.log('todo: incrementSessionTime')};
const decrementSessionTime = () => {console.log('todo: decrementSessionTime')};
const incrementBreakTime = () => {console.log('todo: incrementBreakTime')};
const decrementBreakTime = () => {console.log('todo: decrementBreakTime')};
const resetToDefaults = () => {console.log('todo: resetToDefaults')};

// keycode event handler
// const keyDown = (event) => {
//     const keylist = store.getState().data.keylist;
//     const id = MAPKEY[event.code];
//     if (keylist[id] === 'enabled') {
//         playClip(id);
//     }
// }

// Startup sequence for the programme
export const initialise = () => {
    // dispatch(data.clearSymbols());
    // dispatch(ui.display('0'));
    // document.addEventListener('keydown', keyDown);
};

export default initialise;