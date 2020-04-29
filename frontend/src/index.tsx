import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { RedirectLoginResult } from '@auth0/auth0-spa-js';
import { Router } from 'react-router-dom';
import { Auth0Provider } from './react-auth0-spa';
import App from './components/app';
import config from './auth_config.json';
import history from './utils/history';
import { store } from './app/store';
import * as serviceWorker from './serviceWorker';

interface appState {
  appState: Promise<RedirectLoginResult>;
  targetUrl: string;
}

// Routes user to correct url after authenticating
const onRedirectCallback = (appState: appState) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain={config.domain}
        client_id={config.clientId}
        redirect_uri={config.callbackUri}
        onRedirectCallback={onRedirectCallback}>
        <Router history={history}>
          <App />
        </Router>
      </Auth0Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
