import TOKENS from './controller';

/**
 * Accepts string of inputs and returns a calculation tree
 */
const parseInputString = (str) => {
    const tokens = str.split(' ');
    const tree = null;
    const current = null;

    for (const token of tokens) {
        switch (token) {
            case TOKENS.add:
            case TOKENS.subtract:
            case TOKENS.divide:
            case TOKENS.multiply:
                break;
            default:
                //this is a number
                break;
        }
    }

    return tree;
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