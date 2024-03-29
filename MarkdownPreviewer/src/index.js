import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux';
import App from './js/components/App';
import store from './js/store/store';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('react-container')
);