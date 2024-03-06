import { cn } from "@/lib/utils";
import { useGetArtistTopTracksQuery } from "../redux/apis/spotify-api";

/**
 * @description if the search is related to the artist then this will send an artistId into the other component from where i am finding the tracks of the particular artist from their id.
 * From the artistId a list of the artist popular tracks will show.
 * @type { Array }
 * @param artistId: string
 * @param token: string
 * @param flexView: string
 */
const ArtistTracks = ({
  artistId,
  token,
  flexView,
}: {
  artistId: string;
  token: string;
  flexView: string;
}) => {
  const { data, isLoading } = useGetArtistTopTracksQuery({
    artistId: artistId,
    token: token,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="px-3 my-7">
      <h2 className="text-2xl font-semibold">Best Artist tracks</h2>
      <div
        className={`grid ${
          flexView === "grid"
            ? "xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2"
            : "grid-cols-1"
        } gap-5 mt-4`}
      >
        {data?.tracks.map((item) => (
          <div
            className={`${
              flexView === "grid" ? "" : "max-h-40 flex w-full gap-2"
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
                className="w-fit h-full object-contain"
                src={item.album.images[0].url}
                alt={item.name}
              />
            </div>
            <div className="truncate">
              <h3 className="text-base mt-3 truncate">{item.name}</h3>
              <p className="text-sm text-stone-400 capitalize">{item.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ArtistTracks;
