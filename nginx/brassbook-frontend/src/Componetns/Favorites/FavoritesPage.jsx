import * as React from "react";
import styles from './FavoritesPage.module.css';
import {Link} from "react-router-dom";

export default function FavoritesPage() {
  return (
    <div className={styles.favoritesContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.headerGroup}>
          <h1 className={styles.title}>Избранное</h1>
          <div className={styles.compositionCount}>23 композиции</div>
          <div className={styles.descriptionWrapper}>
            <span>Композиции, отмеченные тобою</span>
            <img
              loading="lazy"
              src="vuesax_heart.svg"
              className={styles.icon}
              alt=""
            />
            <span>, находятся здесь.</span>
          </div>
        </div>
        <Link 
          className={styles.navigationLink}
          tabIndex="0"
          role="button"
          to="/user"
        >
          <img
            loading="lazy"
            src="vuesax_arrow-right.svg"
            className={styles.icon}
            alt=""
          />
          <span>Вернуться в Личный кабинет</span>
        </Link>
      </div>
      <img
        loading="lazy"
        src="Like icon 3d vector illustration 2.png"
        className={styles.heroImage}
        alt="Favorites illustration"
      />
    </div>
  );
}