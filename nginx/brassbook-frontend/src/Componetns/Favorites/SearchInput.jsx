import * as React from "react";
import styles from './SearchInput.module.css';

export default function SearchInput() {
  return (
    <form className={styles.searchContainer} role="search">
      <img
        loading="lazy"
        src="vuesax_music-square-search.svg"
        className={styles.searchIcon}
        alt=""
      />
      <input
        type="search"
        id="compositionSearch"
        className={styles.searchInput}
        placeholder="Найти композицию"
      />
    </form>
  );
}

