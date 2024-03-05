export type IUserProfile = {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
};

interface Image {
  url: string;
  height: number;
  width: number;
}

export type IItems = {
  description: string;
  name: string;
  id: string;
  href: string;
  images: Image[];
  primary_color: string;
  type: string;
};

export type IPlaylists = {
  href: string;
  items: IItems[];
};

export type IFeaturedPlaylists = {
  message: string;
  playlists: IPlaylists;
};

export type IArtists = {
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

export type IAlbum = {
  album_type: string;
  images: Image[];
};

export type IItemsTracks = {
  album: IAlbum;
  artists: IArtists[];
  available_markets: string[];
  id: string;
  name: string;
  type: string;
  popularity: number;
  track_number: number;
};

export type ITracks = {
  tracks: IItemsTracks[]
};

export type ISearchedTracks = {
  tracks: {
    href: string
    items: [
      {
        album: {
          album_type: string;
          artists: IArtists[];
          available_markets: string[];
          href: string;
          id: string;
          images: Image[];
          name: string;
          release_date: string;
          total_tracks: number;
          type: string;
        };
        artists: IArtists[];
        available_markets: string[];
        id: string;
        name: string;
        popularity: number;
        type: string;
      }
    ];
  }
}

export type ISearchedAlbum = {
  albums: {
    href: string
    items: [
      {
        album: {
          album_type: string;
          artists: IArtists[];
          avaliable_markets: string[];
          href: string;
          id: string;
          name: string;
          release_date: string;
          total_tracks: number;
          type: string;
        };
        images: Image[];
        artists: IArtists[];
        avalaible_markets: string[];
        id: string;
        name: string;
        popularity: number;
        type: string;
      }
    ],
    next:string | null
    prev: string | null
    offset: number
  }
}

export type ISearchedPlaylist = {
  playlists: {
    href: string
    items: [
      {
        description: string
        href: string
        id: string
        images: Image[];
        name: string
        owner: {
          display_name: string
        }
        tracks: {
          total: number
        }
        type: string
      }
    ],
    next: string | null
    previous: string | null
    total: number
    offset: number
  }
}

export type IArtistType = {
    artists: {
        href: string;
        items: [
            {
                followers: { total: number }
                genres: string[]
                href: string
                id: string
                images: Image[]
                name: string
                popularity: number
                type: string
            }
        ]
    }
}

export type IDefaultTrack = {
  tracks: {
    href: string
    previous: string | null
    next: string | null
    items: [
      {
        album: {
          album_type: string
          artists: IArtists[]
          available_markets: string[]
          href: string
          id: string
          images: Image[]
          name: string
          release_date: string
          total_tracks: number
          type: string
        },
        artists: IArtists[]
        available_markets: string[]
        id: string
        name: string
        popularity: number
        type: string
      }
    ]
  }
}