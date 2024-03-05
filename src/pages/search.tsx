import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSearchQuery } from "../redux/apis/spotify-api";
import { RootState } from "../redux/store";
import ArtistTracks from "../components/artist-tracks";
import { useDispatch } from "react-redux";
import { setTrackTypes } from "../redux/pagination";
import { Button } from "@mui/material";
import { chooseTypes } from "../constants";

const Search = () => {
  const { id } = useParams();

  const { token } = useSelector((state: RootState) => state.token);
  const { type } = useSelector((state: RootState) => state.setOffset);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetSearchQuery({
    search: id!,
    token: token,
    type: type,
  });

  const handleChooseType = (type: string) => {
    dispatch(setTrackTypes(type));
  };

  console.log({ data, type });

  useEffect(() => {
    if (!token) navigate("/login");
  }, [navigate, token]);

  if (isLoading) {
    return <p>Loading query</p>;
  }

  if (isError) return <p>Error</p>;
  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="flex gap-4">
        {chooseTypes.map((type) => (
          <Button onClick={() => handleChooseType(type.id)} key={type.id}>
            {type.name}
          </Button>
        ))}
      </div>

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
            <ArtistTracks token={token!} artistId={data?.artists?.items[0]?.id} />
          )}
        </>
      )}

      {type === "track" &&
        data && (
          <div className="grid grid-cols-5 gap-5">
            {data?.tracks?.items?.map((item) => (
          <div className="" key={item.id}>
            <div className="bg-neutral-800">
              <img src={item.album.images[0].url} alt={item.album.name} className="h-full w-full object-contain" />
            </div>
            <h3 className="text-base truncate mt-3">{item.name}</h3>
            <p className="text-sm text-stone-400 capitalize">{item.type}</p>
          </div>
        ))}
          </div>
        )}

      {type === "album" &&
        !isLoading && !!data && (
          <div className="grid grid-cols-5 gap-5">
            {data?.albums?.items?.map((item) => (
          <div className="" key={item.id}>
            <div className="bg-neutral-800">
              <img src={item.images[0]?.url} alt={item.name} />
            </div>
            <h3 className="text-base truncate mt-3">{item?.name}</h3>
            <p className="text-sm text-stone-400 capitalize">{item.type}</p>
          </div>
        ))}
          </div>
        )}

      {type === "playlist" &&
        !isLoading && !!data && (
          <div className="grid grid-cols-5 gap-5">
            {data?.playlists?.items?.map((item) => (
          <div className="w-full" key={item.id}>
            <div className="bg-neutral-800">
              <img src={item.images[0].url} alt={item.name} />
            </div>
            <h3 className="text-base truncate mt-3">{item.name}</h3>
            {/* <p className="truncate">{item.description}</p> */}
            <p className="text-sm text-stone-400 capitalize">{item.type}</p>
          </div>
        ))}
          </div>
        )}
    </div>
  );
};
export default Search;
