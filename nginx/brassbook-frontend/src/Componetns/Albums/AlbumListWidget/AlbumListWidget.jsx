import { useCallback, useEffect, useState } from "react";
import AlbumFilter from "../AlbumFilter/AlbumFilter";
import AlbumInput from "../AlbumInput/AlbumInput";
import AlbumList from "../AlbumList/AlbumList";
import styles from './AlbumListWidget.module.css';
import AddAlbumModal from "../../modals/AddAlbumModal/AddAlbumModal";
import { $api } from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { addAlbum, loadAlbums } from "../../../store/albumSlice";
import classNames from "classnames";
import ChangeAlbumModal from "../../modals/ChangeAlbumModal/ChangeAlbumModal";

const ALBUM_LIMIT = 5;

function AlbumListWidget() {
  const dispatch = useDispatch();

  // const albums = useSelector((state) => state.albums.albums);
  // const albumsCount = useSelector((state) => state.albums.albumsCount);
  const albums = []
  const albumsCount = 0
  const [activeFilter, setActiveFilter] = useState('created_at');
  const [direction, setDirection] = useState('desc');
  const [searchFilter, setSearchFilter] = useState('');
  const [offset, setOffset] = useState('0');

  const [isNewAlbumModalOpen, setIsnewAlbumModalOpen] = useState(false);
  const [isEditAlbumModalOpen, setIsEditAlbumModalOpen] = useState(false);
  const [editAlbum, setEditAlbum] = useState(null);

  const createFilterHandler =  useCallback((type) => () => {
    setOffset('0');
    if (activeFilter === type) {
      setDirection(prev => prev === 'desc' ? 'asc' : 'desc');
    } else {
      setActiveFilter(type);
    }
  }, [activeFilter, setOffset, setDirection]);

  const handleNewAblumClick = useCallback(() => {
    setIsnewAlbumModalOpen(true);
  }, [setIsnewAlbumModalOpen])

  const handleAddModal = useCallback(async ({ name, image }) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    const result = await $api.post('/v1/albums', formData);
    dispatch(addAlbum(result.data.album))
    setIsnewAlbumModalOpen(false);
    dispatch(loadAlbums({ name: searchFilter, limit: ALBUM_LIMIT, offset, direction, sortBy: activeFilter }));
  }, [activeFilter, direction, dispatch, offset, searchFilter]);

  const handleSearchFilterChange = useCallback((e) => {
    setSearchFilter(e.target.value);
    setOffset('0');
  }, [setOffset, setSearchFilter]);

  const handleEditAlbumClick = useCallback((albumId) => {
    setIsEditAlbumModalOpen(true);
    setEditAlbum(albums.find(album => album.album_id === albumId))
  }, [albums]);

  const handleDeleteAlbum = useCallback(async (albumId) => {
    await $api.delete(`/v1/albums/${albumId}`)
    setIsEditAlbumModalOpen(false);
    dispatch(loadAlbums({ name: searchFilter, limit: ALBUM_LIMIT, offset, direction, sortBy: activeFilter }));
  }, [activeFilter, direction, dispatch, offset, searchFilter])

  const handleEditAlbum = useCallback(async (album) => {
    const formData = new FormData();
    formData.append('name', album.name);
    if (!(typeof album.image === 'string')) {
      formData.append('image', album.image);
    }
    await $api.patch(`/v1/albums/${album.id}`, formData);
    setIsEditAlbumModalOpen(false);
    dispatch(loadAlbums({ name: searchFilter, limit: ALBUM_LIMIT, offset, direction, sortBy: activeFilter }));
  }, [activeFilter, direction, dispatch, offset, searchFilter])

  // useEffect(() => {
  //   dispatch(loadAlbums({ name: searchFilter, limit: ALBUM_LIMIT, offset, direction, sortBy: activeFilter }));
  // }, [activeFilter, direction, dispatch, offset, searchFilter])

  return (
    <div className={styles.wrapper}>
      {isNewAlbumModalOpen && <AddAlbumModal onAddAlbum={handleAddModal} onClose={() => setIsnewAlbumModalOpen(false)} />}
      {isEditAlbumModalOpen && <ChangeAlbumModal onClose={() => setIsEditAlbumModalOpen(false)} album={editAlbum} onDeleteAlbum={handleDeleteAlbum} onChangeAlbum={handleEditAlbum} />}
      <h2 className={styles.title}>Альбомы</h2>
      <p className={styles.description}>
      Создавай альбомы по тематикам и сохраняй в них свою любимые композиции! {'\n'}
      Чтобы добавить композицию в альбом, нажми на +, а затем выбери нужный альбом из списка.
      </p>
      <AlbumInput value={searchFilter} onInputChange={handleSearchFilterChange} />
      <div className={styles.filterList}>
        <AlbumFilter isActive={activeFilter === 'created_at'} onClick={createFilterHandler('created_at')}>по дате добавления</AlbumFilter>
        <AlbumFilter isActive={activeFilter === 'name'} onClick={createFilterHandler('name')}>по алфавиту</AlbumFilter>
      </div>
      {albums && 
        <AlbumList onNewAlbumClick={handleNewAblumClick} albums={albums} onEditAlbum={handleEditAlbumClick} />
      }
      <div className={styles.pagination}>
        {new Array(1 + Math.floor(albumsCount / ALBUM_LIMIT)).fill(0).map((_, index) => (
          <button
            key={index}
            className={classNames(styles.paginationButton, {
              [styles.paginationButtonActive]: offset === String(index * ALBUM_LIMIT)
            })}
            onClick={() => setOffset(String(index * ALBUM_LIMIT))}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default AlbumListWidget;