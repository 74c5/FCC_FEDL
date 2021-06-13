import { SYMBOLS, SYMBOLTYPES, numberToSymbols, parseInput, calculate} from './calculator';


describe('numberToSymbols tests', () => {
    test('positive Integer', () => {
        const check = [SYMBOLS.one, SYMBOLS.two, SYMBOLS.three];

        expect(numberToSymbols(123)).toEqual(check);
    });

    test('negative Integer', () => {
        const check = [SYMBOLS.subtract, SYMBOLS.nine, SYMBOLS.eight, SYMBOLS.seven];

        expect(numberToSymbols(-987)).toEqual(check);
    });

    test('positive float', () => {
        const check = [SYMBOLS.three, SYMBOLS.decimal, SYMBOLS.one, SYMBOLS.four];

        expect(numberToSymbols(3.14)).toEqual(check);
    });

    test('negative float', () => {
        const check = [SYMBOLS.subtract, SYMBOLS.five, SYMBOLS.six, SYMBOLS.decimal, SYMBOLS.three, SYMBOLS.one];

        expect(numberToSymbols(-56.31)).toEqual(check);
    });

    test('Gibberish', () => {
        expect(numberToSymbols('@nuts.com')).toEqual([SYMBOLS.decimal]);
    });

});

describe('Parser Simple Single Number Tests', () => {
    test('Positive Integer', ()=> {
        const symbols = [SYMBOLS.three, SYMBOLS.five];
        
        const root = parseInput(symbols);
        
        const check = {value: symbols, type: SYMBOLTYPES.number, parent: null, children: []};
    
        expect(root).toEqual(check);
    });
        
    test('Negative Integer', ()=> {
        const symbols = [SYMBOLS.subtract, SYMBOLS.one, SYMBOLS.nine];
        
        const root = parseInput(symbols);

        const check = {value: SYMBOLS.subtract, type: SYMBOLTYPES.operator, parent: null, children: []};
        check.children.push( {value: [SYMBOLS.one, SYMBOLS.nine], type: SYMBOLTYPES.number, parent: check, children: []} ); 
    
        expect(root).toEqual(check);
    });

    test('Positive Float', ()=> {
        const symbols = [SYMBOLS.three, SYMBOLS.decimal, SYMBOLS.one, SYMBOLS.four];
        
        const root = parseInput(symbols);

        const check = {value: symbols, type: SYMBOLTYPES.number, parent: null, children: []};
    
        expect(root).toEqual(check);
    });

    test('Negative Float', ()=> {
        const op_1 = SYMBOLS.subtract;
        const in_1 = [SYMBOLS.zero, SYMBOLS.decimal, SYMBOLS.one, SYMBOLS.one];
        const symbols = [op_1, ...in_1];
        
        const root = parseInput(symbols);
        
        const check = {value: op_1, type: SYMBOLTYPES.operator, parent: null, children: []};
        check.children.push( {value: in_1, type: SYMBOLTYPES.number, parent: check, children: []});
    
        expect(root).toEqual(check);
    });
});

describe('Parser Single operator', () => {
    test('Basic Add', ()=> {
        const in_1 = [SYMBOLS.three];
        const op_1 = SYMBOLS.add;
        const in_2 = [SYMBOLS.four];
        const symbols = [...in_1, op_1, ...in_2];

        const root = parseInput(symbols);
        
        const check = {type: SYMBOLTYPES.operator, value: op_1, parent: null, children: []};
        check.children.push({type: SYMBOLTYPES.number, value: in_1, parent: check, children: []});
        check.children.push({type: SYMBOLTYPES.number, value: in_2, parent: check, children: []});
    
        expect(root).toEqual(check);
    });
    
    test('Basic Mulitply', ()=> {
        const in_1 = [SYMBOLS.two];
        const op_1 = SYMBOLS.multiply;
        const in_2 = [SYMBOLS.three];
        const symbols = [...in_1, op_1, ...in_2];

        const root = parseInput(symbols);
        
        const check = {type: SYMBOLTYPES.operator, value: op_1, parent: null, children: []};
        check.children.push({type: SYMBOLTYPES.number, value: in_1, parent: check, children: []});
        check.children.push({type: SYMBOLTYPES.number, value: in_2, parent: check, children: []});

        expect(root).toEqual(check);
    });
    
    test('Basic Subtract', ()=> {
        const in_1 = [SYMBOLS.four];
        const op_1 = SYMBOLS.subtract;
        const in_2 = [SYMBOLS.five];
        const symbols = [...in_1, op_1, ...in_2];

        const root = parseInput(symbols);
        
        const check = {type: SYMBOLTYPES.operator, value: op_1, parent: null, children: []};
        check.children.push({type: SYMBOLTYPES.number, value: in_1, parent: check, children: []});
        check.children.push({type: SYMBOLTYPES.number, value: in_2, parent: check, children: []});
        expect(root).toEqual(check);
    });
    
    test('Basic Divide', ()=> {
        const in_1 = [SYMBOLS.eight];
        const op_1 = SYMBOLS.divide;
        const in_2 = [SYMBOLS.nine];
        const symbols = [...in_1, op_1, ...in_2];

        const root = parseInput(symbols);
        
        const check = {type: SYMBOLTYPES.operator, value: op_1, parent: null, children: []};
        check.children.push({type: SYMBOLTYPES.number, value: in_1, parent: check, children: []});
        check.children.push({type: SYMBOLTYPES.number, value: in_2, parent: check, children: []});

        expect(root).toEqual(check);
    });
});

describe('Parser Multi Operation tests', () => {
    test('Add a negative', () => {
        const in_1 = [SYMBOLS.nine];
        const op_1 = SYMBOLS.add;
        const op_2 = SYMBOLS.subtract;
        const in_2 = [SYMBOLS.six];
        const symbols = [...in_1, op_1, op_2, ...in_2];

        const root = parseInput(symbols);
        
        const check = {type: SYMBOLTYPES.operator, value: op_1, parent: null, children: []};
        check.children.push({type: SYMBOLTYPES.number, value: in_1, parent: check, children: []});
        check.children.push({type: SYMBOLTYPES.operator, value: op_2, parent: check, children: []});
        check.children[1].children.push({type: SYMBOLTYPES.number, value: in_2, parent: check.children[1], children: []});
    
        expect(root).toEqual(check);
    });

    test('Add a negative (alt)', () => {
        const op_1 = SYMBOLS.subtract;
        const in_1 = [SYMBOLS.nine];
        const op_2 = SYMBOLS.add;
        const in_2 = [SYMBOLS.six];
        const symbols = [op_1, ...in_1, op_2, ...in_2];

        const root = parseInput(symbols);
        
        const check = {type: SYMBOLTYPES.operator, value: op_2, parent: null, children: []};
        check.children.push({type: SYMBOLTYPES.operator, value: op_1, parent: check, children: []});
        check.children.push({type: SYMBOLTYPES.number, value: in_2, parent: check, children: []});
        check.children[0].children.push({type: SYMBOLTYPES.number, value: in_1, parent: check.children[0], children: []});
    
        expect(root).toEqual(check);
    });

    test('Plus Plus', () => {
        const in_1 = [SYMBOLS.three];
        const op_1 = SYMBOLS.add;
        const in_2 = [SYMBOLS.four];
        const op_2 = SYMBOLS.add;
        const in_3 = [SYMBOLS.five];
        const symbols = [...in_1, op_1, ...in_2, op_2, ...in_3];
        
        const root = parseInput(symbols);
        
        const check = {type: SYMBOLTYPES.operator, value: op_1, parent: null, children: []};
        check.children.push({type: SYMBOLTYPES.operator, value: op_2, parent: check, children: []});
        check.children.push({type: SYMBOLTYPES.number, value: in_3, parent: check, children: []});
        check.children[0].children.push({type: SYMBOLTYPES.number, value: in_1, parent: check.children[0], children: []});
        check.children[0].children.push({type: SYMBOLTYPES.number, value: in_2, parent: check.children[0], children: []});

        expect(root).toEqual(check);
    });

    test('Minus Minus', () => {
        const in_1 = [SYMBOLS.five];
        const op_1 = SYMBOLS.subtract;
        const in_2 = [SYMBOLS.four];
        const op_2 = SYMBOLS.subtract;
        const in_3 = [SYMBOLS.three];
        const symbols = [...in_1, op_1, ...in_2, op_2, ...in_3];

        const root = parseInput(symbols);
        
        const check = {type: SYMBOLTYPES.operator, value: op_2, parent: null, children: []};
        check.children.push({type: SYMBOLTYPES.operator, value: op_1, parent: check, children: []});
        check.children.push({type: SYMBOLTYPES.number, value: in_3, parent: check, children: []});
        check.children[0].children.push({type: SYMBOLTYPES.number, value: in_1, parent: check.children[0], children: []});
        check.children[0].children.push({type: SYMBOLTYPES.number, value: in_2, parent: check.children[0], children: []});
    
        expect(root).toEqual(check);
    });

    test('Mult Mult', () => {
        const in_1 = [SYMBOLS.seven];
        const op_1 = SYMBOLS.multiply;
        const in_2 = [SYMBOLS.eight];
        const op_2 = SYMBOLS.multiply;
        const in_3 = [SYMBOLS.nine];
        const symbols = [...in_1, op_1, ...in_2, op_2, ...in_3];
        
        const root = parseInput(symbols);
        
        const check = {type: SYMBOLTYPES.operator, value: op_2, parent: null, children: []};
        check.children.push({type: SYMBOLTYPES.operator, value: op_1, parent: check, children: []});
        check.children.push({type: SYMBOLTYPES.number, value: in_3, parent: check, children: []});
        check.children[0].children.push({type: SYMBOLTYPES.number, value: in_1, parent: check.children[0], children: []});
        check.children[0].children.push({type: SYMBOLTYPES.number, value: in_2, parent: check.children[0], children: []});
    
        expect(root).toEqual(check);
    });

    test('Add Mult', () => {
        const in_1 = [SYMBOLS.one];
        const op_1 = SYMBOLS.add;
        const in_2 = [SYMBOLS.seven];
        const op_2 = SYMBOLS.multiply;
        const in_3 = [SYMBOLS.four];
        const symbols = [...in_1, op_1, ...in_2, op_2, ...in_3];
        
        const root = parseInput(symbols);
        
        const check = {type: SYMBOLTYPES.operator, value: op_1, parent: null, children: []};
        check.children.push({type: SYMBOLTYPES.number, value: in_1, parent: check, children: []});
        check.children.push({type: SYMBOLTYPES.operator, value: op_2, parent: check, children: []});
        check.children[1].children.push({type: SYMBOLTYPES.number, value: in_2, parent: check.children[1], children: []});
        check.children[1].children.push({type: SYMBOLTYPES.number, value: in_3, parent: check.children[1], children: []});

        expect(root).toEqual(check);
    });
    
    test('Mult Add', () => {
        const in_1 = [SYMBOLS.one];
        const op_1 = SYMBOLS.multiply;
        const in_2 = [SYMBOLS.seven];
        const op_2 = SYMBOLS.add;
        const in_3 = [SYMBOLS.four];
        const symbols = [...in_1, op_1, ...in_2, op_2, ...in_3];
        
        const root = parseInput(symbols);
        
        const check = {type: SYMBOLTYPES.operator, value: op_2, parent: null, children: []};
        check.children.push({type: SYMBOLTYPES.operator, value: op_1, parent: check, children: []});
        check.children.push({type: SYMBOLTYPES.number, value: in_3, parent: check, children: []});
        check.children[0].children.push({type: SYMBOLTYPES.number, value: in_1, parent: check.children[0], children: []});
        check.children[0].children.push({type: SYMBOLTYPES.number, value: in_2, parent: check.children[0], children: []});
        
        expect(root).toEqual(check);
    });

    test('Sub Add', () => {
        const in_1 = [SYMBOLS.four];
        const op_1 = SYMBOLS.subtract;
        const in_2 = [SYMBOLS.nine];
        const op_2 = SYMBOLS.add;
        const in_3 = [SYMBOLS.five];
        const symbols = [...in_1, op_1, ...in_2, op_2, ...in_3];
        
        const root = parseInput(symbols);
        
        const check = {type: SYMBOLTYPES.operator, value: op_2, parent: null, children: []};
        check.children.push({type: SYMBOLTYPES.operator, value: op_1, parent: check, children: []});
        check.children.push({type: SYMBOLTYPES.number, value: in_3, parent: check, children: []});
        check.children[0].children.push({type: SYMBOLTYPES.number, value: in_1, parent: check.children[0], children: []});
        check.children[0].children.push({type: SYMBOLTYPES.number, value: in_2, parent: check.children[0], children: []});

        expect(root).toEqual(check);
    });
});


describe('Parse Functions', () => {
    test('sqrt 9', () => {
        const fn_1 = SYMBOLS.sqrt;
        const in_1 = [SYMBOLS.nine];
        const symbols = [fn_1, ...in_1];

        const check = {type: SYMBOLTYPES.function, value: fn_1, parent: null, children: []};
        check.children.push( {type: SYMBOLTYPES.number, value: in_1, parent: check, children: []} );

        const root = parseInput(symbols);

        expect(root).toEqual(check);
    });

    test('3 - sqrt 4', () => {
        const in_1 = [SYMBOLS.three];
        const op_1 = SYMBOLS.subtract;
        const fn_1 = SYMBOLS.sqrt;
        const in_2 = [SYMBOLS.four];
        const symbols = [...in_1, op_1, fn_1, ...in_2];
        
        const check = {type: SYMBOLTYPES.operator, value: op_1, parent: null, children: []};
        check.children.push( {type: SYMBOLTYPES.number, value: in_1, parent: check, children: []} );
        check.children.push( {type: SYMBOLTYPES.function, value: fn_1, parent: check, children: []} );
        check.children[1].children.push( {type: SYMBOLTYPES.number, value: in_2, parent: check.children[1], children: []} );
        
        const root = parseInput(symbols);
        expect(root).toEqual(check);
    });

    test('sqrt sqrt 81 + 2', () => {
        const fn_1 = SYMBOLS.sqrt;
        const fn_2 = SYMBOLS.sqrt;
        const in_1 = [SYMBOLS.eight, SYMBOLS.one];
        const op_1 = SYMBOLS.add;
        const in_2 = [SYMBOLS.two]
        const symbols = [fn_1, fn_2, ...in_1, op_1, ...in_2];
        
        const check = {type: SYMBOLTYPES.operator, value: op_1, parent: null, children: []};
        check.children.push( {type: SYMBOLTYPES.function, value: fn_1, parent: check, children: []} );
        check.children.push( {type: SYMBOLTYPES.number, value: in_2, parent: check, children: []} );
        check.children[0].children.push( {type: SYMBOLTYPES.function, value: fn_2, parent: check.children[0], children: []} );
        check.children[0].children[0].children.push( {type: SYMBOLTYPES.number, value: in_1, parent: check.children[0].children[0], children: []} );
        
        const root = parseInput(symbols);
        
        expect(root).toEqual(check);
    });
    
    test('2 sqrt 81', () => {
        const in_1 = [SYMBOLS.two];
        const fn_1 = SYMBOLS.sqrt;
        const in_2 = [SYMBOLS.eight, SYMBOLS.one];
        const symbols = [...in_1, fn_1, ...in_2];
        
        const check = {type: SYMBOLTYPES.operator, value: SYMBOLS.multiply, parent: null, children: []};
        check.children.push( {type: SYMBOLTYPES.number, value: in_1, parent: check, children: []} );
        check.children.push( {type: SYMBOLTYPES.function, value: fn_1, parent: check, children: []} );
        check.children[1].children.push( {type: SYMBOLTYPES.number, value: in_2, parent: check.children[1], children: []} );

        const root = parseInput(symbols);

        expect(root).toEqual(check);
    });
});

describe('Parse Brackets', () => {
    test('2*(4+5)', () => {
        const in_1 = [SYMBOLS.two];
        const op_1 = SYMBOLS.multiply;
        const br_1 = SYMBOLS.open;
        const in_2 = [SYMBOLS.four];
        const op_2 = SYMBOLS.add;
        const in_3 = [SYMBOLS.five];
        const br_2 = SYMBOLS.close;
        const symbols = [...in_1, op_1, br_1, ...in_2, op_2, ...in_3, br_2];

        const check = {type: SYMBOLTYPES.operator, value: op_1, parent: null, children: []};
        check.children.push({type: SYMBOLTYPES.number, value: in_1, parent: check, children: []});
        check.children.push({type: SYMBOLTYPES.bracket, value: br_2, parent: check, children: []});
        const child_1 = check.children[1];
        child_1.children.push({type: SYMBOLTYPES.operator, value: op_2, parent: child_1, children: []});
        const child_1_0 = check.children[1].children[0];
        child_1_0.children.push({type: SYMBOLTYPES.number, value: in_2, parent: child_1_0, children: []});
        child_1_0.children.push({type: SYMBOLTYPES.number, value: in_3, parent: child_1_0, children: []});

        const root = parseInput(symbols);

        expect(root).toEqual(check);
    })

    test('(2+5)*3', () => {
        const br_1 = SYMBOLS.open;
        const in_1 = [SYMBOLS.two];
        const op_1 = SYMBOLS.add;
        const in_2 = [SYMBOLS.five];
        const br_2 = SYMBOLS.close;
        const op_2 = SYMBOLS.multiply;
        const in_3 = [SYMBOLS.three];
        const symbols = [br_1, ...in_1, op_1, ...in_2, br_2, op_2, ...in_3];

        const check = {type: SYMBOLTYPES.operator, value: op_2, parent: null, children: []};
        check.children.push({type: SYMBOLTYPES.bracket, value: br_2, parent: check, children: []});
        check.children.push({type: SYMBOLTYPES.number, value: in_3, parent: check, children: []});
        const child_0 = check.children[0];
        child_0.children.push({type: SYMBOLTYPES.operator, value: op_1, parent: child_0, children: []});
        const child_0_0 = check.children[0].children[0];
        child_0_0.children.push({type: SYMBOLTYPES.number, value: in_1, parent: child_0_0, children: []});
        child_0_0.children.push({type: SYMBOLTYPES.number, value: in_2, parent: child_0_0, children: []});

        const root = parseInput(symbols);

        expect(root).toEqual(check);
    })

    test('2(4+5)', () => {
        const in_1 = [SYMBOLS.two];
        const br_1 = SYMBOLS.open;
        const in_2 = [SYMBOLS.four];
        const op_2 = SYMBOLS.add;
        const in_3 = [SYMBOLS.five];
        const br_2 = SYMBOLS.close;
        const symbols = [...in_1, br_1, ...in_2, op_2, ...in_3, br_2];

        const check = {type: SYMBOLTYPES.operator, value: SYMBOLS.multiply, parent: null, children: []};
        check.children.push({type: SYMBOLTYPES.number, value: in_1, parent: check, children: []});
        check.children.push({type: SYMBOLTYPES.bracket, value: br_2, parent: check, children: []});
        const child_1 = check.children[1];
        child_1.children.push({type: SYMBOLTYPES.operator, value: op_2, parent: child_1, children: []});
        const child_1_0 = check.children[1].children[0];
        child_1_0.children.push({type: SYMBOLTYPES.number, value: in_2, parent: child_1_0, children: []});
        child_1_0.children.push({type: SYMBOLTYPES.number, value: in_3, parent: child_1_0, children: []});

        const root = parseInput(symbols);

        expect(root).toEqual(check);
    })

    test('(2+5)3', () => {
        const br_1 = SYMBOLS.open;
        const in_1 = [SYMBOLS.two];
        const op_1 = SYMBOLS.add;
        const in_2 = [SYMBOLS.five];
        const br_2 = SYMBOLS.close;
        const in_3 = [SYMBOLS.three];
        const symbols = [br_1, ...in_1, op_1, ...in_2, br_2, ...in_3];

        const check = {type: SYMBOLTYPES.operator, value: SYMBOLS.multiply, parent: null, children: []};
        check.children.push({type: SYMBOLTYPES.bracket, value: br_2, parent: check, children: []});
        check.children.push({type: SYMBOLTYPES.number, value: in_3, parent: check, children: []});
        const child_0 = check.children[0];
        child_0.children.push({type: SYMBOLTYPES.operator, value: op_1, parent: child_0, children: []});
        const child_0_0 = check.children[0].children[0];
        child_0_0.children.push({type: SYMBOLTYPES.number, value: in_1, parent: child_0_0, children: []});
        child_0_0.children.push({type: SYMBOLTYPES.number, value: in_2, parent: child_0_0, children: []});

        const root = parseInput(symbols);
        expect(root).toEqual(check);
    })
});



describe('Calculate Simple Single Number Tests', () => {
    test('Positive Integer', ()=> {
        const symbols = [SYMBOLS.three, SYMBOLS.five];
        
        const answer = calculate(symbols);

        expect(answer).toEqual(35);
    });
        
    test('Negative Integer', ()=> {
        const symbols = [SYMBOLS.subtract, SYMBOLS.one, SYMBOLS.nine];
        
        const answer = calculate(symbols);
    
        expect(answer).toEqual(-19);
    });

    test('Positive Float', ()=> {
        const symbols = [SYMBOLS.three, SYMBOLS.decimal, SYMBOLS.one, SYMBOLS.four];
        
        const answer = calculate(symbols);
    
        expect(answer).toEqual(3.14);
    });

    test('Negative Float', ()=> {
        const symbols = [SYMBOLS.subtract, SYMBOLS.zero, SYMBOLS.decimal, SYMBOLS.one, SYMBOLS.one];
        
        const answer = calculate(symbols);
    
        expect(answer).toEqual(-0.11);
    });
});

describe('Calculate Single operator', () => {
    test('Basic Add', ()=> {
        const in_1 = [SYMBOLS.three];
        const op_1 = SYMBOLS.add;
        const in_2 = [SYMBOLS.four];
        const symbols = [...in_1, op_1, ...in_2];

        const answer = calculate(symbols);
    
        expect(answer).toEqual(7);
    });
    
    test('Basic Mulitply', ()=> {
        const in_1 = [SYMBOLS.two];
        const op_1 = SYMBOLS.multiply;
        const in_2 = [SYMBOLS.three];
        const symbols = [...in_1, op_1, ...in_2];

        const answer = calculate(symbols);
    
        expect(answer).toEqual(6);
    });
    
    test('Basic Subtract', ()=> {
        const in_1 = [SYMBOLS.four];
        const op_1 = SYMBOLS.subtract;
        const in_2 = [SYMBOLS.five];
        const symbols = [...in_1, op_1, ...in_2];

        const answer = calculate(symbols);
    
        expect(answer).toEqual(-1);
    });
    
    test('Basic Divide', ()=> {
        const in_1 = [SYMBOLS.five];
        const op_1 = SYMBOLS.divide;
        const in_2 = [SYMBOLS.eight];
        const symbols = [...in_1, op_1, ...in_2];

        const answer = calculate(symbols);
    
        expect(answer).toEqual(0.625);
    });
});


describe('Calculate Functions', () => {
    test('sqrt 9', () => {
        const fn_1 = SYMBOLS.sqrt;
        const in_1 = [SYMBOLS.nine];
        const symbols = [fn_1, ...in_1];

        const answer = calculate(symbols);
    
        expect(answer).toEqual(3);
    });

    test('3 - sqrt 4', () => {
        const in_1 = [SYMBOLS.three];
        const op_1 = SYMBOLS.subtract;
        const fn_1 = SYMBOLS.sqrt;
        const in_2 = [SYMBOLS.four];
        const symbols = [...in_1, op_1, fn_1, ...in_2];

        const answer = calculate(symbols);
    
        expect(answer).toEqual(1);
    });

    test('sqrt sqrt 81 + 2', () => {
        const fn_1 = SYMBOLS.sqrt;
        const fn_2 = SYMBOLS.sqrt;
        const in_1 = [SYMBOLS.eight, SYMBOLS.one];
        const op_1 = SYMBOLS.add;
        const in_2 = [SYMBOLS.two]
        const symbols = [fn_1, fn_2, ...in_1, op_1, ...in_2];

        const answer = calculate(symbols);
    
        expect(answer).toEqual(5);
    });

    test('2 sqrt 81', () => {
        const in_1 = [SYMBOLS.two];
        const fn_1 = SYMBOLS.sqrt;
        const in_2 = [SYMBOLS.eight, SYMBOLS.one];
        const symbols = [...in_1, fn_1, ...in_2];

        const answer = calculate(symbols);
    
        expect(answer).toEqual(18);
    });
});


describe('Calculate Multi Operations', () => {
    test('Add a negative', () => {
        const in_1 = [SYMBOLS.nine];
        const op_1 = SYMBOLS.add;
        const op_2 = SYMBOLS.subtract;
        const in_2 = [SYMBOLS.six];
        const symbols = [...in_1, op_1, op_2, ...in_2];

        const answer = calculate(symbols);
    
        expect(answer).toEqual(3);
    });

    test('Add a negative (alt)', () => {
        const op_1 = SYMBOLS.subtract;
        const in_1 = [SYMBOLS.nine];
        const op_2 = SYMBOLS.add;
        const in_2 = [SYMBOLS.six];
        const symbols = [op_1, ...in_1, op_2, ...in_2];
   
        const answer = calculate(symbols);
    
        expect(answer).toEqual(-3);
    });


    test('Plus Plus', () => {
        const in_1 = [SYMBOLS.three];
        const op_1 = SYMBOLS.add;
        const in_2 = [SYMBOLS.four];
        const op_2 = SYMBOLS.add;
        const in_3 = [SYMBOLS.five];
        const symbols = [...in_1, op_1, ...in_2, op_2, ...in_3];
        
        const answer = calculate(symbols);
    
        expect(answer).toEqual(12);
    });

    test('Minus Minus', () => {
        const in_1 = [SYMBOLS.five];
        const op_1 = SYMBOLS.subtract;
        const in_2 = [SYMBOLS.four];
        const op_2 = SYMBOLS.subtract;
        const in_3 = [SYMBOLS.three];
        const symbols = [...in_1, op_1, ...in_2, op_2, ...in_3];
        
        const answer = calculate(symbols);
    
        expect(answer).toEqual(-2);
    });

    test('Mult Mult', () => {
        const in_1 = [SYMBOLS.seven];
        const op_1 = SYMBOLS.multiply;
        const in_2 = [SYMBOLS.eight];
        const op_2 = SYMBOLS.multiply;
        const in_3 = [SYMBOLS.nine];
        const symbols = [...in_1, op_1, ...in_2, op_2, ...in_3];
        
        const answer = calculate(symbols);
    
        expect(answer).toEqual(504);
    });

    test('Add Mult', () => {
        const in_1 = [SYMBOLS.one];
        const op_1 = SYMBOLS.add;
        const in_2 = [SYMBOLS.seven];
        const op_2 = SYMBOLS.multiply;
        const in_3 = [SYMBOLS.four];
        const symbols = [...in_1, op_1, ...in_2, op_2, ...in_3];
        
        const answer = calculate(symbols);
    
        expect(answer).toEqual(29);
    });
    
    test('Mult Add', () => {
        const in_1 = [SYMBOLS.one];
        const op_1 = SYMBOLS.multiply;
        const in_2 = [SYMBOLS.seven];
        const op_2 = SYMBOLS.add;
        const in_3 = [SYMBOLS.four];
        const symbols = [...in_1, op_1, ...in_2, op_2, ...in_3];
        
        const answer = calculate(symbols);
    
        expect(answer).toEqual(11);
    });

    test('Sub Add', () => {
        const in_1 = [SYMBOLS.four];
        const op_1 = SYMBOLS.subtract;
        const in_2 = [SYMBOLS.nine];
        const op_2 = SYMBOLS.add;
        const in_3 = [SYMBOLS.five];
        const symbols = [...in_1, op_1, ...in_2, op_2, ...in_3];
        
        const answer = calculate(symbols);
    
        expect(answer).toEqual(0);
    });

});