/**
 * @readonly A dummy featured playlist for the home section not much here!
 */

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/token";
import FeaturedPlaylists from "@/components/featured-playlists";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Searching for hash token we will get something like #access_token from the params
    const hash = window.location.hash;

    if (hash) {
      /**
       * @if hash is there, @example hash=#access_token=snadjabwbeqwoe...
       * @then substring will cutout the # from the hash value we have by coosing the entry as 1,
       * @then spliting it by & after which we will get an array of strings seprated by & @returns {[ access_token, token_type, expires_in ]}
       * @then we are choosing the first from the array which is @access_token=sadrwretwtw....
       * @then spliting them by = which will @return [access_access, sdawqweqweq...]
       * @then choosing the [1] which is adsdasdqweqew the token.
       */
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
