import store, {dispatch} from '../store/store';
import { actions as ui } from '../store/ui';
import { actions as data } from '../store/data'
import { SYMBOLS, SYMBOLTYPES, TYPEMAP, numberToSymbols, calculate} from './calculator';

// Application Constants
export const DISPLAYMAP = new Map();
DISPLAYMAP.set( SYMBOLS.clear     , {uiText: '',  btnText: 'AC'} );
DISPLAYMAP.set( SYMBOLS.zero      , {uiText: '0', btnText: '0'} );
DISPLAYMAP.set( SYMBOLS.one       , {uiText: '1', btnText: '1'} );
DISPLAYMAP.set( SYMBOLS.two       , {uiText: '2', btnText: '2'} );
DISPLAYMAP.set( SYMBOLS.three     , {uiText: '3', btnText: '3'} );
DISPLAYMAP.set( SYMBOLS.four      , {uiText: '4', btnText: '4'} );
DISPLAYMAP.set( SYMBOLS.five      , {uiText: '5', btnText: '5'} );
DISPLAYMAP.set( SYMBOLS.six       , {uiText: '6', btnText: '6'} );
DISPLAYMAP.set( SYMBOLS.seven     , {uiText: '7', btnText: '7'} );
DISPLAYMAP.set( SYMBOLS.eight     , {uiText: '8', btnText: '8'} );
DISPLAYMAP.set( SYMBOLS.nine      , {uiText: '9', btnText: '9'} );
DISPLAYMAP.set( SYMBOLS.decimal   , {uiText: '.', btnText: '.'} );
DISPLAYMAP.set( SYMBOLS.add       , {uiText: '+', btnText: '+'} );
DISPLAYMAP.set( SYMBOLS.subtract  , {uiText: '-', btnText: '-'} );
DISPLAYMAP.set( SYMBOLS.multiply  , {uiText: '\u00D7', btnText: '*'} );
DISPLAYMAP.set( SYMBOLS.divide    , {uiText: '\u00F7', btnText: '/'} );
DISPLAYMAP.set( SYMBOLS.equals    , {uiText: '=', btnText: '='} );
DISPLAYMAP.set( SYMBOLS.backspace , {uiText: '<', btnText: '\u2190'} );
DISPLAYMAP.set( SYMBOLS.sqrt      , {uiText: '\u221A', btnText: '\u221A'} );
DISPLAYMAP.set( SYMBOLS.open      , {uiText: '(', btnText: '('} );
DISPLAYMAP.set( SYMBOLS.close     , {uiText: ')', btnText: ')'} );

// utility functions
export const getUiText  = (symbol) => DISPLAYMAP.get(symbol).uiText || '';
export const getBtnText = (symbol) => DISPLAYMAP.get(symbol).btnText || '';

const printSymbols = (symbols) => {
    return symbols.map(sym => DISPLAYMAP.get(sym).uiText).join('');
}


// App Functions
export const submitSymbol = (symbol) => {
    const initial  = store.getState().data.symbols;
    const current  = initial[initial.length-1];
    const previous = initial[initial.length-2];

    if (TYPEMAP.has(symbol) === false) {
        dispatch( ui.display( `Unknown symbol: ${symbol}`) );
        return;
    }

    const type = TYPEMAP.get(symbol);

    if (type === SYMBOLTYPES.command) {
        switch (symbol) {
            case SYMBOLS.clear: 
                dispatch( data.clearSymbols() );
                break;

            case SYMBOLS.delete:
                dispatch( data.deleteSymbol() );
                break;
    
            case SYMBOLS.equals:
                const result = calculate(initial);
                if (typeof result === 'string') {
                    dispatch( ui.display('invalid inputs'));
                    console.error(result);
                    return;
                }
                dispatch( ui.formula( printSymbols(initial) + DISPLAYMAP.get(symbol).uiText ) );
                dispatch( ui.display( result ) );
                dispatch( data.setSymbols( numberToSymbols(result) ) );
                return;
                    
            default:
                dispatch( ui.display(`Unknown command symbol: ${symbol}`) );
                return;
        }
    } // end commands

    if (type === SYMBOLTYPES.number) {
        if (initial.length === 0) {
            dispatch( data.addSymbol( symbol ));
        
        } else if (current === SYMBOLS.zero && (initial.length === 1 || TYPEMAP.get(previous) === SYMBOLTYPES.number)) { 
            // only allow 1 lead zero
            dispatch( data.replaceSymbol(symbol) );
        } else {
            dispatch( data.addSymbol(symbol) );
        }       
    } // end numbers

    if (symbol === SYMBOLS.decimal) {
        if (initial.length === 0 || (TYPEMAP.get(current) !== SYMBOLTYPES.number && current !== SYMBOLS.decimal)) {
            dispatch( data.addSymbol( SYMBOLS.zero ));
            dispatch( data.addSymbol( symbol ));
        } else {
            // search backwards, through the latest range of number symbols, for another decimal point.
            let index = initial.length - 1;
    
            while (index > 0 && TYPEMAP.get(initial[index]) === SYMBOLTYPES.number) {
                index--;
            }
    
            if (initial[index] !== SYMBOLS.decimal) {
                dispatch( data.addSymbol(symbol));
            }
        }
    } // end decimal

    if (type === SYMBOLTYPES.operator) {
        if (symbol === SYMBOLS.subtract) { //Special handling for negative numbers
            if (    initial.length === 0 || TYPEMAP.get(current) !== SYMBOLTYPES.operator ||
                    ( initial.length > 0 && TYPEMAP.get(current) === SYMBOLTYPES.operator) ||
                    ( initial.length > 1 && TYPEMAP.get(previous) === SYMBOLTYPES.operator ) 
               ) {
                dispatch( data.addSymbol(symbol) );
            }

        } else { // other operators
            if (initial.length > 0) { // single operands not allowed

                if (initial.length > 1 && current === SYMBOLS.subtract && TYPEMAP.get(previous) === SYMBOLTYPES.operator) {
                    dispatch( data.deleteSymbol() ); // delete the subtract
                    dispatch( data.replaceSymbol(symbol) ); // replace with current symbol;
                } else if (TYPEMAP.get(current) === SYMBOLTYPES.operator) {
                    dispatch( data.replaceSymbol(symbol) ); // replace with current symbol;
                } else {
                    dispatch( data.addSymbol(symbol) );
                }

            }
        }
    } // end operators

    if (type === SYMBOLTYPES.function) {
        dispatch( data.addSymbol(symbol) );
    }

    if (type === SYMBOLTYPES.bracket) {
        if (symbol === SYMBOLS.close) {
            // only add closing bracket if there are un-closed open brackets
            const {open, close} = initial.reduce( (acc, sym) => {
                if (sym === SYMBOLS.open) acc.open++;
                else if (sym === SYMBOLS.close) acc.close++;
                return acc;
            }, {open: 0, close: 0});
        
            if (open > close) {
                dispatch( data.addSymbol(symbol) );
            }

        } else { // open
            dispatch ( data.addSymbol(symbol) );
        }
    } // end brackets
            

    // Update the UI with changes from above
    const final = store.getState().data.symbols;
    if (final.length === 0) {
        dispatch( ui.display('0'));
        dispatch( ui.formula(''));
        return;
    }

    dispatch( ui.formula(printSymbols(final)) );

    let index = final.length-1;
    const lastType = TYPEMAP.get(final[index]);
    
    if (lastType === SYMBOLTYPES.bracket || lastType === SYMBOLTYPES.function || lastType === SYMBOLTYPES.operator ) { 
        dispatch( ui.display( DISPLAYMAP.get(final[index]).uiText ) );
        return;
    }

    // else number... collect all digits including '-' if applicable
    const token = [];
    while (index >= 0) {
        const sym = final[index];
        const type = TYPEMAP.get(sym);
        if ( type === SYMBOLTYPES.number || type === SYMBOLTYPES.decimal || 
             (sym === SYMBOLS.subtract && ( index === 0 || (index >= 1 && TYPEMAP.get(final[index-1]) === SYMBOLTYPES.operator) )) ) {
            token.unshift(sym);
        } else {
            break;
        }
        index--;
    }
    dispatch( ui.display( printSymbols(token) ) );
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
    dispatch(data.clearSymbols());
    dispatch(ui.display('0'));
    dispatch(ui.formula(''));
    // document.addEventListener('keydown', keyDown);
};

export default initialise;