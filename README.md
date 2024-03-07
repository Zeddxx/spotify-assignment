## Spotify UI Assignment

This is just an UI/UX of spotify, created with React, Typescript, Vite, Redux Management, Redux Toolkit Query, SpotifyAPI, ShadCN UI Library.

<hr />

# Features
- Use can search for tracks, artist, album, playlists.
- Custom view selection between
  - Grid (default).
  - List.
- Collapseable menu for mobile.
- Filter by popularity:
  - None (default).
  - High (above 70).
  - Medium (above 50 | below 70).
  - Low (above 30 | below 50).
- Different tags:
  - Albums.
  - Playlists.
  - Tracks.
  - Artists.

<hr />

# Installation

- Clone the repository
  
```bash
    git clone https://github.com/Zeddxx/spotify-assignment.git
```

- Go into the project

```bash
    cd spotify-assignment
```

- Install the ``npm`` package

```bash
    npm install
```
- Before running the project locally do this in `src/components/auth/login-button.tsx`
comment the deployed link and uncomment the `localhost` link
```bash
// const redirect_uri = "https://spotify-assignment-two.vercel.app/";
const redirect_uri = "http://localhost:5173/";
```

 - Run the project

```bash
    npm run dev
```

<hr />

# THANKYOU

<hr />
