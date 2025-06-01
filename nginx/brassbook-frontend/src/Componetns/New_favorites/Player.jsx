import React, { useState, useRef, useEffect } from "react";
import styles from "./card.module.css";
import musics from "../../assets/data"; // Ensure musics contains src (URL mp3) and thumbnail
import { timer } from "./timer";
import { $api } from "../../api/index.js";

const Player = ({ props: { musicNumber, setMusicNumber } }) => {
  const [duration, setDuration] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [pitch, setPitch] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  // Clean up MediaRecorder on unmount
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isRecording]);

  const handleLoadStart = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    audio.onloadedmetadata = () => {
      if (audio.readyState > 0) {
        setDuration(audio.duration);
      }
    };
    if (playing) {
      audio.play().catch((err) => console.error("Playback failed:", err));
    }
    audio.playbackRate = playbackRate;
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => console.error("Playback failed:", err));
    }
    setPlaying((prev) => !prev);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const seek = (e) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const skipTrack = (offset) => {
    setMusicNumber((prev) => {
      const next = prev + offset;
      if (next < 0) return musics.length - 1;
      if (next >= musics.length) return 0;
      return next;
    });
  };

  const changePlaybackRate = (e) => {
    const rate = parseFloat(e.target.value);
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const changePitch = (e) => {
    const p = parseInt(e.target.value, 10);
    setPitch(p);
    // TODO: Implement pitch-shifting with Web Audio API if needed
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : "audio/webm";

      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType });
      recordedChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: mimeType });
        recordedChunksRef.current = [];
        sendRecording(blob, mimeType);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to access microphone:", err);
      alert("Failed to access microphone.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendRecording = async (recordingBlob, mimeType) => {
    try {
      const formData = new FormData();
      const masterUrl = musics[musicNumber].src;
      const masterRes = await fetch(masterUrl);
      const masterBlob = await masterRes.blob();
      const masterFile = new File([masterBlob], "file1.mp3", { type: "audio/mpeg" });

      const extension = mimeType.split("/")[1].split(";")[0]; // e.g., "webm"
      const recordedFile = new File([recordingBlob], `file2.${extension}`, { type: mimeType });

      formData.append("file1", masterFile);
      formData.append("file2", recordedFile);

      const response = await $api.post("/v1/compare_melodies", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert("Recording sent successfully.");
      } else {
        console.error("Failed to send recording, status:", response.status);
        alert("Failed to send recording.");
      }
    } catch (error) {
      console.error("Error sending recording:", error);
      alert("Error sending recording to server.");
    }
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <div className={styles.about}>
          <div className={styles.image}>
            <img src={musics[musicNumber].thumbnail} alt={musics[musicNumber].title} />
          </div>
          <div className={styles.details}>
            <p className={styles.artist}>{musics[musicNumber].artist}</p>
            <marquee behavior="alternate" scrolldelay="300" className={styles.title}>
              {musics[musicNumber].title}
            </marquee>
            <p className={styles.version}>Версия от BrassBook</p>
          </div>
        </div>

        <div className={styles.progress}>
          <input
            className={styles.progress_bar}
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={seek}
          />
          <div className={styles.timer}>
            <span>{timer(currentTime)}</span>
            <span>{timer(duration)}</span>
          </div>
        </div>

        <div className={styles.controls}>
          <button onClick={() => skipTrack(-1)}>
            <p className="_icon-prev"></p>
          </button>

          <div className={styles.play}>
            <button onClick={handlePlayPause}>
              {playing ? <div className="_icon-pause" /> : <p className="_icon-play-white"></p>}
            </button>
          </div>

          <button onClick={() => skipTrack(1)}>
            <p className="_icon-next"></p>
          </button>

          <audio
            src={musics[musicNumber].src}
            hidden
            ref={audioRef}
            onLoadedMetadata={handleLoadStart}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => skipTrack(1)}
          />
        </div>

        <div className={styles.playbackControls}>
          <p>Скорость воспроизведения: {playbackRate.toFixed(1)}x</p>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={playbackRate}
            onChange={changePlaybackRate}
            className="styled-slider slider-progress"
          />
        </div>

        <div className={styles.toneControls}>
          <p>Тон: {pitch > 0 ? `+${pitch}` : pitch}</p>
          <input
            type="range"
            min="-1200"
            max="1200"
            step="100"
            value={pitch}
            onChange={changePitch}
            className="styled-slider slider-progress"
          />
        </div>

        <button className={styles.download}>
          <p>
            <span className="_icon-download"></span>
            <span>Скачать композицию</span>
          </p>
        </button>

        <button
          className={`${styles.record} ${isRecording ? styles.recording : ""}`}
          onClick={isRecording ? stopRecording : startRecording}
        >
          <p>
            <span className={isRecording ? "_icon-stop" : "_icon-mic"}></span>
            <span>{isRecording ? "Остановить запись" : "Записать с микрофона"}</span>
          </p>
        </button>

        <div className={styles.rate}>
          <p>Оцени это произведение</p>
          <div className={styles.rate__container}>
            {["face-0.png", "face-1.png", "face-2.png", "face-3.png", "face-4.png"].map(
              (face, index) => (
                <button key={index}>
                  <img src={`/assets/images/${face}`} alt={`Rating ${index}`} />
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
export { Player };