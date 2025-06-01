import styles from './EmptyAlbumItem.module.css'

function EmptyAlbumItem({ onClick }) {
  return (
    <div className={styles.wrapper} onClick={onClick}>Создать альбом +</div>
  )
}

export default EmptyAlbumItem;