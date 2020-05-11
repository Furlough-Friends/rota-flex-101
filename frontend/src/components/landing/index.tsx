import React from 'react';
import LoginOutButton from '../loginOutButton';
import style from './landing.module.scss';
import { Divider } from '@material-ui/core';

const Landing = () => {
  return (
    <div className={style.fullPage}>
      <div className={style.landing}>
        <div>
          <h1>Welcome</h1>
          <p>to Rota Flex</p>
        </div>
        <Divider orientation="vertical" flexItem />
        <div>
          <LoginOutButton />
        </div>
      </div>
    </div>
  );
};

export default Landing;
