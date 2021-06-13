
// Constants
export const SYMBOLS = {
    clear     : '#',
    zero      : '0',
    one       : '1',
    two       : '2',
    three     : '3',
    four      : '4',
    five      : '5',
    six       : '6',
    seven     : '7',
    eight     : '8',
    nine      : '9',
    decimal   : '.',
    add       : '+',
    subtract  : '-',
    multiply  : '*',
    divide    : '/',
    equals    : '=',
    delete    : '<',
    sqrt      : '¬',
    open      : '(',
    close     : ')',
}

export const SYMBOLTYPES = {
    number  : 'number',
    operator: 'operator',
    function: 'function',
    bracket : 'bracket',
    decimal : 'decimal',
    command : 'command',
}

export const TYPEMAP = new Map();
TYPEMAP.set( SYMBOLS.zero    , SYMBOLTYPES.number );
TYPEMAP.set( SYMBOLS.one     , SYMBOLTYPES.number );
TYPEMAP.set( SYMBOLS.two     , SYMBOLTYPES.number );
TYPEMAP.set( SYMBOLS.three   , SYMBOLTYPES.number );
TYPEMAP.set( SYMBOLS.four    , SYMBOLTYPES.number );
TYPEMAP.set( SYMBOLS.five    , SYMBOLTYPES.number );
TYPEMAP.set( SYMBOLS.six     , SYMBOLTYPES.number );
TYPEMAP.set( SYMBOLS.seven   , SYMBOLTYPES.number );
TYPEMAP.set( SYMBOLS.eight   , SYMBOLTYPES.number );
TYPEMAP.set( SYMBOLS.nine    , SYMBOLTYPES.number );
TYPEMAP.set( SYMBOLS.decimal , SYMBOLTYPES.decimal );
TYPEMAP.set( SYMBOLS.add     , SYMBOLTYPES.operator );
TYPEMAP.set( SYMBOLS.subtract, SYMBOLTYPES.operator );
TYPEMAP.set( SYMBOLS.multiply, SYMBOLTYPES.operator );
TYPEMAP.set( SYMBOLS.divide  , SYMBOLTYPES.operator );
TYPEMAP.set( SYMBOLS.sqrt    , SYMBOLTYPES.function );
TYPEMAP.set( SYMBOLS.open    , SYMBOLTYPES.bracket );
TYPEMAP.set( SYMBOLS.close   , SYMBOLTYPES.bracket );
TYPEMAP.set( SYMBOLS.equals  , SYMBOLTYPES.command );
TYPEMAP.set( SYMBOLS.clear   , SYMBOLTYPES.command );
TYPEMAP.set( SYMBOLS.delete  , SYMBOLTYPES.command );


const OPORDER = new Map(); //use BO(DM)(AS)
OPORDER.set(SYMBOLS.subtract,  4);
OPORDER.set(SYMBOLS.add,       4);
OPORDER.set(SYMBOLS.multiply,  1);
OPORDER.set(SYMBOLS.divide,    1);

// operation execution/evaluation functions
const OPEXEC = new Map();
OPEXEC.set(SYMBOLS.subtract,    (inputs) => {
                                    if (inputs.length === 1) {
                                        return -inputs[0];
                                    } else if (inputs.length === 2) {
                                        return inputs[0] - inputs[1];
                                    } else {
                                        return `Too many inputs for subtract node: ${inputs}`;
                                    };
});

OPEXEC.set(SYMBOLS.add, (inputs) => {
                            if (inputs.length === 2) {
                                return inputs[0] + inputs[1];
                            } else {
                                return `Incorrect number of inputs for addition node: ${inputs}`
                            }
});

OPEXEC.set(SYMBOLS.multiply,    (inputs) => {
                                    if (inputs.length === 2) {
                                        return inputs[0] * inputs[1];
                                    } else {
                                        return `Incorrect number of inputs for multiply node: ${inputs}`
                                    }
});

OPEXEC.set(SYMBOLS.divide,  (inputs) => {
                                    if (inputs.length === 2) {
                                        return inputs[0] / inputs[1];
                                    } else {
                                        return `Incorrect number of inputs for divide node: ${inputs}`
                                    }
                            });
OPEXEC.set(SYMBOLS.sqrt,    (inputs) => {
                                    if (inputs.length !== 1) return "Sqrt should only have 1 input."
                                    return Math.sqrt(inputs[0]);
});


// Utility functions for other parts of apps
export const numberToSymbols = (num) => {
    return num.toString()
              .split('')
              .map(char => {
                    let result = undefined;
                    for (const sym in SYMBOLS) {
                        if (SYMBOLS[sym] === char) {
                            result = SYMBOLS[sym];
                            break;
                        }
                    }
                    return result;
              })
              .filter(val => val !== undefined);
};

// Main functions

/**
 * Accepts string of inputs and returns a calculation tree
 * todo: implicit multiply between brackets and another operator/number
 */
export const parseInput = (symbols) => {
    let root = null;
    let current = null;
    let temp = null;

    for (const symbol of symbols) {
        const type = TYPEMAP.get(symbol);

        if (type === SYMBOLTYPES.operator) {
            temp = {value: symbol, type, parent: null, children: []};

            if (root === null) { // only really for initial "-"
                root = temp;

            } else if (symbol === SYMBOLS.subtract && current.type === SYMBOLTYPES.operator) {
                // what follows should be a negative number - insert as leaf
                current.children.push(temp);
                temp.parent = current;
            
            } else {
                // move up the tree until we find the correct insertion point - current node should be a number
                // note: operations lower in the tree are calculated first

                while (current.parent !== null && ( current.parent.type === SYMBOLTYPES.function || OPORDER.get(symbol) >= OPORDER.get(current.parent.value) )) {
                    current = current.parent;
                }

                // insert the operator node
                temp.children.push(current);
                temp.parent = current.parent;
                if (current.parent == null) { // the current node is root
                    root = temp;
                } else {
                    // insertion of temp at parent
                    const index = current.parent.children.indexOf(current);
                    current.parent.children[index] = temp;
                }
                current.parent = temp;
            }
            current = temp;
        } // end operator

        if (type === SYMBOLTYPES.function) {

            temp = { value: symbol, type, parent: null, children: []};
            // assume parent is an operator
            if (root === null) {
                root = temp;

            } else if (current.type === SYMBOLTYPES.number) { // insert function with implicit priority multiply
                temp = {type: SYMBOLTYPES.operator, value: SYMBOLS.multiply, parent: current.parent, children: [current, temp]};
                temp.children[1].parent = temp;
                if (current.parent === null) {
                    root = temp;
                } else {
                    const index = current.parent.children.indexOf(current);
                    current.parent.children[index] = temp;
                }
                current.parent = temp;
                temp = temp.children[1];  // set temp back to the function

            } else {
                temp.parent = current;
                current.children.push(temp);
            }
            current = temp;
        } // end function
        
        if (type === SYMBOLTYPES.bracket) {

            if ( symbol === SYMBOLS.open ) {
                temp = { type, value: symbol, parent: null, children:[] }
                if (root == null) {
                    root = temp;
                
                } else if (current.type === SYMBOLTYPES.number) { // insert bracket with implicit multiply
                    temp = {type: SYMBOLTYPES.operator, value: SYMBOLS.multiply, parent: current.parent, children: [current, temp]};
                    temp.children[1].parent = temp;
                    if (current.parent === null) {
                        root = temp;
                    } else {
                        const index = current.parent.children.indexOf(current);
                        current.parent.children[index] = temp;
                    }
                    current.parent = temp;
                    temp = temp.children[1];  // set temp back to the function

                } else {
                    current.children.push(temp);
                    temp.parent = current;
                }
                current = temp;

            } else { // closing bracket
                if (current.value === SYMBOLS.open) {
                    current.value = symbol; // closed

                } else {
                    while ( current.parent !== null ) {
                        current = current.parent;
                        if (current.value === SYMBOLS.open) {
                            current.value = symbol; // closed
                            break;
                        }
                    }
                }
            }
        } // end bracket

        if (type === SYMBOLTYPES.number) {
            if (root === null) { // first leaf
                temp = {value: [symbol], type: type, parent: null, children: []};
                root = temp;
                current = temp;

            } else if (current.type === SYMBOLTYPES.number) {  // add digit to number value
                current.value.push(symbol);

            } else {
                
                if (current.value === SYMBOLS.close) { // insert number with implicit priority multiply with brackets
                    temp = {type: SYMBOLTYPES.operator, value: SYMBOLS.multiply, parent: current.parent, children: [current]}
                    
                    if (current.parent === null) {
                        root = temp;
                    } else {
                        const index = current.parent.children.indexOf(current);
                        current.parent.children[index] = temp;
                    }
                    current.parent = temp;
                    current = temp;
                }

                // insert new number 
                temp = {type: SYMBOLTYPES.number, value: [symbol], parent: current, children: []};
                current.children.push(temp);
                current = temp;
            }
        } // end number

        if (type === SYMBOLTYPES.decimal) {
            if (root === null) {
                current = {type: SYMBOLTYPES.number, value: [SYMBOLS.zero, symbol], parent: null, children: []};
                root = current;

            } else if (current.type === SYMBOLTYPES.number) {
                current.value.push(symbol);

            } else {
                temp = {type: SYMBOLTYPES.number, value: [SYMBOLS.zero, symbol], parent: null, children: []};
                
                if (current.value === SYMBOLS.close) { // insert number with implicit priority multiply with brackets
                    temp = {type: SYMBOLTYPES.operator, value: SYMBOLS.multiply, parent: current.parent, children: [current, temp]}
                    temp.children[1].parent = temp;
                    if (current.parent === null) {
                        root = temp;
                    } else {
                        const index = current.parent.children.indexOf(current);
                        current.parent.children[index] = temp;
                    }
                    current.parent = temp;

                } else { // operator, function, etc
                    temp = {type: SYMBOLTYPES.number, value: [symbol], parent: current, children: []};
                    current.children.push(temp);
                }
                current = temp;
            }
        }
    }

    return root;
}

/** recursive routine to calculate value of inputs */
export const evaluateTree = (tree) => {
    if (tree.type === SYMBOLTYPES.number) {
        // this should be an end leaf node
        if (tree.children.length !== 0) {
            return `Number node (value: ${tree.value}) should be a leaf, but has children)`;
        }
        return Number(tree.value.join(''));
    }

    if (tree.type === SYMBOLTYPES.operator || tree.type === SYMBOLTYPES.function) {
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

    if ( tree.type === SYMBOLTYPES.bracket ) {
        if (tree.children.length !== 1) {
            return `Bracket Node can only have one child: ${tree.children}`;
        }

        const input = evaluateTree(tree.children[0]);

        return input;
    }

    return `Unknown node found: ${tree.type}, ${tree.value}`;
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

    return answer;
}