import React from 'react';
import styles from './TrackList.module.css';

export const TrackControls = ({ 
  notesIcon,
  plusIcon,
  isHeartActive,
  onToggleHeart
}) => {
  const toggleHeart = () => {
    onToggleHeart();
  };

  const heartSrc = isHeartActive ? 'heart0.png' : 'heart1.png';

  const heartButtonClass = isHeartActive ? 
    'rgba(247, 10, 81, 0.1)' : 
    'rgba(244, 244, 246, 1)';

  return (
    <>
      <button className={styles.controlButtonNotes} aria-label="View sheet music">
        <img
          loading="lazy"
          src={notesIcon}
          alt=""
          className={styles.controlIcon}
        />
        <span>Ноты</span>
      </button>
      <button 
        className={styles.controlButton}
        style={{ backgroundColor: heartButtonClass }}
        aria-label={isHeartActive ? "Remove from favorites" : "Add to favorites"}
        onClick={toggleHeart}
      >
        <img
          loading="lazy"
          src={heartSrc}
          alt=""
          className={styles.controlIconLarge}
        />
      </button>
      <button className={styles.controlButton} aria-label="More options">
      <img
          loading="lazy"
          src={plusIcon}
          alt=""
          className={styles.controlIconLarge}
        />
      </button>
    </>
  );
};