import React from 'react';
import styles from './TrackList.module.css';

export const Track = ({ 
  highlighted,
  image,
  title,
  subtitle,
  duration,
  controls,
  onClick
}) => {
  const trackClass = highlighted ? styles.trackHighlighted : styles.track;

  return (
    <div className={trackClass} onClick={onClick}>
      <div className={styles.trackInfo}>
        <img
          loading="lazy"
          src={image}
          alt={`Album art for ${title}`}
          className={styles.trackImage}
        />
        <div className={styles.trackDetails}>
          <div className={styles.trackTitle}>{title}</div>
          <div className={styles.trackSubtitle}>{subtitle}</div>
        </div>
        <div className={styles.trackDuration}>{duration}</div>
      </div>
      <div className={styles.trackControls}>
        {controls}
      </div>
    </div>
  );
};