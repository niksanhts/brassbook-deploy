import React, { useState, useRef } from 'react';
import YellowButton from "../yellowButton/YellowButton";
import classes from './VoiceRecorder.module.css';

function Voicerecorder() {
    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const audioChunksRef = useRef([]);
    const audioRef = useRef(new Audio());
    const [isPlaying, setIsPlaying] = useState(false);
    const [savedAudio, setSavedAudio] = useState(null); // Стейт для хранения сохраненной записи

    const startRecording = () => {

        audioChunksRef.current = [];
        setRecording(false);

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const recorder = new MediaRecorder(stream);

                recorder.ondataavailable = (e) => {
                    audioChunksRef.current.push(e.data);
                };

                recorder.onstop = () => {
                    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/ogg' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    audioRef.current.src = audioUrl;
                    // Установка isPlaying в false, чтобы воспроизведение не начиналось автоматически при остановке записи
                    setIsPlaying(false);
                };

                recorder.start();
                setRecording(true);
                setMediaRecorder(recorder);
            })
            .catch(error => {
                console.error('Error accessing microphone:', error);
            });
    };

    const stopRecording = () => {
        if (mediaRecorder && mediaRecorder.state === 'recording' && recording) {
            mediaRecorder.stop();
            setRecording(false);
            // Очищаем массив после остановки записи
            audioChunksRef.current = [];
        }
    };

    const playAudio = () => {
        if (!isPlaying && audioChunksRef.current.length > 0) {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/ogg' });
            const audioUrl = URL.createObjectURL(audioBlob);
            audioRef.current.src = audioUrl;
            audioRef.current.play();
            setIsPlaying(true);
        }
        setIsPlaying(false)
    };

    const saveAudio = () => {
        // Сохранение записи, если она есть
        if (audioChunksRef.current.length > 0) {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/ogg' });
            setSavedAudio(URL.createObjectURL(audioBlob));
            // Очистка записанных данных
            // audioChunksRef.current = [];
            // setRecording(false);
        }
    };

        return (
          <div className={classes.voicerecorder}>
                <div className={classes.voicerecorder_title}>
                    Диктофон
                </div>

                <div className={classes.voicerecorder_subtitle}>
                    Ты можешь записать свою игру на инструменте и, если захочешь, она будет проанализирована на ошибки.
                </div>

                {/* <YellowButton onClick={startRecording} className={'voicerecorder_btn button-type-2'}>ЗАПИСАТЬ ПРОИЗВЕДЕНИЕ</YellowButton> */}
                <div>
                <button onClick={recording ? stopRecording : startRecording}>
                    {recording ? 'Stop Recording' : 'Start Recording'}
                </button>
                <button onClick={playAudio} disabled={recording && audioChunksRef.current.length === 0}>
                    Play Audio
                </button>
                <button onClick={saveAudio} disabled={recording && audioChunksRef.current.length === 0}>
                    Save Audio
                </button>
                </div>
                {/* Добавляем тег audio для воспроизведения сохраненной записи */}
                {savedAudio && <audio controls src={savedAudio} />}
          </div>
  );
}

export default Voicerecorder