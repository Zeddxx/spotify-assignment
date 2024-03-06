import { cn } from "@/lib/utils";
import { useGetUserPlaylistQuery } from "@/redux/apis/spotify-api";
import { RootState } from "@/redux/store";
import { setToken } from "@/redux/token";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FeaturedPlaylists = () => {
  const { isMenuOpen, view } = useSelector((state: RootState) => state.selectUtility);
  const { token } = useSelector((state: RootState) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: featured,
    isLoading: isPlaylistLoading,
    error,
  } = useGetUserPlaylistQuery(token!);

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
    <div className="w-full">
      <h1 className="text-xl font-semibold underline">Try something new!</h1>
      <p className="text-xs font-semibold text-stone-300">Show all</p>
      <div
        className={cn(
          "grid w-full overflow-hidden gap-5 my-4",
          isMenuOpen
            ? view === 'grid' ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : 'grid-cols-1'
            :  view === 'grid' ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4" : 'grid-cols-1'
        )}
      >
        {featured?.playlists.items.map((item) => (
          <div className={cn(
            "bg-slate-50 p-2 rounded-lg w-full",
            view !== 'grid' && 'flex gap-x-3'
          )} key={item.id}>
            <div className={cn(
                "w-full rounded-md overflow-hidden flex-shrink-0",
                view === 'grid' ? 'h-52' : 'h-20 w-20'
            )}>
              <img
                className="object-cover mx-auto w-full h-full"
                src={item.images[0].url}
                alt={item.name}
              />
            </div>
            <div className="h-full w-full truncate">
              <h2 className="font-semibold dark:text-primary">
                {item.name}
              </h2>
              <p className="text-xs text-muted-foreground truncate font-medium">
                  {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FeaturedPlaylists;
