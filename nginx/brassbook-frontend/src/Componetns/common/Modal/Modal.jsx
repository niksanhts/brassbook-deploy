import styles from './Modal.module.css';

function Modal({ children, title = '', onClose }) {
  return (
    <modal className={styles.wrapper}>
      <div className={styles.modal}>
        <div className={styles.modal__title}>
          <span>{title}</span>
          <button className={styles.cross} onClick={onClose}>
            <span />
            <span />
          </button>
        </div>
        {children}
      </div>
    </modal>
  )
}

export default Modal;