import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';

import style from './fullPageLoader.module.scss';

const FullPageLoader = () => (
  <div className={style.loaderWrapper}>
    <CircularProgress className={style.loader} />
  </div>
);

export default FullPageLoader;
