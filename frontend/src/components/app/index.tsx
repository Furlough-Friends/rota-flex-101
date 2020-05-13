import React from 'react';
import Home from '../home';
import { useAuth0 } from '../../react-auth0-spa';

/**
 * Added temporary loading check here to make sure Auth0 is authenticated after refresh/page load.
 */
const App = () => {
  const { loading } = useAuth0();
  return loading ? null : <Home />;
};

export default App;
