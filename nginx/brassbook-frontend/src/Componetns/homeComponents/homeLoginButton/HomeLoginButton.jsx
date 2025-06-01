import React from 'react';
import {Link} from "react-router-dom";
import styles from './HomeLoginButton.module.css'

function HomeLoginButton({children, to, color}) {

  const classes = (
    color === 'blue' ?
      `${styles['home-login-button']} ${styles['home-login-button_in-btn']}` :
      styles['home-login-button']
  )

  return (
    <Link
      to={to}
      className={classes}
      // className="button-type-1 button-type-1_in-btn"
    >
      {children}
    </Link>
  );
}

export default HomeLoginButton;