import styles from './user.module.css'
import SideMenu from "../../Componetns/sideMenu/SideMenu.jsx";
// import {useSelector} from "react-redux";
import Voicerecorder from "../../Componetns/VoiceRecorder/VoiceRecorder.jsx";
import Card from "../../Componetns/Card/Card.jsx";
import Traks from "../../Componetns/Traks/Traks.jsx";
// import Player from "../../Componetns/player/Player.jsx";
import AlbumListWidget from "../../Componetns/Albums/AlbumListWidget/AlbumListWidget.jsx";
// import Favorites from '../favorites/Favorites.jsx';
import Player from "../../Componetns/New_favorites/Player.jsx"
import {useState} from "react";

function User(props) {
    const [musicNumber, setMusicNumber] = useState(0);

    return (
        <main className={styles.user}>
            <SideMenu activeSection={'user'}/>
            <div className={styles.user__container}>
                <div className={styles.user__content}>
                    <Card/>
                    <Traks/>
                    <AlbumListWidget/>
                </div>
            </div>
            <div className={styles.user__side_content}>
                <Voicerecorder/>
                <Player props={{musicNumber, setMusicNumber}}/>
            </div>

        </main>
    );
}

export default User;