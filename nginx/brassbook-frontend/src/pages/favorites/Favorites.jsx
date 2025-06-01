import React, { useState } from "react";

import SideMenu from "../../Componetns/sideMenu/SideMenu.jsx";
import styles from "./favorites.module.css"

import Player from "../../Componetns/New_favorites/Player.jsx";
import TrackList from "../../Componetns/New_favorites/TrackList.jsx";
import "./iconfont.css";
function Favorites(props) {
  const [musicNumber, setMusicNumber] = useState(0);
  return (
    <main className={styles.favorites}>
      <SideMenu activeSection={'favorites'}/>
      <div className={styles.favorites__content}>
        <TrackList props={{musicNumber, setMusicNumber}}/>
        <Player props={{musicNumber, setMusicNumber}}/>
      </div>
    </main>
  );
}

export default Favorites;