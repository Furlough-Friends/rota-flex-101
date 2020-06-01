import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { RedirectLoginResult } from '@auth0/auth0-spa-js';
import { Router } from 'react-router-dom';
import { Auth0Provider } from './common/react-auth0-spa';
import App from './app/App';
import config from './auth_config.json';
import { browserHistory } from './common/constants/global';

import { store } from './app/store';

interface appState {
  appState: Promise<RedirectLoginResult>;
  targetUrl: string;
}

// Routes user to correct url after authenticating
const onRedirectCallback = (appState: appState) => {
  browserHistory.push(
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
      <Router history={browserHistory}>
        <App />
      </Router>
    </Auth0Provider>
  </Provider>,
  document.getElementById('root')
);
