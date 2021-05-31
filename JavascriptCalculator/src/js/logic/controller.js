import store from '../store/store';
import { actions as uiActions } from '../store/ui';
import { actions as dataActions } from '../store/data'
import { TOKENTYPES, calculate, createToken, appendToNumberToken } from './calculator';

// Application Constants
export const SYMBOLS = {
    // id:      used for identification and comparison
    // value:   used for calculation
    // uiText:  for 'LCD' display
    // btnText: for keypads display
    clear   : {id: '#', value: '',  uiText: '',  btnText: 'AC'},
    zero    : {id: '0', value: '0', uiText: '0', btnText: '0'},
    one     : {id: '1', value: '1', uiText: '1', btnText: '1'},
    two     : {id: '2', value: '2', uiText: '2', btnText: '2'},
    three   : {id: '3', value: '3', uiText: '3', btnText: '3'},
    four    : {id: '4', value: '4', uiText: '4', btnText: '4'},
    five    : {id: '5', value: '5', uiText: '5', btnText: '5'},
    six     : {id: '6', value: '6', uiText: '6', btnText: '6'},
    seven   : {id: '7', value: '7', uiText: '7', btnText: '7'},
    eight   : {id: '8', value: '8', uiText: '8', btnText: '8'},
    nine    : {id: '9', value: '9', uiText: '9', btnText: '9'},
    decimal : {id: '.', value: '.', uiText: '.', btnText: '.'},
    add     : {id: '+', value: '+', uiText: '+', btnText: '+'},
    subtract: {id: '-', value: '-', uiText: '-', btnText: '-'},
    multiply: {id: '*', value: '*', uiText: '*', btnText: '*'}, //todo: change value to -dot-
    divide  : {id: '/', value: '/', uiText: '/', btnText: '/'}, //todo: change value to -div-
    equals  : {id: '=', value: '=', uiText: '=', btnText: '='},
}

// utility functions
const printToken = (token) => {
    return token.symbols.map(symbol => symbol.uiText).join('');
};

const printTokens = (tokens) => {
    return tokens.map(token => printToken(token)).join(' ');
}


// App Functions
export const submitSymbol = (symbol) => {
    const initial = store.getState().data.tokens;
    const current = initial.length > 0 ? initial[initial.length-1] : null;

    switch (symbol) {
        case SYMBOLS.clear:
            store.dispatch(dataActions.clearTokens());
            break;

        case SYMBOLS.zero:
        case SYMBOLS.one:
        case SYMBOLS.two:
        case SYMBOLS.three:
        case SYMBOLS.four:
        case SYMBOLS.five:
        case SYMBOLS.six:
        case SYMBOLS.seven:
        case SYMBOLS.eight:
        case SYMBOLS.nine:
            if (current !== null && current.type !== TOKENTYPES.operator) {
                const updatedNum = appendToNumberToken(current, symbol);
                store.dispatch( dataActions.updateToken(updatedNum) );
            } else {
                const newNum = createToken(TOKENTYPES.integer, [symbol]);
                store.dispatch( dataActions.addToken(newNum) );
            }
            break;

        case SYMBOLS.decimal:
            if (current === null || current.type === TOKENTYPES.operator) {
                const zeroToken = appendToNumberToken( createToken(TOKENTYPES.integer, [SYMBOLS.zero]), symbol);
                store.dispatch( dataActions.addToken(zeroToken) );
            } else {
                const floatToken = appendToNumberToken( current, symbol);
                store.dispatch( dataActions.updateToken(floatToken) );
            }
            break;

        case SYMBOLS.subtract:
            //Special handling for negative numbers
            if (current === null || current.type == TOKENTYPES.operator) {
                const negToken = appendToNumberToken( createToken(TOKENTYPES.integer, [symbol]), SYMBOLS.zero);
                store.dispatch( dataActions.addToken(negToken) );
                break;
            }
        case SYMBOLS.add:
        case SYMBOLS.divide:
        case SYMBOLS.multiply:
            const opToken = createToken(TOKENTYPES.operator, [symbol]);
            if (current !== null && current.type === TOKENTYPES.operator) {
                store.dispatch( dataActions.updateToken(opToken) );
            } else {
                store.dispatch( dataActions.addToken(opToken) );
            }
            break;

        case SYMBOLS.equals:
            const result = calculate(initial);
            // todo: convert inputs
            store.dispatch( uiActions.formula( '???' ));
            store.dispatch( uiActions.display( result.value ) );
            return;

        default:
            console.log(`Unexpected key received by controller: ${symbol}`);
    }

    // Update the UI with changes from above
    const final = store.getState().data.tokens;
    if (final.length > 0) {
        store.dispatch( uiActions.display( printToken(final[final.length-1]) ));
        store.dispatch( uiActions.formula( printTokens(final) ));
    } else {
        store.dispatch( uiActions.display('0'));
        store.dispatch( uiActions.formula(''));
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
    store.dispatch(dataActions.clearTokens());
    store.dispatch(uiActions.display('0'));
    store.dispatch(uiActions.formula(''));
    // document.addEventListener('keydown', keyDown);
};

export default initialise;