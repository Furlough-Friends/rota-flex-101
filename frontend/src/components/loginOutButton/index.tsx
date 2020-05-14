import React from 'react';
import Button from '@material-ui/core/Button';
import { useAuth0 } from '../../react-auth0-spa';

// Button to log in user via Auth0
// The button is disabled when Auth0 authentication is loading

const LoginOutButton = () => {
  const {
    loading,
    isAuthenticated,
    loginWithRedirect,
    logout,
    getTokenSilently,
  } = useAuth0();

  const handleLoginOutButtonClick = () => {
    if (isAuthenticated) {
      logout({ federated: true });
    } else {
      loginWithRedirect({ appState: { targetUrl: window.location.pathname } });
    }
  };

  return (
    <div className="login-out-button">
      <Button
        variant="contained"
        color="primary"
        disabled={loading}
        onClick={handleLoginOutButtonClick}>
        {isAuthenticated && !loading ? 'Log out' : 'Log in'}
      </Button>
      <Button
        variant="contained"
        onClick={async () => {
          const token = await getTokenSilently();
          console.log(token);
        }}>
        Get Token
      </Button>
    </div>
  );
};

export default LoginOutButton;
