import React, { useState } from 'react';
import { Track } from './Track';
import { TrackControls } from './TrackControls';
import { Pagination } from './Pagination';
import styles from './TrackList.module.css';

const trackData = [
  {
    id: 1,
    title: 'Бетховен',
    subtitle: 'Менуэт',
    duration: '1:15',
    highlighted: true
  },
  {
    id: 2,
    title: 'Бетховен',
    subtitle: 'Народный танец',
    duration: '0:47'
  },
  {
    id: 3,
    title: 'Варламов',
    subtitle: 'Красный сарафан',
    duration: '1:38'
  },
  {
    id: 4,
    title: 'Глинка',
    subtitle: 'Соловей',
    duration: '1:47'
  },
  {
    id: 5,
    title: 'Кабалевский',
    subtitle: 'Пионерское звено',
    duration: '0:59'
  },
  {
    id: 6,
    title: 'Кабалевский',
    subtitle: 'Рондо-токката',
    duration: '1:17'
  },
  {
    id: 7,
    title: 'Кажлаев',
    subtitle: 'Дудочка',
    duration: '0:32'
  },
  {
    id: 8,
    title: 'Кажлаев',
    subtitle: 'Танец',
    duration: '0:35'
  },
  {
    id: 9,
    title: 'Керубини',
    subtitle: 'Соната',
    duration: '2:44'
  },
  {
    id: 10,
    title: 'Марчелло',
    subtitle: 'Соната I часть',
    duration: '1:43'
  },
  {
    id: 11,
    title: 'Марчелло',
    subtitle: 'Соната II часть',
    duration: '1:41'
  },
  {
    id: 12,
    title: 'Марчелло',
    subtitle: 'Соната III часть',
    duration: '0:54'
  },
  {
    id: 13,
    title: 'Марчелло',
    subtitle: 'Соната IV часть',
    duration: '1:11'
  },
  {
    id: 14,
    title: 'Матис',
    subtitle: 'Концерт №2 I часть',
    duration: '4:47'
  },
  {
    id: 15,
    title: 'Матис',
    subtitle: 'Концерт №2 II часть',
    duration: '3:20'
  },
  {
    id: 16,
    title: 'Моцарт',
    subtitle: 'Весенняя песня',
    duration: '0:43'
  },
  {
    id: 17,
    title: 'Моцарт',
    subtitle: 'Песня пастушка',
    duration: '0:58'
  },
  {
    id: 18,
    title: 'Русская народная',
    subtitle: 'Протяжная',
    duration: '0:41'
  },
  {
    id: 19,
    title: 'Свиридов',
    subtitle: 'Парень с гармошкой',
    duration: '1:21'
  },
  {
    id: 20,
    title: 'Сен-Санс',
    subtitle: 'Концертная пьеса',
    duration: '8:00'
  }
];

export const TrackList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hearts, setHearts] = useState(new Array(trackData.length).fill(false));
  const [activeTrackIndex, setActiveTrackIndex] = useState(null);

  return (
    <div className={styles.trackList}>
      {trackData.map((track, index) => (
        <Track
          key={track.id}
          highlighted={index === activeTrackIndex}
          image="music_photo.png"
          title={track.title}
          subtitle={track.subtitle}
          duration={track.duration}
          onClick={() => setActiveTrackIndex(index)}
          controls={
            <TrackControls
              notesIcon="music_note.png"
              plusIcon="plus.png"
              isHeartActive={hearts[index]}
              onToggleHeart={() => {
                setHearts(prevHearts => {
                  const newHearts = [...prevHearts];
                  newHearts[index] = !newHearts[index];
                  return newHearts;
                });
              }}
            />
          }
        />
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={2}
        onPageChange={setCurrentPage}
        prevIcon="arrow_inactive.png"
        nextIcon="arrow_active.png"
      />
    </div>
  );
};