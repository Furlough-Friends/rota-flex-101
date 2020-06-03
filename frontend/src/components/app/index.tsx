import React from 'react';

import { useAuth0 } from '../../auth0Spa';
import FullPageLoader from '../fullPageLoader';
import Home from '../home';
import Landing from '../landing';
import RootModal from '../rootModal';

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
