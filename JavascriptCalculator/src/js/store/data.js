import { createSlice } from '@reduxjs/toolkit';

// default state
const initialState = {
    tokens: [], // array of tokens for calculator
};


const uiSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        clearTokens : {
            reducer: (state, action) => { state.tokens = []; },
        },
        addToken : {
            reducer: (state, action) => { state.tokens.push(action.payload); },
            prepare: (token) => ({ payload: token }),
        },
        deleteToken: {
            reducer: (state, action) => { state.tokens = state.tokens.slice(0, -1) }
        },
        updateToken : {
            reducer: (state, action) => { state.tokens[state.tokens.length-1] = action.payload; },
            prepare: (token) => ({ payload: token }),
        },
    }
});

export const actions = uiSlice.actions;
export default uiSlice.reducer;

