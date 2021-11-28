import { Provider } from 'react-redux';
import Script from 'next/script'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

import store from '../store/store';
import { initialiseApp } from '../logic/app';

import '../styles/globals.css'

config.autoAddCss = false

function MyApp({ Component, pageProps }) {
  
  initialiseApp();

  return  <>
            <Provider store={store}>
              <Component {...pageProps} />
            </Provider>
            {/* Automated Project Rubrik */}
            <Script src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"></Script>
          </>
}

export default MyApp;
