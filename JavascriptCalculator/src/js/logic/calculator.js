import { SYMBOLS } from './controller';

// Constants
export const TOKENTYPES = {
    integer : 'integer',
    float   : 'float',
    operator: 'operator'
}

const OPORDER = new Map();
//BODMAS
OPORDER.set(SYMBOLS.subtract,  4);
OPORDER.set(SYMBOLS.add,       3);
OPORDER.set(SYMBOLS.multiply,  2);
OPORDER.set(SYMBOLS.divide,    1);


// Utility functions for other parts of apps
export const createToken = (type, symbol) => {
    return {
        type,
        symbols: [...symbol],
    }
};

// Call only for number (integer and float) types
export const appendToNumberToken = (token, symbol) => {
    const result = {...token};
    if (symbol !== SYMBOLS.decimal) {
        if (token.symbols.length === 1 && token.symbols[0] === SYMBOLS.zero) {
            // only allow one leading zero
            result.symbols = [symbol];
        } else if (token.symbols.length === 2 && token.symbols[0] === SYMBOLS.subtract && token.symbols[1] === SYMBOLS.zero) {
            result.symbols = [SYMBOLS.subtract, symbol];
        } else {
            result.symbols = [...token.symbols, symbol];
        }

    } else if (token.type === TOKENTYPES.integer) {
        // don't use more than one decimal point
        result.symbols = [...token.symbols, symbol];
        result.type = TOKENTYPES.float;
    }
    return result;
}

/**
 * Accepts string of inputs and returns a calculation tree
 */
export const parseInput = (tokens) => {
    let root = null;
    let current = null;
    let temp = null;

    for (const token of tokens) {
        if ( token.type === TOKENTYPES.operator ) {
            temp = {value: token.symbols[0], type: token.type, parent: null, children: []};

            // move up the tree until we find the correct insertion point
            // note: operations lower in the tree are calculated first
            while ( current.parent !== null && OPORDER.get(temp.value) >= OPORDER.get(current.parent.value) ) {
                current = current.parent;
            }
// console.log('pre:', temp.value, current, current.value);
            // insert the operator node
            temp.children.push(current);
            temp.parent = current.parent;
            if (current.parent == null) { // the current node is root
                root = temp;
            } else {
                const index = current.parent.children.indexOf(current);
                current.parent.children[index] = temp;
            }
            current.parent = temp;
            current = temp;
// console.log('post:', root.value, root, current.value, current)
        
        } else {  // this is a number
            const strVal = token.symbols.map(symbol => symbol.value).join('');
            const value = Number(strVal);
            temp = {value, type: token.type, parent: null, children: []};
            if (root === null) { // first leaf
                root = temp;
            } else { // assume parent is an operator 
                temp.parent = current;
                current.children.push(temp);
            } 
            current = temp;
        }
    }

    return root;
}

/**
 * inputs: str - string of calculations to perform
 * returns: {
 *      status : 'success' | 'error'
 *      value  : number | error reason
 * }
 */
export const calculate = (str) => {
    console.log(`Performing calculation on ${str}`);
    return {status: 'error', value: 'I dunno'};
}