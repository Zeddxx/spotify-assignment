import { useLocation, useNavigate } from "react-router-dom";
import {
  HiOutlineChevronLeft,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetUserProfileQuery } from "@/redux/apis/spotify-api";
import { ChangeEvent, useEffect, useState } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { RxDoubleArrowRight } from "react-icons/rx";
import { setIsMenuOpen, setTrackTypes, setView } from "@/redux/utilities";
import { useDispatch } from "react-redux";
import { chooseTypes } from "@/constants";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { LayoutGrid, LayoutList } from "lucide-react";

const Navbar = () => {
  const { pathname } = useLocation();
  const deconstructedPathname = "/" + pathname.split("/")[1];
  const { token } = useSelector((state: RootState) => state.token);
  const { type: currentType, isMenuOpen } = useSelector(
    (state: RootState) => state.selectUtility
  );
  const [searchValue, setSearchValue] = useState("");
  const { data: user, error } = useGetUserProfileQuery(token!);
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
      className={`sticky top-0 z-[999] py-4 bg-muted backdrop-blur-md w-full px-2`}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-x-3 items-center">
          <Button
            size="icon"
            onClick={handleOpen}
            variant="outline"
            title="Open menu"
            className="grid place-items-center md:hidden rounded-full"
          >
            <RxDoubleArrowRight
              className={`duration-300 ${
                isMenuOpen ? "-rotate-180" : "-rotate-0"
              }`}
            />
          </Button>
          <Button
            size="icon"
            title="Go Back"
            disabled
            variant="outline"
            className="rounded-full duration-150 grid place-items-center"
          >
            <HiOutlineChevronLeft className="text-stone-500 h-5 w-5" />
          </Button>
          {deconstructedPathname === "/search" ? (
            <div className="relative">
              <Input
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Search artist track.."
                className="rounded-full text-sm pl-10"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                <HiOutlineMagnifyingGlass className="h-5 w-5 text-muted-foreground" />
              </span>
            </div>
          ) : (
            <Button
              size="icon"
              disabled
              variant="outline"
              className="rounded-full duration-150 grid place-items-center"
            >
              <HiOutlineChevronRight className="text-stone-500 h-5 w-5" />
            </Button>
          )}
        </div>

        <div className="">
          <div className="rounded-full h-10 w-10 bg-purple-800 grid place-items-center">
            {user?.display_name.slice(0, 2).toUpperCase()}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between items-center">
        {searchValue && (
          <div className="flex gap-3 flex-wrap mt-4 order-2">
            {chooseTypes.map((type) => (
              <Button
              size="sm"
              variant="outline"
                className={`px-7 rounded-full capitalize text-xs tracking-wide border font-semibold ${
                  currentType === type.name
                    ? "bg-primary text-secondary hover:bg-primary/90 hover:text-white"
                    : ""
                }`}
                onClick={() => handleChooseType(type.id)}
                key={type.id}
              >
                {type.name}
              </Button>
            ))}
          </div>
        )}

        <div className="gap-4 mt-3 justify-between lg:justify-normal w-full items-center flex">
          <Select
          onValueChange={handleView}
          >
            <SelectTrigger className="w-[8rem] z-[9999]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent align="end" className="z-[9999]">
              <SelectItem value="grid">
              <span className="flex items-center font-semibold">
              <LayoutGrid className="h-4 w-5 mr-1" />
                Grid
              </span>
              </SelectItem>
              <SelectItem value="List">
              <span className="flex items-center font-semibold">
              <LayoutList className="h-4 w-5 mr-1" />
                List
              </span>
              </SelectItem>
            </SelectContent>
          </Select>
        {currentType === "track" && <p>Popularity</p>}
        </div>

      </div>
    </nav>
  );
};
export default Navbar;
