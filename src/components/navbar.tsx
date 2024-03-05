import { useLocation, useNavigate } from "react-router-dom";
import {
  HiOutlineChevronLeft,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import IconButton from "./icon-button";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useGetUserProfileQuery } from "../redux/apis/spotify-api";
import { ChangeEvent, useEffect, useState } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { RxDoubleArrowRight } from "react-icons/rx";
import { setIsMenuOpen, setTrackTypes, setView } from "../redux/pagination";
import { useDispatch } from "react-redux";
import { chooseTypes } from "../constants";

const Navbar = () => {
  const { pathname } = useLocation();
  const deconstructedPathname = "/" + pathname.split("/")[1];
  const { token } = useSelector((state: RootState) => state.token);
  const { type: currentType } = useSelector(
    (state: RootState) => state.setOffset
  );
  const [searchValue, setSearchValue] = useState("");
  const { data: user, error } = useGetUserProfileQuery(token!);
  const { isMenuOpen } = useSelector((state: RootState) => state.setOffset);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) navigate("/login");
  }, [error, navigate]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    if (event.target.value.trim()) {
      navigate(`/search/${event.target.value}`);
    } else {
      navigate(`/search`); // If search value is empty, navigate to /search without a query
    }
  };

  const handleOpen = () => {
    dispatch(setIsMenuOpen(!isMenuOpen));
  };

  const handleChooseType = (type: string) => {
    dispatch(setTrackTypes(type));
  };

  const handleView = (view: string) => {
    dispatch(setView(view));
  };

  return (
    <nav
      className={`sticky top-0 z-[999] py-4 rounded-tr-md rounded-tl-md bg-black backdrop-blur-md px-2`}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-x-3 items-center">
          <IconButton
            type="icon"
            onClick={handleOpen}
            title="Open menu"
            className="p-2 block md:hidden hover:bg-stone-800"
          >
            <RxDoubleArrowRight
              className={`duration-300 ${
                isMenuOpen ? "-rotate-180" : "-rotate-0"
              }`}
            />
          </IconButton>
          <IconButton
            type="icon"
            title="Go Back"
            className="hover:bg-stone-900/60 bg-black/20 p-2 rounded-full duration-150 h-fit"
          >
            <HiOutlineChevronLeft className="text-stone-500 h-5 w-5" />
          </IconButton>
          {deconstructedPathname === "/search" ? (
            <div className="relative">
              <input
                value={searchValue}
                onChange={handleSearchChange}
                className="rounded-full peer h-11 bg-stone-800 text-sm pl-10"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 peer-focus:text-white">
                <HiOutlineMagnifyingGlass className="h-5 w-5 text-white/50" />
              </span>
            </div>
          ) : (
            <IconButton
              type="icon"
              disabled
              className="hover:bg-stone-900/60 bg-black/20 p-2 rounded-full duration-150 h-fit"
            >
              <HiOutlineChevronRight className="text-stone-500 h-5 w-5" />
            </IconButton>
          )}
        </div>

        <div className="">
          <div className="rounded-full h-10 w-10 bg-purple-800 grid place-items-center">
            {user?.display_name.slice(0, 2).toUpperCase()}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        {searchValue && (
          <div className="flex gap-3 flex-wrap mt-4">
            {chooseTypes.map((type) => (
              <IconButton
                type="button"
                className={`px-7 py-2 rounded-full capitalize text-xs tracking-wide border font-semibold border-stone-800 ${
                  currentType === type.name
                    ? "bg-white text-black hover:bg-gray-100"
                    : "bg-neutral-900 hover:bg-neutral-900/50"
                }`}
                onClick={() => handleChooseType(type.id)}
                key={type.id}
              >
                {type.name}
              </IconButton>
            ))}
          </div>
        )}

        <div className="flex gap-4">
          {currentType === "track" && <p>Popularity</p>}
          <select
            name="view"
            onChange={(e) => handleView(e.target.value)}
            id="view"
          >
            <option value="grid">Grid</option>
            <option value="list">List</option>
          </select>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
