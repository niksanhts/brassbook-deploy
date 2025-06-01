import classnames from 'classnames';
import styles from './Button.module.css';

function Button({ children, disabled, onClick, secondary }) {
  return (
    <button className={classnames(styles.wrapper, {
      [styles.buttonDisabled]: disabled,
      [styles.secondary]: secondary
    })} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button;