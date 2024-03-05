import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./token"
import { spotifyApi } from "./apis/spotify-api";
import userProfileReducer from "./user-profile"
import selectOffset from './pagination'

export const store = configureStore({
    reducer: {
        [spotifyApi.reducerPath]: spotifyApi.reducer,
        token: tokenReducer,
        userProfile: userProfileReducer,
        setOffset: selectOffset
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(spotifyApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>