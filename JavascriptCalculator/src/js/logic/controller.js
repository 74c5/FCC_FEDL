// import {  } from "redux";
import store from '../store/store';
import { actions as uiActions } from '../store/ui';
import { actions as dataActions } from '../store/data'

// Application Constants
export const TOKENS = {
    clear   : '#',
    zero    : '0',        
    one     : '1',        
    two     : '2',        
    three   : '3',        
    four    : '4',        
    five    : '5',        
    six     : '6',        
    seven   : '7',        
    eight   : '8',        
    nine    : '9',        
    decimal : '.',        
    add     : '+',        
    subtract: '-',        
    multiply: '*',        
    divide  : '/',
    equals  : '=',
}

// app actions
export const submitToken = (token) => {
    const display = store.getState().ui.display;
    const formula = store.getState().ui.formula;
    const type = store.getState().data.currentType;
    
    switch (token) {
        case TOKENS.clear:
            store.dispatch(uiActions.display(''));
            store.dispatch(uiActions.formula(''));
            store.dispatch(dataActions.setType(''));
            break;

        case TOKENS.zero:
        case TOKENS.one:
        case TOKENS.two:
        case TOKENS.three:
        case TOKENS.four:
        case TOKENS.five:
        case TOKENS.six:
        case TOKENS.seven:
        case TOKENS.eight:
        case TOKENS.nine:
            if (type === 'number') {
                if (display.length === 0 && display === '0') {
                    //only allow one leading zero and replace the zero with number if there is no decimal place
                    store.dispatch( uiActions.display(token) );
                } else {
                    store.dispatch( uiActions.display( display.concat(token) ) );
                }
            } else {
                store.dispatch( uiActions.formula( formula.concat(' ', display) ) );
                store.dispatch( uiActions.display( token ) );
                store.dispatch( dataActions.setType('number') );
            }
            break;

        case TOKENS.decimal:
            store.dispatch( uiActions.display( display.concat(token) ) );
            break;

        case TOKENS.add:
        case TOKENS.subtract:
        case TOKENS.divide:
        case TOKENS.multiply:
            store.dispatch( uiActions.formula( formula.concat(' ', display) ) );
            store.dispatch( uiActions.display( token ) );
            store.dispatch( dataActions.setType('operator') );
            break;

        case TOKENS.equals:
            store.dispatch( uiActions.formula( formula.concat(' ', display) ) );
            store.dispatch( uiActions.display( 'perform calculation dumbass' ) );
            break;
        
        default:
            console.log(`Unexpected token received by controller: ${token}`);
    }
}

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
    store.dispatch(uiActions.display('0'));
    store.dispatch(uiActions.formula(''));
    store.dispatch(dataActions.setType(''));
    // document.addEventListener('keydown', keyDown);
};

export default initialise;