import React from 'react';
import Home from '../home';
import RootModal from '../rootModal';
import Landing from '../landing';
import { useAuth0 } from '../../react-auth0-spa';
import FullPageLoader from '../fullPageLoader';

const App = () => {
  const { isAuthenticated, loading } = useAuth0();
  if (loading) return <FullPageLoader />;
  return isAuthenticated ? (
    <>
      <Home />
      <RootModal />
    </>
  ) : (
    <Landing />
  );
};

export default App;
