import { Provider } from 'react-redux';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

import store from '../store/store';

import '../styles/globals.css'

config.autoAddCss = false

function MyApp({ Component, pageProps }) {
  return  <>
            <Provider store={store}>
              <Component {...pageProps} />
            </Provider>
            {/* Automated Project Rubrik */}
            <script src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"></script>
          </>
}

export default MyApp;
