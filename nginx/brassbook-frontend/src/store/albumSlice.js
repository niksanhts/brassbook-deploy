import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $api } from "../api";

export const loadAlbums = createAsyncThunk('albums/loadAlbum', async ({ name, limit, offset, direction, sortBy }) => {
  const params = new URLSearchParams();
  if (name) {
    params.append('name', name)
  }
  if (limit) {
    params.append('limit', limit)
  }
  if (offset) {
    params.append('offset', offset)
  }
  
  if (direction && sortBy) {
    params.append('sortBy', `${sortBy}:${direction}`)
  }

  const { data: albumsData } = await $api.get(`/v1/albums?${params.toString()}`);

  return albumsData;
})

const initialState = {
  albums: [],
  albumsCount: 0,
  isAlbumsLoading: false,
}

export const albumSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    setAlbums: (state, action) => {
      state.albums = action.payload
    },
    addAlbum: (state, action) => {
      state.albums.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadAlbums.pending, (state) => {
      state.isAlbumsLoading = true
    })
    builder.addCase(loadAlbums.fulfilled, (state, action) => {
      state.albums = action.payload.albums;
      state.albumsCount = action.payload.count;
      state.isAlbumsLoading = false
    })
  }
})

export const { setAlbums, addAlbum } = albumSlice.actions

export default albumSlice.reducer