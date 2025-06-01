import React, { useState, useRef, useEffect } from "react";
import styles from "./card.module.css";
import musics from "../../assets/data"; // В каждом объекте musics должен быть src (URL mp3) и thumbnail
import { timer } from "./timer";
import { $api } from "../../api/index.js";
const { createFFmpeg, fetchFile } = await import('@ffmpeg/ffmpeg');

const Player = ({ props: { musicNumber, setMusicNumber } }) => {
  const [duration, setDuration] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [pitch, setPitch] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [ffmpegReady, setFfmpegReady] = useState(false);
  const [token, setToken] = useState(""); // Токен нужно взять откуда-то (localStorage, контекст и т.п.)

  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const ffmpegRef = useRef(null);

  // Инициализация ffmpeg.wasm
  useEffect(() => {
    const ffmpeg = createFFmpeg({ log: false });
    ffmpegRef.current = ffmpeg;
    (async () => {
      await ffmpeg.load();
      setFfmpegReady(true);
    })();
  }, []);

  useEffect(() => {
    // Останавливаем запись при размонтировании
    return () => {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [isRecording]);

  const handleLoadStart = (e) => {
    const src = e.nativeEvent.srcElement.src;
    const audio = new Audio(src);
    audio.onloadedmetadata = () => {
      if (audio.readyState > 0) {
        setDuration(audio.duration);
      }
    };
    if (playing && audioRef.current) {
      audioRef.current.play();
    }
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
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
    // Для реального pitch-shifting нужен Web Audio API. Здесь заглушка.
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Записываем в webm/opus (большинство браузеров поддерживает)
      const options = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? { mimeType: "audio/webm;codecs=opus" }
        : { mimeType: "audio/webm" };

      mediaRecorderRef.current = new MediaRecorder(stream, options);
      recordedChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: options.mimeType });
        recordedChunksRef.current = [];
        convertToMp3AndSend(blob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Ошибка доступа к микрофону:", err);
      alert("Не удалось получить доступ к микрофону");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const convertToMp3AndSend = async (inputBlob) => {
    if (!ffmpegReady) {
      alert("ffmpeg ещё не готов, подождите...");
      return;
    }
    try {
      const ffmpeg = ffmpegRef.current;
      // Читаем blob в Uint8Array
      const inputData = await fetchFile(inputBlob);

      // Записываем входной файл в файловую систему ffmpeg
      ffmpeg.FS("writeFile", "input.webm", inputData);

      // Конвертируем в mp3
      await ffmpeg.run(
        "-i",
        "input.webm",
        "-b:a",
        "192k",
        "-vn",
        "output.mp3"
      );

      // Читаем результат
      const mp3Data = ffmpeg.FS("readFile", "output.mp3");
      const mp3Blob = new Blob([mp3Data.buffer], { type: "audio/mpeg" });

      sendRecording(mp3Blob, "mp3");
      // Удаляем временные файлы
      ffmpeg.FS("unlink", "input.webm");
      ffmpeg.FS("unlink", "output.mp3");
    } catch (error) {
      console.error("Ошибка конвертации в MP3:", error);
      alert("Не удалось конвертировать запись в MP3");
    }
  };

  const sendRecording = async (mp3Blob, ext) => {
    try {
      const formData = new FormData();

      // 1. Берём мастер-трек (mp3)
      const masterUrl = musics[musicNumber].src;
      const masterRes = await fetch(masterUrl);
      const masterBlob = await masterRes.blob();
      const masterFile = new File([masterBlob], "file1.mp3", { type: "audio/mpeg" });

      // 2. Файл с микрофона (mp3Blob)
      const recordedFile = new File([mp3Blob], `file2.${ext}`, { type: "audio/mpeg" });

      formData.append("file1", masterFile);
      formData.append("file2", recordedFile);

      const response = await $api.post("/api/v1/compare_melodies", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Content-Type не устанавливаем вручную
        },
      });

      if (response.status === 200) {
        alert("Запись успешно отправлена");
      } else {
        console.error("Ошибка при отправке записи, статус:", response.status);
        alert("Не удалось отправить запись");
      }
    } catch (error) {
      console.error("Error sending recording:", error);
      alert("Ошибка при отправке записи на сервер");
    }
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <div className={styles.about}>
          <div className={styles.image}>
            <img src={musics[musicNumber].thumbnail} alt="" />
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
            onLoadStart={handleLoadStart}
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
          disabled={!ffmpegReady}
        >
          <p>
            <span className={isRecording ? "_icon-stop" : "_icon-mic"}></span>
            <span>{isRecording ? "Остановить запись" : "Записать с микрофона"}</span>
          </p>
        </button>

        <div className={styles.rate}>
          <p>Оцени это произведение</p>
          <div className={styles.rate__container}>
            <button>
              <img src="/src/assets/images/face-0.png" alt="" />
            </button>
            <button>
              <img src="/src/assets/images/face-1.png" alt="" />
            </button>
            <button>
              <img src="/src/assets/images/face-2.png" alt="" />
            </button>
            <button>
              <img src="/src/assets/images/face-3.png" alt="" />
            </button>
            <button>
              <img src="/src/assets/images/face-4.png" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
export { Player };
