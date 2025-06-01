import axios from 'axios'
import './player.css'
import AudioPlayer from "react-h5-audio-player";
function Player(props) {

  return (
    <AudioPlayer
      src="http://localhost:8000/v1/staticFiles/audio/1"
    />
  );
}

export default Player;