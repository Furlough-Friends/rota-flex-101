import React from 'react';
import Home from '../features/home';
import RootModal from '../features/modal/rootModal';
import Landing from '../features/landing';
import { useAuth0 } from '../common/react-auth0-spa';
import FullPageLoader from '../features/fullPageLoader';

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
