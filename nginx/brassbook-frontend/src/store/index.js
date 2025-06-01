import {configureStore} from "@reduxjs/toolkit";
import userReducer from './userSlice.js'
import albumReducer from './albumSlice.js'

export const store = configureStore({
  reducer: {
    user: userReducer,
    // albums: albumReducer,
  }
})