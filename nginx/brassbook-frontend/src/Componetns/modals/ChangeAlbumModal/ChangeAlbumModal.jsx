import { useMemo, useRef, useState } from "react";

import Modal from "../../common/Modal/Modal";

import styles from './ChangeAlbumModal.module.css';
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";

function ChangeAlbumModal({ onClose, album, onChangeAlbum, onDeleteAlbum }) {
  const [image, setImage] = useState(album.image);
  const [name, setName] = useState(album.name);
  
  const albumImageRef = useRef();
  const onUploadImageClick = () => {
    albumImageRef.current?.click();
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setImage(file);
  }


  const background = useMemo(() => {
    return image ? `url("${typeof image === 'string' ? image : URL.createObjectURL(image)}")` : '#F4F4F6';
  }, [image]);

  console.log('background', background)

  return (
    <Modal title="Редактирование альбома" onClose={onClose}>
      <Input label="Название альбома" placeholder="Введите имя альбома" value={name} onChange={e => setName(e.target.value)} />
      <div className={styles.uploadContainer} onClick={onUploadImageClick} style={{ 
        "--background": background,
        "--color": image ? "#fff" : "rgba(35, 11, 63, 0.3)"
        }}>
        <svg width="41" height="40" viewBox="0 0 41 40" fill="var(--color)" xmlns="http://www.w3.org/2000/svg">
          <path d="M35.4501 1.66699H30.5501C29.1001 1.66699 28.0334 2.26699 27.5501 3.33366C27.2834 3.81699 27.1667 4.38366 27.1667 5.05033V9.95033C27.1667 12.067 28.4334 13.3337 30.5501 13.3337H35.4501C36.1167 13.3337 36.6834 13.217 37.1667 12.9503C38.2334 12.467 38.8334 11.4003 38.8334 9.95033V5.05033C38.8334 2.93366 37.5667 1.66699 35.4501 1.66699ZM37.0167 8.21699C36.8501 8.38366 36.6001 8.50033 36.3334 8.51699H33.9834V9.36699L34.0001 10.8337C33.9834 11.117 33.8834 11.3503 33.6834 11.5503C33.5167 11.717 33.2667 11.8337 33.0001 11.8337C32.4501 11.8337 32.0001 11.3837 32.0001 10.8337V8.50033L29.6667 8.51699C29.1167 8.51699 28.6667 8.05033 28.6667 7.50033C28.6667 6.95033 29.1167 6.50033 29.6667 6.50033L31.1334 6.51699H32.0001V4.18366C32.0001 3.63366 32.4501 3.16699 33.0001 3.16699C33.5501 3.16699 34.0001 3.63366 34.0001 4.18366L33.9834 5.36699V6.50033H36.3334C36.8834 6.50033 37.3334 6.95033 37.3334 7.50033C37.3167 7.78366 37.2001 8.01699 37.0167 8.21699Z" fill="var(--color)"/>
          <path d="M15.5001 17.2995C17.6908 17.2995 19.4668 15.5236 19.4668 13.3329C19.4668 11.1421 17.6908 9.36621 15.5001 9.36621C13.3094 9.36621 11.5334 11.1421 11.5334 13.3329C11.5334 15.5236 13.3094 17.2995 15.5001 17.2995Z" fill="var(--color)" />
          <path d="M35.4499 13.333H34.6666V21.0163L34.4499 20.833C33.1499 19.7163 31.0499 19.7163 29.7499 20.833L22.8166 26.783C21.5166 27.8997 19.4166 27.8997 18.1166 26.783L17.5499 26.3163C16.3666 25.283 14.4833 25.183 13.1499 26.083L6.91658 30.2663C6.54992 29.333 6.33325 28.2497 6.33325 26.983V13.0163C6.33325 8.31634 8.81659 5.83301 13.5166 5.83301H27.1666V5.04967C27.1666 4.38301 27.2833 3.81634 27.5499 3.33301H13.5166C7.44992 3.33301 3.83325 6.94967 3.83325 13.0163V26.983C3.83325 28.7997 4.14992 30.383 4.76659 31.7163C6.19992 34.883 9.26659 36.6663 13.5166 36.6663H27.4833C33.5499 36.6663 37.1666 33.0497 37.1666 26.983V12.9497C36.6833 13.2163 36.1166 13.333 35.4499 13.333Z" fill="var(--color)" />
        </svg>
        <input type="file" ref={albumImageRef} style={{ display: 'none' }} accept="image/*" onChange={handleImageChange} />
        <span>Нажми, чтобы выбрать обложку альбома</span>
      </div>
      <div className={styles.buttonContainer}>
        <Button secondary={true} onClick={() => onDeleteAlbum(album.album_id)}>
          <div className={styles.deleteContainer}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 2.5H12.5M2.5 5H17.5M15.8333 5L15.2489 13.7661C15.1612 15.0813 15.1174 15.7389 14.8333 16.2375C14.5833 16.6765 14.206 17.0294 13.7514 17.2497C13.235 17.5 12.5759 17.5 11.2578 17.5H8.74221C7.42409 17.5 6.76503 17.5 6.24861 17.2497C5.79396 17.0294 5.41674 16.6765 5.16665 16.2375C4.88259 15.7389 4.83875 15.0813 4.75107 13.7661L4.16667 5M8.33333 8.75V12.9167M11.6667 8.75V12.9167" stroke="#DB422B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span style={{color: "#DB422B"}}>УДАЛИТЬ АЛЬБОМ</span>
          </div>
        </Button>
        <Button onClick={() => onChangeAlbum({ id: album.album_id, name, image })} disabled={!name}>СОХРАНИТЬ ИЗМЕНЕНИЯ</Button>
      </div>
    </Modal>
  )
}

export default ChangeAlbumModal;