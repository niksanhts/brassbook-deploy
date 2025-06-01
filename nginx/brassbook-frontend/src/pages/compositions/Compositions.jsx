import SideMenu from "../../Componetns/sideMenu/SideMenu.jsx";
import Player from "../../Componetns/player/Player.jsx";
import styles from "./compositions.module.css"
import Voicerecorder from "../../Componetns/VoiceRecorder/VoiceRecorder.jsx";
import Card from "../../Componetns/Card/Card.jsx";
import Traks from "../../Componetns/Traks/Traks.jsx";
import Favorites from "../favorites/Favorites.jsx";

function Compositions(props) {
  return (
    <main className={styles.compositions}>
      <SideMenu activeSection={'compositions'}/>
      <div className={styles.compositions__content}>
        <Traks/>
        <Voicerecorder/>
        <Player/>
      </div>
    </main>
  );
}

export default Compositions;