import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IArtistType, IDefaultTrack, IFeaturedPlaylists, ISearchedAlbum, ISearchedPlaylist, ISearchedTracks, ITracks, IUserProfile } from "../../types";

export const spotifyApi = createApi({
  reducerPath: "spotifyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.spotify.com/",
  }),
  endpoints: (builder) => ({
    getUserProfile: builder.query<IUserProfile, string>({
      query: (token: string) => ({
        url: "v1/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getSearch: builder.query<IArtistType & ISearchedTracks & ISearchedAlbum & ISearchedPlaylist, { token: string, search: string, type: string}>({
      query: ({
        token,
        search,
        type,
      }: {
        token: string;
        search: string;
        type: string;
      }) => ({
        url: `v1/search?q=${search}&type=${type}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getUserPlaylist: builder.query<IFeaturedPlaylists, string>({
      query: (token: string) => ({
        url: `v1/browse/featured-playlists`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getArtistTopTracks: builder.query<ITracks, { token: string, artistId: string }>({
      query: ({ token, artistId } : { token: string, artistId: string }) => ({
        url: `v1/artists/${artistId}/top-tracks`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
    }),
    getDefaultSearch: builder.query<IDefaultTrack, { token: string, search: string, type: string, offset: number }>({
      query: ({
        token,
        search,
        type,
        offset
      }: {
        token: string;
        search: string;
        type: string;
        offset: number
      }) => ({
        url: `v1/search?q=${search}&type=${type}&offset=${offset}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useGetSearchQuery,
  useGetUserPlaylistQuery,
  useGetArtistTopTracksQuery,
  useGetDefaultSearchQuery
} = spotifyApi;
