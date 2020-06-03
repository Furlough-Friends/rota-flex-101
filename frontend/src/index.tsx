import { RedirectLoginResult } from '@auth0/auth0-spa-js';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { Auth0Provider } from './auth0Spa';
import App from './components/app';
import { store } from './store';
import { history } from './utils/browser';
import { environment } from './utils/environment';

const {
  authDomain,
  authClientId,
  authAudience,
  authCallbackUri,
  authScope,
} = environment;

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
      domain={authDomain}
      client_id={authClientId}
      redirect_uri={authCallbackUri}
      audience={authAudience}
      onRedirectCallback={onRedirectCallback}
      scope={authScope}>
      <Router history={history}>
        <App />
      </Router>
    </Auth0Provider>
  </Provider>,
  document.getElementById('root')
);
