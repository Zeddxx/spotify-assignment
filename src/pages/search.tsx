import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSearchQuery } from "@/redux/apis/spotify-api";
import { RootState } from "@/redux/store";
import ArtistTracks from "@/components/artist-tracks";
import { cn } from "@/lib/utils";

const Search = () => {
  // Destructuring the #ID from the params search/{:id}
  const { id } = useParams();
  const navigate = useNavigate();

  // Retrieving the token from the redux state
  const { token } = useSelector((state: RootState) => state.token);

  // Some utils to change some items into the list!
  const {
    type,
    view: flexView,
    selectedCountries,
    popularityMode,
  } = useSelector((state: RootState) => state.selectUtility);

  const { data, isLoading, isError } = useGetSearchQuery({
    search: id!,
    token: token,
    type: type,
  });

  useEffect(() => {
    // No token will push the user to /login
    if (!token) navigate("/login");
  }, [navigate, token]);

  if (isLoading) {
    return <p>Loading query</p>;
  }

  if (isError) return <p>Error</p>;

  /**
   * @description Filtering the tracks which are getting from the spotify api.
   * will put an new item into every item as @name popularityLevel which will be of type string
   * item.popularity > 70 will set the the popularity to "High".
   * item.popularity > 50 will set the the popularity to "Medium".
   * item.popularity > 30 will set the the popularity to "low".
   * @enum "High" | "Medium" | "Low" | "None"
   */
  const filteredTracks = data?.tracks?.items
    .map((item) => {
      const popularity = item.popularity;
      if (popularity > 70) {
        return { ...item, popularityLevel: "high" };
      } else if (popularity > 50) {
        return { ...item, popularityLevel: "medium" };
      } else if (popularity > 30) {
        return { ...item, popularityLevel: "low" };
      } else if (popularity !== undefined) {
        return { ...item, popularityLevel: "none" };
      } else {
        return item;
      }
    })
    // Filtering those filtered popularity items with selected markets | countries
    .filter((item) => {
      const availableCountries = item?.available_markets || [];
      return selectedCountries.every((country) =>
        availableCountries.includes(country)
      );
    });

  /**
   * @readonly Triggers those items which user had choosed from the popularity selection and put them into a new array.
   * @type {Array}
   */
  const finalFilteredTracks =
    popularityMode === "none"
      ? filteredTracks
      : filteredTracks?.filter(
          (item) => item.popularityLevel === popularityMode
        );

  console.log({ finalFilteredTracks });

  return (
    <div className="max-w-screen-2xl mx-auto px-2 overflow-hidden">
      {/* If selected button is artist this mapped items will show */}
      {type === "artist" && (
        <>
          <div className="">
            {data && (
              <div className="py-2 px-2 mt-4">
                <h1 className="font-bold text-2xl mb-3">Top result</h1>
                <div className="bg-muted border rounded-lg px-4 flex flex-col items-center py-6 h-64 max-w-[14rem]">
                  <div
                    className={cn(
                      "rounded-full overflow-hidden flex-shrink-0 h-32 w-32"
                    )}
                  >
                    <img
                      src={data?.artists?.items[0]?.images[0].url}
                      className="h-full w-full object-cover"
                      alt={data?.artists?.items[0]?.name}
                    />
                  </div>
                  <h2 className="text-2xl font-bold mt-4">
                    {data?.artists?.items[0]?.name}
                  </h2>
                  <p className="text-sm font-semibold  capitalize text-stone-400">
                    {data?.artists?.items[0]?.type}
                  </p>
                </div>
              </div>
            )}
          </div>
          {/* Hover the component */}
          {data && (
            <ArtistTracks
              flexView={flexView}
              token={token!}
              artistId={data?.artists?.items[0]?.id}
            />
          )}
        </>
      )}

      {/* Will show the searched queries tracks if(type === 'track') */}
      {type === "track" && data && (
        <div
          className={`grid ${
            flexView === "grid"
              ? "xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2"
              : "grid-cols-1"
          } gap-5 mt-4`}
        >
          {/* Mapping the filteredTracks */}
          {finalFilteredTracks?.map((item) => (
            <div
              className={`${flexView === "grid" ? "" : "flex w-full gap-x-2"}`}
              key={item.id}
            >
              <div
                className={cn(
                  "bg-neutral-800 rounded-lg overflow-hidden flex-shrink-0",
                  flexView !== "grid" && "h-20 w-20"
                )}
              >
                <img
                  src={item.album.images[0].url}
                  alt={item.album.name}
                  className="h-full w-fit object-contain"
                />
              </div>
              <div className="truncate">
                <h3 className="text-base truncate">{item.name}</h3>
                <p className="text-sm text-stone-400 capitalize">{item.type}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Albums container */}
      {type === "album" && !isLoading && !!data && (
        <div
          className={`grid ${
            flexView === "grid"
              ? "xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2"
              : "grid-cols-1"
          } gap-5 mt-4`}
        >
          {data?.albums?.items?.map((item) => (
            <div
              className={cn(
                flexView === "grid" ? "" : "max-h-40 flex w-full gap-2"
              )}
              key={item.id}
            >
              <div
                className={cn(
                  "bg-neutral-800 rounded-lg overflow-hidden flex-shrink-0",
                  flexView !== "grid" && "h-20 w-20"
                )}
              >
                <img
                  src={item.images[0]?.url}
                  alt={item.name}
                  className="w-fit h-full"
                />
              </div>
              <div className="">
                <h3 className="text-base truncate mt-3">{item?.name}</h3>
                <p className="text-sm text-stone-400 capitalize">{item.type}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Playlists container */}
      {type === "playlist" && !isLoading && !!data && (
        <div
          className={`grid ${
            flexView === "grid"
              ? "xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2"
              : "grid-cols-1"
          } gap-5 mt-4`}
        >
          {data?.playlists?.items?.map((item) => (
            <div
              className={`${
                flexView === "grid" ? "h-auto" : "flex w-full gap-3"
              }`}
              key={item.id}
            >
              <div
                className={cn(
                  "bg-neutral-800 rounded-lg overflow-hidden flex-shrink-0",
                  flexView !== "grid" && "h-20 w-20"
                )}
              >
                <img
                  className="w-full h-full object-cover"
                  src={item.images[0].url}
                  alt={item.name}
                />
              </div>
              <div className="truncate">
                <h3 className="text-base truncate mt-3">{item.name}</h3>
                {/* <p className="truncate">{item.description}</p> */}
                <p className="text-sm text-stone-400 capitalize">{item.type}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Search;
