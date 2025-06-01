import React from 'react';
import {Link} from "react-router-dom";
import styles from "./buttonType2.module.css"

function YellowButton({children, type, onClick, additionalClass, htmlButtonType, to, disabled}) {
  const btn = (type === 'btn' ?
    <button
      onClick={onClick}
      type={htmlButtonType}
      className={`${styles['button-type-2']} ${additionalClass ? additionalClass : ''}`}
      disabled={disabled}
    >
      {children}
    </button> :
    <Link
      to={to}
      className={`${styles['button-type-2']} ${additionalClass ? additionalClass : ''}`}
    >
      {children}
    </Link>
  )

  return (
    <>
      {btn}
    </>
  );
}

export default YellowButton;