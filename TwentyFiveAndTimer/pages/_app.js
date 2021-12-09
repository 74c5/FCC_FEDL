import Script from 'next/script';

/* import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
import '@fortawesome/fontawesome-svg-core/styles.css'
 */

/* import store from '../store/store';
import { initialiseApp } from '../logic/app';
 */
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {

  // initialiseApp();

  return 
      <>
        {/* <Provider store={store}> */}
            <Component {...pageProps} />
        {/* </Provider> */}
        {/* Automated Project Rubrik */}
        <Script src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"></Script>
      </>

}

export default MyApp
