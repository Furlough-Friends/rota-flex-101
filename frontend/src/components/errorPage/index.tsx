import React from 'react';
import Divider from '@material-ui/core/Divider';
import style from './errorPage.module.scss';

/**
 * A basic error page.
 */
interface Props {
  /** The error message. */
  error: string,
  /** Some more detail about the error. */
  message: string,
  /** OPTIONAL: Any extra information on a new line. */
  extra?: string
}

const ErrorPage = ({error, message, extra}: Props) => (
  <div className={style.fullPage}>
    <div className={style.centered}>
      <div>
        <h1 className={style.header}>Error</h1>
        <p>{error}</p>
      </div>
      <Divider orientation="vertical" flexItem />
      <div>
        <p>{message}</p>
        {extra && <p><i>{extra}</i></p>}
      </div>
    </div>
  </div>
);

export default ErrorPage;
