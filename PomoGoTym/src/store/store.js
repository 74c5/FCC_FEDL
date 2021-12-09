import { configureStore } from '@reduxjs/toolkit'

import appReducer from './appSlice';
import settingsReducer from './settingsSlice';
import timerReducer from './timerSlice';

// Devtools, thunk middelware and reducer composer are built into configureStore
const store = configureStore(
    {   reducer : { app      : appReducer,
                    timer    : timerReducer,
                    settings : settingsReducer,
        }
    }
);

export default store;
export const dispatch = store.dispatch;