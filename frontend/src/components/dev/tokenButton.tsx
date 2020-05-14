import React from 'react';
import { useAuth0 } from '../../react-auth0-spa';
import Button from '@material-ui/core/Button';

const TokenButton = () => {
  const { isAuthenticated, getTokenSilently } = useAuth0();
  return (
    <>
      {isAuthenticated && (
        <Button
          variant="contained"
          onClick={async () => {
            const token = await getTokenSilently();
            console.log(token);
          }}>
          Get Token
        </Button>
      )}
    </>
  );
};

export default TokenButton;
