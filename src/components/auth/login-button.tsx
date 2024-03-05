const handleClick = async () => {
  const client_id = "3b04e348702d47f28c3fff0c6964e784";
  const redirect_uri = "https://spotify-assignment-two.vercel.app/";
  const api_uri = "https://accounts.spotify.com/authorize";
  const scope = [
    "user-read-private",
    "user-read-email",
    "user-modify-playback-state",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-top-read",
  ];
  window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
    " "
  )}&response_type=token&show_dialog=true`;
};

const LoginButton = () => {
  return (
    <button onClick={handleClick}>
      login
    </button>
  )
};
export default LoginButton;
