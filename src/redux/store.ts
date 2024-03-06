/**
 * @Redux Toolkit for the state management
 * - I was not much familiar with @redux
 * - I have worked with @Zustand and @ContextApi for my state management on my projects wasn't used redux but found some similarities between then so implemented it.
 * - For Redux @reference i used to @core docs @reference https://redux-toolkit.js.org/usage/usage-with-typescript#configurestore
 * - I uses '@' to import components or function as i found it looks consistent.
 */

import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "@/redux/token"
import { spotifyApi } from "@/redux/apis/spotify-api";
import selectUtility from '@/redux/utilities'

export const store = configureStore({
    reducer: {
        [spotifyApi.reducerPath]: spotifyApi.reducer,
        token: tokenReducer,
        selectUtility: selectUtility
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(spotifyApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>