import { createStore } from '@reduxjs/toolkit';

// action enums
const INC = 'increment';

// action functions
export const incrementCounter = () => ({type: INC});

// reducers
const counterReducer = (store=0, action) => {
  switch (action.type) {
    case INC:
      return store+1;
    default:
      return store;
  }
}

// create the data store
export const store = createStore(counterReducer);
