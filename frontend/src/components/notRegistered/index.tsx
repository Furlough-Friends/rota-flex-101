import React from 'react';
import Divider from '@material-ui/core/Divider';
import style from './notRegistered.module.scss';

const NotRegistered = () => (
  <div className={style.fullPage}>
    <div className={style.centered}>
      <div>
        <h1 className={style.header}>Welcome</h1>
        <p>to Rota Flex</p>
      </div>
      <Divider orientation="vertical" flexItem />
      <div>
        <p>You need to be registered to use this application!</p>
        <p>Please speak to your manager.</p>
      </div>
    </div>
  </div>
);

export default NotRegistered;
