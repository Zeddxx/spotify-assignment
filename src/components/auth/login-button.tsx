const AUTH_URI = 'https://accounts.spotify.com/authorize?client_id=3b04e348702d47f28c3fff0c6964e784&response_type=code&redirect_uri=http://localhost:5173/callback&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'

const LoginButton = () => {
  return (
    <a href={AUTH_URI}>
        Login to spotify
    </a>
  )
}
export default LoginButton