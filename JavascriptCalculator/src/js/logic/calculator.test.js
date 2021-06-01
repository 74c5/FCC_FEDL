import { TOKENTYPES, parseInput, calculate} from './calculator';
import { SYMBOLS } from './controller';

describe('Parser Simple Single Number Tests', () => {
    test('Positive Integer', ()=> {
        const tokens = [{type: TOKENTYPES.integer, symbols: [SYMBOLS.three, SYMBOLS.five]}];
        
        const root = parseInput(tokens);
        
        const check = {value: 35, type: TOKENTYPES.integer, parent: null, children: []};
    
        expect(root).toEqual(check);
    });
        
    test('Negative Integer', ()=> {
        const tokens = [{type: TOKENTYPES.integer, symbols: [SYMBOLS.subtract, SYMBOLS.one, SYMBOLS.nine]}];
        
        const root = parseInput(tokens);
        
        const check = {value: -19, type: TOKENTYPES.integer, parent: null, children: []};
    
        expect(root).toEqual(check);
    });

    test('Positive Float', ()=> {
        const tokens = [{type: TOKENTYPES.float, symbols: [SYMBOLS.three, SYMBOLS.decimal, SYMBOLS.one, SYMBOLS.four]}];
        
        const root = parseInput(tokens);
        
        const check = {value: 3.14, type: TOKENTYPES.float, parent: null, children: []};
    
        expect(root).toEqual(check);
    });

    test('Negative Float', ()=> {
        const tokens = [{type: TOKENTYPES.float, symbols: [SYMBOLS.subtract, SYMBOLS.zero, SYMBOLS.decimal, SYMBOLS.one, SYMBOLS.one]}];
        
        const root = parseInput(tokens);
        
        const check = {value: -0.11, type: TOKENTYPES.float, parent: null, children: []};
    
        expect(root).toEqual(check);
    });
});

describe('Parser Single operator calculations', () => {
    test('Basic Add', ()=> {
        const tokens = [
            {type: TOKENTYPES.integer,  symbols: [SYMBOLS.three]},
            {type: TOKENTYPES.operator, symbols: [SYMBOLS.add]},
            {type: TOKENTYPES.integer,  symbols: [SYMBOLS.four]},
        ];
        
        const root = parseInput(tokens);
        
        const check = {type: TOKENTYPES.operator, value: SYMBOLS.add, parent: null, children: []};
        check.children.push({type: TOKENTYPES.integer, value: 3, parent: check, children: []});
        check.children.push({type: TOKENTYPES.integer, value: 4, parent: check, children: []});
    
        expect(root).toEqual(check);
    });
    
    test('Basic Mulitply', ()=> {
        const tokens = [
            {type: TOKENTYPES.integer,  symbols: [SYMBOLS.two]},
            {type: TOKENTYPES.operator, symbols: [SYMBOLS.multiply]},
            {type: TOKENTYPES.integer,  symbols: [SYMBOLS.three]},
        ];

        const root = parseInput(tokens);
        
        const check = {type: TOKENTYPES.operator, value: SYMBOLS.multiply, parent: null, children: []};
        check.children.push({type: TOKENTYPES.integer, value: 2, parent: check, children: []});
        check.children.push({type: TOKENTYPES.integer, value: 3, parent: check, children: []});

        expect(root).toEqual(check);
    });
    
    test('Basic Subtract', ()=> {
        const tokens = [
            {type: TOKENTYPES.integer,  symbols: [SYMBOLS.four]},
            {type: TOKENTYPES.operator, symbols: [SYMBOLS.subtract]},
            {type: TOKENTYPES.integer,  symbols: [SYMBOLS.five]},
        ];

        const root = parseInput(tokens);
        
        const check = {type: TOKENTYPES.operator, value: SYMBOLS.subtract, parent: null, children: []};
        check.children.push({type: TOKENTYPES.integer, value: 4, parent: check, children: []});
        check.children.push({type: TOKENTYPES.integer, value: 5, parent: check, children: []});

        expect(root).toEqual(check);
    });
    
    test('Basic Divide', ()=> {
        const tokens = [
            {type: TOKENTYPES.integer,  symbols: [SYMBOLS.five]},
            {type: TOKENTYPES.operator, symbols: [SYMBOLS.divide]},
            {type: TOKENTYPES.integer,  symbols: [SYMBOLS.eight]},
        ];

        const root = parseInput(tokens);
        
        const check = {type: TOKENTYPES.operator, value: SYMBOLS.divide, parent: null, children: []};
        check.children.push({type: TOKENTYPES.integer, value: 5, parent: check, children: []});
        check.children.push({type: TOKENTYPES.integer, value: 8, parent: check, children: []});

        expect(root).toEqual(check);
    });
});

describe('Parser Multi Operation tests', () => {
    test('Plus Plus', () => {
        const tokens = [
            {type: TOKENTYPES.integer,  symbols: [SYMBOLS.three]},
            {type: TOKENTYPES.operator, symbols: [SYMBOLS.add]},
            {type: TOKENTYPES.integer,  symbols: [SYMBOLS.four]},
            {type: TOKENTYPES.operator, symbols: [SYMBOLS.add]},
            {type: TOKENTYPES.integer,  symbols: [SYMBOLS.five]},
        ];
        
        const root = parseInput(tokens);
        
        const check = {type: TOKENTYPES.operator, value: SYMBOLS.add, parent: null, children: []};
        check.children.push({type: TOKENTYPES.operator, value: SYMBOLS.add, parent: check, children: []});
        check.children.push({type: TOKENTYPES.integer, value: 5, parent: check, children: []});
        check.children[0].children.push({type: TOKENTYPES.integer, value: 3, parent: check.children[0], children: []});
        check.children[0].children.push({type: TOKENTYPES.integer, value: 4, parent: check.children[0], children: []});

        expect(root).toEqual(check);
    });

    test('Minus Minus', () => {
        const tokens = [
            {type: TOKENTYPES.integer,  symbols: [SYMBOLS.five]},
            {type: TOKENTYPES.operator, symbols: [SYMBOLS.subtract]},
            {type: TOKENTYPES.integer,  symbols: [SYMBOLS.four]},
            {type: TOKENTYPES.operator, symbols: [SYMBOLS.subtract]},
            {type: TOKENTYPES.integer,  symbols: [SYMBOLS.three]},
        ];
        
        const root = parseInput(tokens);
        
        const check = {type: TOKENTYPES.operator, value: SYMBOLS.subtract, parent: null, children: []};
        check.children.push({type: TOKENTYPES.operator, value: SYMBOLS.subtract, parent: check, children: []});
        check.children.push({type: TOKENTYPES.integer, value: 3, parent: check, children: []});
        check.children[0].children.push({type: TOKENTYPES.integer, value: 5, parent: check.children[0], children: []});
        check.children[0].children.push({type: TOKENTYPES.integer, value: 4, parent: check.children[0], children: []});
    
        expect(root).toEqual(check);
    });

    test('Mult Mult', () => {
        const tokens = [
            {type: TOKENTYPES.integer,  symbols: [SYMBOLS.seven]},
            {type: TOKENTYPES.operator, symbols: [SYMBOLS.multiply]},
            {type: TOKENTYPES.integer,  symbols: [SYMBOLS.eight]},
            {type: TOKENTYPES.operator, symbols: [SYMBOLS.multiply]},
            {type: TOKENTYPES.integer,  symbols: [SYMBOLS.nine]},
        ];
        
        const root = parseInput(tokens);
        
        const check = {type: TOKENTYPES.operator, value: SYMBOLS.multiply, parent: null, children: []};
        check.children.push({type: TOKENTYPES.operator, value: SYMBOLS.multiply, parent: check, children: []});
        check.children.push({type: TOKENTYPES.integer, value: 9, parent: check, children: []});
        check.children[0].children.push({type: TOKENTYPES.integer, value: 7, parent: check.children[0], children: []});
        check.children[0].children.push({type: TOKENTYPES.integer, value: 8, parent: check.children[0], children: []});
    
        expect(root).toEqual(check);
    });

    test('Add Mult', () => {
        const tokens = [
            {type: TOKENTYPES.integer,  symbols: [SYMBOLS.one]},
            {type: TOKENTYPES.operator, symbols: [SYMBOLS.add]},
            {type: TOKENTYPES.integer,  symbols: [SYMBOLS.seven]},
            {type: TOKENTYPES.operator, symbols: [SYMBOLS.multiply]},
            {type: TOKENTYPES.integer,  symbols: [SYMBOLS.four]},
        ];
        
        const root = parseInput(tokens);
        
        const check = {type: TOKENTYPES.operator, value: SYMBOLS.add, parent: null, children: []};
        check.children.push({type: TOKENTYPES.integer, value: 1, parent: check, children: []});
        check.children.push({type: TOKENTYPES.operator, value: SYMBOLS.multiply, parent: check, children: []});
        check.children[1].children.push({type: TOKENTYPES.integer, value: 7, parent: check.children[1], children: []});
        check.children[1].children.push({type: TOKENTYPES.integer, value: 4, parent: check.children[1], children: []});

        expect(root).toEqual(check);
    });
    
    test('Mult Add', () => {
        const tokens = [
            {type: TOKENTYPES.integer,  symbols: [SYMBOLS.one]},
            {type: TOKENTYPES.operator, symbols: [SYMBOLS.multiply]},
            {type: TOKENTYPES.integer,  symbols: [SYMBOLS.seven]},
            {type: TOKENTYPES.operator, symbols: [SYMBOLS.add]},
            {type: TOKENTYPES.integer,  symbols: [SYMBOLS.four]},
        ];
        
        const root = parseInput(tokens);
        
        const check = {type: TOKENTYPES.operator, value: SYMBOLS.add, parent: null, children: []};
        check.children.push({type: TOKENTYPES.operator, value: SYMBOLS.multiply, parent: check, children: []});
        check.children.push({type: TOKENTYPES.integer, value: 4, parent: check, children: []});
        check.children[0].children.push({type: TOKENTYPES.integer, value: 1, parent: check.children[0], children: []});
        check.children[0].children.push({type: TOKENTYPES.integer, value: 7, parent: check.children[0], children: []});
// console.dir(root)
// console.dir(root.children[1])
// console.dir(check)        
        
        expect(root).toEqual(check);
    });
});