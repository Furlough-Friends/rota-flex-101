import React from 'react';
import { useAuth0 } from '../../react-auth0-spa';

// Button to log in user via Auth0
// The button is disabled when Auth0 authentication is loading

const LoginOutButton = () => {
  const { loading, isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <>
      {!isAuthenticated ? (
        <button type="button" disabled={loading} onClick={() => loginWithRedirect({})}>
          Log in
        </button>
      ) : (
        <button type="button" disabled={loading} onClick={() => logout({ federated: true })}>
          Log out {!loading && user.name}
        </button>
      )}
    </>
  );
};

export default LoginOutButton;
