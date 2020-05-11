import React from 'react';
import { Box } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/CancelRounded';
import { useLocation } from 'react-router-dom';
import errorPageStyle from './pageNotFound.module.scss';

const PageNotFound = () => {
  const location = useLocation();
  return (
    <div className={errorPageStyle.errorPage}>
      <Box>
        <h1>
          <CancelIcon className={errorPageStyle.icon} />
          SORRY
        </h1>
        <h2>We could not find that page</h2>
        <h4>
          Error: page{' '}
          <span className={errorPageStyle.path}>{location.pathname}</span> was
          not found.
        </h4>
      </Box>
    </div>
  );
};

export default PageNotFound;
