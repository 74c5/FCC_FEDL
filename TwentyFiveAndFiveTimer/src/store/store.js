import { configureStore } from '@reduxjs/toolkit'
import timerReducer from './timerSlice';
import settingsReducer from './settingsSlice';

// Devtools, thunk middelware and reducer composer are built into configureStore
const store = configureStore(
    {   reducer : { timer    : timerReducer,
                    settings : settingsReducer,
        }
    }
);

export default store;
export const dispatch = store.dispatch;