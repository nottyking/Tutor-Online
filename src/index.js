import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk'
import { LocaleProvider } from 'antd';
import thTH from 'antd/lib/locale-provider/th_TH';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import reducers from './Frontend/redux/reducers';
import App from './App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers, composeEnhancers(
    applyMiddleware(reduxPromise, reduxThunk)
  )
)

const AppProvider = () => (
  <Provider store={store}>
    <LocaleProvider locale={thTH}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LocaleProvider>
  </Provider>
)

ReactDOM.render(<AppProvider />, document.getElementById('root'));
registerServiceWorker();
