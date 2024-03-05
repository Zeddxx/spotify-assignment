import { useEffect } from "react";
import {
  useGetUserPlaylistQuery,
} from "../redux/apis/spotify-api";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/token";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/root-state";

const Home = () => {
  const { token } = useSelector((state: RootState) => state.token);
  const {
    data: featured,
    isLoading: isPlaylistLoading,
    error,
  } = useGetUserPlaylistQuery(token!);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isPlaylistLoading) {
      if (error) {
        dispatch(setToken(""));
        navigate("/login");
      }
    }
    return;
  }, [error, dispatch, isPlaylistLoading, navigate]);
  return (
    <div className="px-2 mt-6">
      <div className="flex items-center justify-between">
      <h1 className="text-xl font-semibold underline">Try something new!</h1>
      <p className="text-xs font-semibold text-stone-300">Show all</p>
      </div>
      <div className="flex w-full overflow-hidden gap-5 my-4">
        {featured?.playlists.items.slice(0, 5).map((item) => (
          <div className="bg-neutral-900 flex-shrink-0 flex flex-col w-[calc(100%/5-20px)] min-w-[12rem] min-h-[16rem] max-h-[12rem] hover:bg-neutral-800 duration-300 rounded-md p-4 overflow-hidden" key={item.id}>
            <div className="w-full rounded-md h-40">
              <img
              className="object-contain mx-auto w-full h-full"
                src={item.images[0].url}
                alt={item.name}
              />
            </div>
            <div className="h-full w-full">
            <h2 className="font-semibold mt-4">{item.name}</h2>
            <p className="text-xs text-stone-400 font-medium">
              {item.description.length > 40 ? item.description.slice(0, 40) + '...' : item.description}
            </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
