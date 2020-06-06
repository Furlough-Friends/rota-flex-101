import React from 'react';

import { useAuth0 } from '../../auth0Spa';
import RootModal from '../../components/RootModal';
import FullPageLoader from '../FullPageLoader';
import Home from '../Home';
import Landing from '../Landing';

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
