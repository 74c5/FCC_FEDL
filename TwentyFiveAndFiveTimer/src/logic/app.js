import store, {dispatch} from '../store/store';

import { actions as app } from '../store/appSlice'
import { setSessionParams } from './timer';

// application functions
export const toggleSettingsModal = () => {
    // force update to main screen when closing the settings modal
    if (store.getState().app.showSettings) setSessionParams();
    
    dispatch( app.toggleSettings() );
};
