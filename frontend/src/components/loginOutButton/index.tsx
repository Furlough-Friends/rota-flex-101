import React from 'react';
import { useAuth0 } from '../../react-auth0-spa';

// Button to log in user via Auth0
// The button is disabled when Auth0 authentication is loading

const LoginOutButton = () => {
  const {
    loading,
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
  } = useAuth0();

  const handleLoginOutButtonClick = () => {
    if (isAuthenticated) {
      logout({ federated: true });
    } else {
      loginWithRedirect({});
    }
  };

  return (
    <div className="login-out-button">
      <button
        type="button"
        disabled={loading}
        onClick={handleLoginOutButtonClick}>
        {isAuthenticated && !loading ? `Log out ${user.name}` : 'Log in'}
      </button>
    </div>
  );
};

export default LoginOutButton;
