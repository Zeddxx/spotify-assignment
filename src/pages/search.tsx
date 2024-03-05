import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSearchQuery } from "../redux/apis/spotify-api";
import { RootState } from "../redux/store";
import ArtistTracks from "../components/artist-tracks";

const Search = () => {
  const { id } = useParams();

  const { token } = useSelector((state: RootState) => state.token);
  const { type, view: flexView, selectedCountries } = useSelector(
    (state: RootState) => state.setOffset
  );

  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetSearchQuery({
    search: id!,
    token: token,
    type: type,
  });

  console.log({ data, type });

  useEffect(() => {
    if (!token) navigate("/login");
  }, [navigate, token]);

  if (isLoading) {
    return <p>Loading query</p>;
  }

  if (isError) return <p>Error</p>;

  // const highPopularity = data?.tracks.items.filter(track => track.popularity > 70);
  // const medPopularity = highPopularity ? data?.tracks.items.filter(track => track.popularity > 50) : []
  // const lowPopularity = medPopularity ? data?.tracks.items.filter(track => track.popularity > 30) : []

  const filteredTracks = data?.tracks?.items?.filter((item) => {
    const availableCountries = item.available_markets || [];
    return selectedCountries.every((country) => availableCountries.includes(country))
  })

  // console.log({ highPopularity, medPopularity, lowPopularity });
  
  return (
    <div className="max-w-screen-2xl h-auto mx-auto">
      {type === "artist" && (
        <>
          <div className="">
            {data && (
              <div className="py-2 px-2 mt-4">
                <h1 className="font-bold text-2xl mb-3">Top result</h1>
                <div className="bg-black rounded-lg px-4 flex flex-col items-center py-6 h-64 max-w-[14rem]">
                  <div className="h-28 w-28 rounded-full overflow-hidden">
                    <img
                      src={data?.artists?.items[0]?.images[0].url}
                      className="h-full w-full object-cover"
                      alt={data?.artists?.items[0]?.name}
                    />
                  </div>
                  <h2 className="text-xl font-bold mt-4">
                    {data?.artists?.items[0]?.name}
                  </h2>
                  <p className="text-xs font-semibold  capitalize text-stone-400">
                    {data?.artists?.items[0]?.type}
                  </p>
                </div>
              </div>
            )}
          </div>
          {data && (
            <ArtistTracks
              flexView={flexView}
              token={token!}
              artistId={data?.artists?.items[0]?.id}
            />
          )}
        </>
      )}

      {type === "track" && data && (
        <div
          className={`grid ${
            flexView === "grid"
              ? "xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2"
              : "grid-cols-1"
          } gap-5 mt-4`}
        >
          {filteredTracks?.map((item) => (
            <div
              className={`${
                flexView === "grid" ? "" : "max-h-40 flex w-full gap-2"
              }`}
              key={item.id}
            >
              <div className="bg-neutral-800 rounded-lg overflow-hidden">
                <img
                  src={item.album.images[0].url}
                  alt={item.album.name}
                  className="h-full w-fit object-contain"
                />
              </div>
              <div className="">
                <h3 className="text-base truncate">{item.name}</h3>
                <p className="text-sm text-stone-400 capitalize">{item.type}</p>
              </div>
            </div>
          ))}
        </div>
      )}

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
              className={`${
                flexView === "grid" ? "" : "max-h-40 flex w-full gap-2"
              }`}
              key={item.id}
            >
              <div className="bg-neutral-800 rounded-lg overflow-hidden">
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
              <div className={`bg-neutral-800 rounded-lg overflow-hidden max-h-52 h-full ${flexView !== 'grid' && 'min-w-52'} min-h-52`}>
                <img className="w-full h-full object-cover" src={item.images[0].url} alt={item.name} />
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
