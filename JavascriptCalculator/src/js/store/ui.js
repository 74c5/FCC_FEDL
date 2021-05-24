import { createSlice } from '@reduxjs/toolkit';

// default state
const initialState = {
    display  : "",   // current token
    formula  : "",   // formula to date
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        display: {
            reducer: (state, action) => { state.display = action.payload; },
            prepare: (text) => ({payload: text}),
        },
        formula: {
            reducer: (state, action) => { state.formula = action.payload; },
            prepare: (text) => ({payload: text}),
        },
    }
});

export const actions = uiSlice.actions;
export default uiSlice.reducer;