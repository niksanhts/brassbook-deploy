import styles from './AlbumFilter.module.css';
import classNames from 'classnames';

function AlbumFilter({ isActive, children, onClick }) {
  return (
    <button className={classNames(styles.button, {
      [styles.buttonActive]: isActive
    })} onClick={onClick}>
      {children}
    </button>
  )
}

export default AlbumFilter;