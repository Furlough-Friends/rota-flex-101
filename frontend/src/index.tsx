import { RedirectLoginResult } from '@auth0/auth0-spa-js';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { store } from './app/store';
import config from './auth_config.json';
import App from './components/app';
import { Auth0Provider } from './react-auth0-spa';
import { history } from './utils/browser';

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
  <Provider store={store}>
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={config.callbackUri}
      audience={config.audience}
      onRedirectCallback={onRedirectCallback}
      scope="openid profile email https://rota-flex-101.com/claims/email">
      <Router history={history}>
        <App />
      </Router>
    </Auth0Provider>
  </Provider>,
  document.getElementById('root')
);
