/**
 * @Brief A Layout for the project everything will work below this layout.
 * As i love writing NextJs Layout i found this thing a bit of similar to that.
 */

import { Outlet } from "react-router-dom";
import LeftSideBar from "@/components/sidebar/left-sidebar";
import Navbar from "@/components/navbar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { cn } from "@/lib/utils";

const RootLayout = () => {
  const { isMenuOpen } = useSelector((state: RootState) => state.selectUtility);
  return (
    <div className="flex w-full">
      <section className="h-max flex relative w-full rounded-md pt-2">
        <div
          className={cn("max-w-xs sticky top-0 h-full left-0 lg:max-w-sm flex-shrink-0 duration-300",
            isMenuOpen ? "w-full" : "w-0 md:w-full"
          )}
        >
          <LeftSideBar />
        </div>
        <div className="h-max w-full">
          <Navbar />
          <div className="h-max">
            <Outlet />
          </div>
        </div>
      </section>
    </div>
  );
};
export default RootLayout;
