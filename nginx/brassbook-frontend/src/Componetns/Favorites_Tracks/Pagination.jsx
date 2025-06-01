import React from 'react';
import styles from './TrackList.module.css';

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  prevIcon,
  nextIcon
}) => {
  return (
    <div className={styles.pagination}>
      <button 
        className={styles.paginationButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <img
          loading="lazy"
          src={prevIcon}
          alt=""
          className={styles.paginationIcon}
        />
      </button>
      <div className={styles.paginationNumbers}>
        {Array.from({ length: totalPages }, (_, i) => (
          <div
            key={i + 1}
            className={currentPage === i + 1 ? styles.paginationActive : styles.paginationInactive}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <button 
        className={styles.paginationButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <img
          loading="lazy"
          src={nextIcon}
          alt=""
          className={styles.paginationIcon}
        />
      </button>
    </div>
  );
};