import { Provider } from 'react-redux';
import Script from 'next/script'

import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false
import '@fortawesome/fontawesome-svg-core/styles.css'

import store from '../store/store';
import { initialiseApp } from '../logic/app';

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  
  initialiseApp();

  return  <>
            <Provider store={store}>
              <Component {...pageProps} />
            </Provider>
          </>
}

export default MyApp;
