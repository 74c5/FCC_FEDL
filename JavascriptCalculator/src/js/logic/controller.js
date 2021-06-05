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
    const current = initial[initial.length-1];
    const previous = initial[initial.length-2];

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
            if (initial.length > 0 && ( current.type === TOKENTYPES.integer || current.type === TOKENTYPES.float )) {
                const updatedNum = appendToNumberToken(current, symbol);
                dispatch( data.updateToken(updatedNum) );
            } else {
                const newNum = createToken(TOKENTYPES.integer, [symbol]);
                dispatch( data.addToken(newNum) );
            }
            break;

        case SYMBOLS.decimal:
            if (initial.length > 0 && current.type === TOKENTYPES.integer && current.type === TOKENTYPES.float) {
                const decimalToken = appendToNumberToken( current, symbol);
                dispatch( data.updateToken(decimalToken) );
            } else {
                const zeroToken = appendToNumberToken( createToken(TOKENTYPES.integer, [SYMBOLS.zero]), symbol);
                dispatch( data.addToken(zeroToken) );
            }
            break;

        case SYMBOLS.subtract:
            //Special handling for negative numbers
            const negToken = createToken(TOKENTYPES.operator, [symbol]);
            if (initial.length === 0 || ( initial.length > 1 && previous.type !== TOKENTYPES.operator )){
                dispatch( data.addToken(negToken) );
            }
            break;
        case SYMBOLS.add:
        case SYMBOLS.divide:
        case SYMBOLS.multiply:
            const opToken = createToken(TOKENTYPES.operator, [symbol]);
            if (initial.length > 0) {
                if (initial.length > 1 && previous.type === TOKENTYPES.operator && current.symbols[0] === SYMBOLS.subtract) {
                    // special operator followed by a negation.
                    dispatch( data.deleteToken() );
                    dispatch( data.updateToken(opToken));

                } else if (current.type === TOKENTYPES.operator) {
                    dispatch( data.updateToken(opToken) );

                } else {
                    dispatch( data.addToken(opToken) );    
                }
            } else {
                dispatch( data.addToken(opToken) );
            }
            break;

        case SYMBOLS.sqrt:
            const functionToken = createToken( TOKENTYPES.function, [symbol]);
            if (current === undefined || current.type === TOKENTYPES.operator || current.type === TOKENTYPES.function) {
                dispatch( data.addToken(functionToken) );
            
            } else { // number - assume multiplication
                const implMultToken = createToken( TOKENTYPES.operator, [SYMBOLS.multiply]);
                dispatch( data.addToken(implMultToken) );
                dispatch( data.addToken(functionToken));
            }
            break;

        case SYMBOLS.backspace:
            if (current !== undefined) {
                if (current.symbols.length === 1) {
                    dispatch( data.deleteToken() );
                } else {
                    // remove the last symbol of current token
                    const trimmed = createToken( current.type, current.symbols.slice(0, -1) );
                    if (trimmed.type === TOKENTYPES.float) {
                        // re-convert to check if still a float
                        dispatch( data.updateToken( createNumberToken( printToken(trimmed) )) );
                    } else {
                        dispatch( data.updateToken(trimmed) );
                    }
                }
            }
            break;

        case SYMBOLS.equals:
console.log(initial);
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
            console.log(`Unexpected key received by controller: ${symbol.id === undefined ? symbol : symbol.id}`);

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