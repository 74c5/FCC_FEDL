import { createSlice } from '@reduxjs/toolkit';

// default state
const initialState = {
    symbols: [], // array of symbols for calculator
};


const uiSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        clearSymbols : {
            reducer: (state, action) => { state.symbols = []; },
        },
        addSymbol : {
            reducer: (state, action) => { state.symbols.push(action.payload); },
            prepare: (symbol) => ({ payload: symbol }),
        },
        setSymbols : {
            reducer : (state, action) => { state.symbols = action.payload; },
            prepare : (symbols) => ({ payload: symbols }),
        },
        deleteSymbol: {
            reducer: (state, action) => { state.symbols = state.symbols.slice(0, -1) }
        },
        replaceSymbol: {
            reducer: (state, action) => { state.symbols = state.symbols.slice(0, -1).concat([action.payload]); },
            prepare: (symbol) => ({ payload: symbol }),
        }
    }
});

export const actions = uiSlice.actions;
export default uiSlice.reducer;

