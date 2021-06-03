import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './ui';
import dataReducer from './data';

// Devtools, thunk middelware and reducer composer are built into configureStore
const store = configureStore(
    {   reducer : { ui   : uiReducer,
                    data : dataReducer,
        }
    }
);

export default store
export const dispatch = store.dispatch;