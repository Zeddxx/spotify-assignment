/**
 * @important I had a basic idea of how query works as i have worked on mostly @ReactTanstackQuery which is now @TanstackQuery @reference { https://tanstack.com/query/latest/docs/framework/react/overview }
 * - As i had an idea of @tanstackquery i found this much similar to it and made it work somehow.
 * - If i had much more time i should have implemented this on my upcoming projects as i found it @cool to work with.
 */


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
    /**
     * @description can be used to search for artist-tracks searched-tracks searched-album searched-playlists ets.
     * @param token string
     * @param search string
     * @param type "artist" | "track" | "album" | "playlists"
     * @return Objects<IArtistType | ISearchedTracks | ISearchedAlbum | ISearchedPlaylist>
     */
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

    /**
     * @description can be used to retrieve user's playlists but i used this to get featured playlists to show on home section or Root section.
     * @param token string
     * @return Object --> @type { IFeaturedPlaylists }
     */
    getUserPlaylist: builder.query<IFeaturedPlaylists, string>({
      query: (token: string) => ({
        url: `v1/browse/featured-playlists`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    /**
     * @usecase i am using this query to get the top tracks of the searched artists by finding the artistId from the name and populating it into this query to get the popular tracks of perticular artist.
     * @params { token: string, artistId: string }
     * @return ITracks
     */
    getArtistTopTracks: builder.query<ITracks, { token: string, artistId: string }>({
      query: ({ token, artistId } : { token: string, artistId: string }) => ({
        url: `v1/artists/${artistId}/top-tracks`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
    }),

    /**
     * @usecase this query is just a simple api query which will retrieve the data of default searched query which is @query "Rock".
     * @params ({ token: string, search: string, type: default "tracks", offset: default '0' })
     * 
     * @imp i could have implemented the pagination but i had not much time as my examination is going on.
     */
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
