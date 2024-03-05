import { useSelector } from "react-redux";
import { useGetDefaultSearchQuery } from "../redux/apis/spotify-api";
import { RootState } from "../redux/store";
import Pagination from "../components/pagination";

const CustomSearch = () => {
  const { token } = useSelector((state: RootState) => state.token);
  const { offset } = useSelector((state: RootState) => state.setOffset);
  const { data, isLoading, isError } = useGetDefaultSearchQuery({
    search: "rock",
    token: token,
    type: "track",
    offset: offset,
  });

  if(isLoading) {
    return <p>Loading...</p>
  }

  if(isError) {
    return <p>Error</p>
  }

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold my-6">Default Recommendations</h1>
        <select name="grid" id="grid">
          <option value="grid">Grid</option>
          <option value="list">List</option>
        </select>
      </div>

      <div className="grid grid-cols-5 gap-5">
        {data?.tracks.items.map((item) => (
          <div key={item.id} className="p-2 bg-black rounded-lg">
            <div className="rounded-lg overflow-hidden">
              <img
                src={item.album.images[0].url}
                alt={item.album.name}
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="mt-3 text-base text-stone-200 truncate">
              {item.album.name}
            </h2>
            <p className="text-sm font-semibold text-stone-400">
              {item.album.type}
            </p>
          </div>
        ))}
      </div>

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
