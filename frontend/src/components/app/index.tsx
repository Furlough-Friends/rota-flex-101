import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Home from '../home';
import Landing from '../landing';
import { useAuth0 } from '../../react-auth0-spa';
import style from './index.module.scss';

const App = () => {
  const { isAuthenticated, loading } = useAuth0();
  if (loading)
    return (
      <div className={style.loaderWrapper}>
        <CircularProgress className={style.loader} />
      </div>
    );
  return isAuthenticated ? <Home /> : <Landing />;
};

export default App;
