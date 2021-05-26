// import {  } from "redux";
import store from '../store/store';
import { actions as uiActions } from '../store/ui';
import { actions as dataActions } from '../store/data'
import { calculate } from './calculator';

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
            store.dispatch(uiActions.display('0'));
            store.dispatch(uiActions.formula(''));
            store.dispatch(dataActions.setType('number'));
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
                if (display === TOKENS.zero) {
                    //only allow one leading zero and replace any leading zero with a number if there is no decimal place
                    store.dispatch( uiActions.display(token) );
                } else {
                    store.dispatch( uiActions.display( display.concat(token) ) );
                }
            } else if (type === 'float') {
                store.dispatch( uiActions.display( display.concat(token) ) );
            } else {
                store.dispatch( uiActions.formula( formula.concat(' ', display) ) );
                store.dispatch( uiActions.display( token ) );
                store.dispatch( dataActions.setType('number') );
            }
            break;

        case TOKENS.decimal:
            if (type === 'float') {
                return; // don't add more than one decimal point
            } else if (type === 'number') {
                store.dispatch( uiActions.display( display.concat(token) ) );
                store.dispatch( dataActions.setType('float') );
            } else {
                store.dispatch( uiActions.formula( formula.concat(' ', display) ) );
                store.dispatch( uiActions.display( token ) );
                store.dispatch( dataActions.setType('float') );
            }
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
            const input = store.getState().ui.formula;
            const result = calculate(input);
            store.dispatch( uiActions.display( result.value ) );
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
    store.dispatch(dataActions.setType('number'));
    // document.addEventListener('keydown', keyDown);
};

export default initialise;