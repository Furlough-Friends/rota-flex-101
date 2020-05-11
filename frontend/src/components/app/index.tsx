import React from 'react';
import Home from '../home';
import Landing from '../landing';
import { useAuth0 } from '../../react-auth0-spa';
import { CircularProgress } from '@material-ui/core';
import style from './index.module.scss';

const App = () => {
  const { isAuthenticated, loading } = useAuth0();
  if (loading)
    return (
      <div className={style.loaderWrapper}>
        <CircularProgress className={style.loader} />
      </div>
    );
  else return isAuthenticated ? <Home /> : <Landing />;
};

export default App;
