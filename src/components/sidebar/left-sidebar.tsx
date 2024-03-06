import { Link, useLocation } from "react-router-dom";
import { NavList } from "../../constants";
import AvailableMarkets from "../markets/available-markets";

const LeftSideBar = () => {
  const { pathname } = useLocation();

  const constructPath /** will reconstruct the @types { /search } */ =
    "/" + pathname.split("/")[1];


  return (
    <aside className="max-w-xs sticky overflow-x-hidden top-2 left-0 z-[9999] lg:max-w-md px-4 py-2 w-full flex-shrink-0">
      <div className="">
        <ul className="space-y-6 border border-muted bg-slate-50 p-4 rounded-md">
          {NavList.map((item) => (
            <li
              key={item.name}
              className={`${
                constructPath === item.to
                  ? "text-black hover:underline"
                  : "text-muted-foreground hover:text-black duration-300 hover:underline"
              }`}
            >
              <Link
                to={item.to}
                className="flex items-center w-fit font-medium text-base"
              >
                {constructPath === item.to ? (
                  <item.activeIcon className="mr-5 h-7 w-7" />
                ) : (
                  <item.inactiveIcon className="mr-5 h-7 w-7" />
                )}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        
        {/* Filter The tracks by Available Markets/country */}
        <div className="my-4">
          <AvailableMarkets />
        </div>

        <div className="mt-4">
          <p className="text-muted-foreground truncate text-center text-sm">Market filter only works for searched tracks.</p>
        </div>
      </div>
    </aside>
  );
};
export default LeftSideBar;
