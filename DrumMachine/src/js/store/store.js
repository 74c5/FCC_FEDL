import { configureStore } from '@reduxjs/toolkit'
// import { createStore, applyMiddleware } from 'redux'
// import thunkMiddleware from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import rootReducer from './reducer'
import uiReducer from './ui';
import controlReducer from './control';

// const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
// const composedEnhancer = applyMiddleware(thunkMiddleware);

// Devtools, thunk middelware and reducer composer are built into configureStore
const store = configureStore(
    {   reducer : { ui      : uiReducer,
                    control : controlReducer,
        }
    }
);

export default store
