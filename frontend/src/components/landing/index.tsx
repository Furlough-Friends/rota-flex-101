import Divider from '@material-ui/core/Divider';
import React from 'react';

import LoginOutButton from '../loginOutButton';
import style from './landing.module.scss';

const Landing = () => (
  <div className={style.fullPage}>
    <div className={style.landing}>
      <div>
        <h1 className={style.header}>Welcome</h1>
        <p>to Rota Flex</p>
      </div>
      <Divider orientation="vertical" flexItem />
      <div>
        <LoginOutButton />
      </div>
    </div>
  </div>
);

export default Landing;
