import { createSlice } from '@reduxjs/toolkit';

// default state
const initialState = {
    showSettings : false,
};


const appSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        toggleSettings : {
            reducer: (state) => { 
                state.showSettings = !(state.showSettings)
            },
        },
    }
});

export const actions = appSlice.actions;
export default appSlice.reducer;

