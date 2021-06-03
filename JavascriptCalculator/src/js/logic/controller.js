import store, {dispatch} from '../store/store';
import { actions as ui } from '../store/ui';
import { actions as data } from '../store/data'
import { SYMBOLS, TOKENTYPES, printToken, createToken, appendToNumberToken, calculate, createNumberToken } from './calculator';

// Application Constants

// utility functions
const printTokens = (tokens) => {
    return tokens.map(token => printToken(token)).join(' ');
}


// App Functions
export const submitSymbol = (symbol) => {
    const initial = store.getState().data.tokens;
    const current = initial.length > 0 ? initial[initial.length-1] : null;

    switch (symbol) {
        case SYMBOLS.clear:
            dispatch(data.clearTokens());
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
                dispatch( data.updateToken(updatedNum) );
            } else {
                const newNum = createToken(TOKENTYPES.integer, [symbol]);
                dispatch( data.addToken(newNum) );
            }
            break;

        case SYMBOLS.decimal:
            if (current === null || current.type === TOKENTYPES.operator) {
                const zeroToken = appendToNumberToken( createToken(TOKENTYPES.integer, [SYMBOLS.zero]), symbol);
                dispatch( data.addToken(zeroToken) );
            } else {
                const floatToken = appendToNumberToken( current, symbol);
                dispatch( data.updateToken(floatToken) );
            }
            break;

        case SYMBOLS.subtract:
            //Special handling for negative numbers
            if (current === null || current.type === TOKENTYPES.operator) {
                const negToken = appendToNumberToken( createToken(TOKENTYPES.integer, [symbol]), SYMBOLS.zero);
                dispatch( data.addToken(negToken) );
                break;
            }
        case SYMBOLS.add:
        case SYMBOLS.divide:
        case SYMBOLS.multiply:
            const opToken = createToken(TOKENTYPES.operator, [symbol]);
            if (current !== null && current.type === TOKENTYPES.operator) {
                dispatch( data.updateToken(opToken) );
            } else {
                dispatch( data.addToken(opToken) );
            }
            break;

        case SYMBOLS.equals:
            const result = calculate(initial);
            if (result.status === 'error') {
                dispatch( ui.display('invalid inputs'));
                return;
            }
            dispatch( ui.display( result.value ) );
            dispatch( data.clearTokens() );
            dispatch( data.addToken(createNumberToken(result.value)) );
            return;

        default:
            console.log(`Unexpected key received by controller: ${symbol}`);
    }

    // Update the UI with changes from above
    const final = store.getState().data.tokens;
    if (final.length > 0) {
        dispatch( ui.display( printToken(final[final.length-1]) ));
        dispatch( ui.formula( printTokens(final) ));
    } else {
        dispatch( ui.display('0'));
        dispatch( ui.formula(''));
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
    dispatch(data.clearTokens());
    dispatch(ui.display('0'));
    dispatch(ui.formula(''));
    // document.addEventListener('keydown', keyDown);
};

export default initialise;