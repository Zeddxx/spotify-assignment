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
import {
  setIsMenuOpen,
  setPopularity,
  setTrackTypes,
  setView,
} from "@/redux/utilities";
import { useDispatch } from "react-redux";
import { chooseTypes } from "@/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { LayoutGrid, LayoutList } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  // React hooks
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  // Redux State hooks
  const { token } = useSelector((state: RootState) => state.token);
  const { type: currentType, isMenuOpen } = useSelector(
    (state: RootState) => state.selectUtility
    );

  // Redux Query function
  const { data: user, error } = useGetUserProfileQuery(token!);

  // Deconstructing the pathname to get /search to trigger the filter buttons.
  const deconstructedPathname = "/" + pathname.split("/")[1];

  // If some error occurred push user to the login route.
  useEffect(() => {
    if (error) navigate("/login");
  }, [error, navigate]);

  /**
   * @default empty
   * @description This function will return the user's typed inputs!
   * @param event ChangeEvent<HTMLInputElemnet>
   */

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    if (event.target.value.trim()) {
      navigate(`/search/${event.target.value}`);
    } else {
      navigate(`/search`); // If search value is empty, navigate to /search without a query
    }
  };

  // This comments will helps when we hover into the function that are below this @comments!
  /**
   * @description Reducer to toggle the menu from the navbar
   * @type {boolean}
   */
  const handleOpen = () => {
    dispatch(setIsMenuOpen(!isMenuOpen));
  };

  /**
   * @default "Track"
   * @description Reducer to change the types of tracks
   * @types "Album" | "Track" | "Artist" | "Playlists"
   * @param type string
   */
  const handleChooseType = (type: string) => {
    dispatch(setTrackTypes(type));
  };

  /**
   * @default "none"
   * @description Reducer to change between the Popularities.
   * @types "None" | "High" | "Low" | "Medium"
   * @param popularity string
   */
  const handlePopularityChange = (popularity: string) => {
    dispatch(setPopularity(popularity));
  };

  /**
   * @default "Grid"
   * @description Reducer to change the View of tracks
   * @types "Grid" | "List"
   * @param view string
   */
  const handleView = (view: string) => {
    dispatch(setView(view));
  };

  return (
    <nav
      className={`sticky top-0 z-[999] py-4 bg-muted backdrop-blur-md w-full px-2`}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-x-3 items-center">
          {/* Menu toggler */}
          <Button
            size="icon"
            onClick={handleOpen}
            variant="outline"
            title="Open menu"
            className="grid flex-shrink-0 place-items-center md:hidden rounded-full"
          >
            <RxDoubleArrowRight
              className={`duration-300 ${
                isMenuOpen ? "-rotate-180" : "-rotate-0"
              }`}
            />
          </Button>

          {/* Dummy button */}
          <Button
            size="icon"
            title="Go Back"
            disabled
            variant="outline"
            className="rounded-full flex-shrink-0 duration-150 grid place-items-center"
          >
            <HiOutlineChevronLeft className="text-stone-500 h-5 w-5" />
          </Button>

          {/* will show the input only on /search routes or /search/:params */}
          {deconstructedPathname === "/search" ? (
            <div className="relative flex-shrink-0">
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
            // Dummy button
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

        {/* User Name first two letter @string */}
        <div className="">
          <Button variant="outline" size="icon" className="rounded-full">
            {user?.display_name.slice(0, 2).toUpperCase()}
          </Button>
        </div>
      </div>

      <div className="flex flex-col justify-between items-center">
        {/* Filters button { will only show if user searched something } */}
        {searchValue && (
          <div className="flex gap-3 flex-wrap mt-4 order-2">
            {chooseTypes.map((type) => (
              <Button
                size="sm"
                variant="outline"
                className={cn(
                  "px-7 rounded-full capitalize text-xs tracking-wide border font-semibold",
                  currentType === type.name &&
                    "bg-primary text-secondary hover:bg-primary/90 hover:text-white"
                )}
                onClick={() => handleChooseType(type.id)}
                key={type.id}
              >
                {type.name}
              </Button>
            ))}
          </div>
        )}

        {/* View Changer */}
        <div className="gap-4 mt-3 justify-between lg:justify-normal w-full items-center flex">
          <Select onValueChange={handleView}>
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

          {/* 
            * Will only show this popular filter only if user are in @track selected button
            * Would have implemented this to other section but i am having exams going on 🥲
          */}
          {currentType === "track" && (
            <Select onValueChange={handlePopularityChange}>
              <SelectTrigger>
                <SelectValue placeholder="Popularity" />
              </SelectTrigger>
              <SelectContent className="z-[9999]">
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
