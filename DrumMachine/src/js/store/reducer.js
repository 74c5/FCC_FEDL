import {combineReducers} from 'redux';
import uiReducer from './ui';
import controlReducer from './control';

// reducers
const rootReducer = combineReducers(
    {
        ui: uiReducer,
        control: controlReducer,
    }
);

export default rootReducer;
export {rootReducer as rootReducer};