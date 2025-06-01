import React from 'react';
import styles from './FilterButton.module.css';

export const FilterButton = ({ icon, text, onClick }) => {
  return (
    <button 
      className={styles.filterButton}
      onClick={onClick}
      tabIndex={0}
      role="button"
    >
      <img 
        src={icon} 
        alt="" 
        className={styles.filterIcon}
        loading="lazy"
      />
      <span className={styles.filterText}>{text}</span>
    </button>
  );
};