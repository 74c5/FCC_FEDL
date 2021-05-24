import { createSlice } from '@reduxjs/toolkit';

// default state
const initialState = {
    currentType: '',
};


const uiSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setType : {
            reducer: (state, action) => { state.currentType = action.payload; },
            prepare: (type) => ({ payload: type }),
        },
    }
});

export const actions = uiSlice.actions;
export default uiSlice.reducer;

