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

const Navbar = () => {
  const { pathname } = useLocation();
  const deconstructedPathname = '/' + pathname.split('/')[1]
  const { token } = useSelector((state: RootState) => state.token);
  const { type } = useSelector((state: RootState) => state.setOffset)
  const [searchValue, setSearchValue] = useState("");
  const { data: user, error } = useGetUserProfileQuery(token!);
  
  const navigate = useNavigate();
  console.log({ type });

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

  return (
    <nav className={`flex justify-between sticky top-0 z-[999] items-center h-16 rounded-tr-md rounded-tl-md bg-black/20 backdrop-blur-md px-2`}>
      <div className="flex gap-x-3 items-center">
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
    </nav>
  );
};
export default Navbar;
