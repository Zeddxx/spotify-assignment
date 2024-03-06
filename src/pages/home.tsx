import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/token";
import FeaturedPlaylists from "@/components/featured-playlists";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      if (token) {
        dispatch(setToken(token));
      }
    }
    document.title = "Spotify";
  }, [dispatch]);

  return (
    <div className="px-2 mt-6">
      <div className="flex items-center w-full justify-between">
        <FeaturedPlaylists />
      </div>
    </div>
  );
};
export default Home;
