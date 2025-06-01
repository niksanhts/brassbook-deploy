import styles from './Input.module.css';

function Input(props) {
  return (
    <label className={styles.labelWrapper}>
      <span className={styles.label}>{props.label}</span>
      <input className={styles.input} {...props} />
    </label>
  )
}

export default Input;