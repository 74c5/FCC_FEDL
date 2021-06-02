
// Constants
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

const OPEXEC = new Map();
OPEXEC.set(SYMBOLS.subtract,  (inputs) => inputs.reduce((acc, val) => acc-val));
OPEXEC.set(SYMBOLS.add,       (inputs) => inputs.reduce((acc, val) => acc+val));
OPEXEC.set(SYMBOLS.multiply,  (inputs) => inputs.reduce((acc, val) => acc*val));
OPEXEC.set(SYMBOLS.divide,    (inputs) => inputs.reduce((acc, val) => acc/val));



// Utility functions for other parts of apps
export const printToken = (token) => {
    return token.symbols.map(symbol => symbol.uiText).join('');
};

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

/** recursive routine to calculate value of inputs */
export const evaluateTree = (tree) => {
    if (tree.type === TOKENTYPES.float || tree.type === TOKENTYPES.integer) {
        // this should be an end leaf node
        if (tree.children.length !== 0) {
            return `Number node (value: ${tree.value}) should be a leaf, but has children)`;
        }
        return tree.value;
    }

    if (tree.type === TOKENTYPES.operator) {
        if (tree.children.length < 2) {
            return `Not enough operands for operator: ${tree.value.uiText} ${tree.children.map(child => child.value)}`;
        }
        
        const inputs = tree.children.map(child => evaluateTree(child));
        const errors = inputs.reduce( (acc,val) => {
            if (typeof val === 'string') {
                if (acc.length > 0) acc += ' ' + val;
                else acc += val;
            }
            return acc;
        }, '');
        
        if (errors !== '') return errors;

        return OPEXEC.get(tree.value)(inputs);
    }

    return `Unknown node found: ${tree.type}, {$tree.value}`;
}


/**
 * inputs: tokens - array of calculator tokens
 * returns: {
 *      status : 'success' | 'error'
 *      value  : number | error reason
 * }
 */
export const calculate = (tokens) => {
    const tree = parseInput(tokens);
    const answer = evaluateTree(tree);

    if (typeof answer === 'string') {
        console.error(answer);
        return {status: 'error', value: answer};
    }

    return {status: 'success', value: answer};
}