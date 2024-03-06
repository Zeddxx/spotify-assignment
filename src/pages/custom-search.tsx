import { useSelector } from "react-redux";
import { useGetDefaultSearchQuery } from "@/redux/apis/spotify-api";
import { RootState } from "@/redux/store";
import Pagination from "@/components/pagination";
import { cn } from "@/lib/utils";

const CustomSearch = () => {
  // Retrieving the token
  const { token } = useSelector((state: RootState) => state.token);
  // Retrieving utilities properties!
  const { offset, view: flexView, selectedCountries } = useSelector(
    (state: RootState) => state.selectUtility
  );

  // Default search to { track rock }
  const { data, isLoading, isError } = useGetDefaultSearchQuery({
    search: "rock",
    token: token,
    type: "track",
    offset: offset,
  });

  const filteredTracks = data?.tracks?.items?.filter((item) => {
    const availableCountries = item.available_markets || [];
    return selectedCountries.every((country) => availableCountries.includes(country))
  })

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold my-6">Default Recommendations</h1>
      </div>

      <div
        className={`grid ${
          flexView === "grid"
            ? "xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2"
            : "grid-cols-1"
        } gap-5 mt-4`}
      >
        {filteredTracks?.map((item) => (
          <div
            key={item.id}
            className={`${
              flexView === "grid" ? "h-auto" : "flex w-full gap-3"
            }`}
          >
            <div className={cn(
                  "bg-neutral-800 rounded-lg overflow-hidden flex-shrink-0",
                  flexView !== "grid" && "h-20 w-20"
                )}>
              <img
                src={item.album.images[0].url}
                alt={item.album.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="truncate">
              <h2 className="text-base font-semibold truncate">
                {item.album.name}
              </h2>
              <p className="text-sm font-medium text-muted-foreground">
                {item.album.type}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* I would have implemented this but i have my exam going onn! */}
      {data && (
        <Pagination
          isPrevious={!!data?.tracks.previous}
          isNext={!!data?.tracks.next}
        />
      )}
    </div>
  );
};
export default CustomSearch;
