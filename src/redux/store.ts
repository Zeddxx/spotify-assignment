import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./token"
import { spotifyApi } from "./apis/spotify-api";
import selectUtility from './utilities'

export const store = configureStore({
    reducer: {
        [spotifyApi.reducerPath]: spotifyApi.reducer,
        token: tokenReducer,
        selectUtility: selectUtility
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(spotifyApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>