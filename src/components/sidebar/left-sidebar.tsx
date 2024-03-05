import { Link, useLocation } from "react-router-dom";
import { NavList } from "../../constants";

const LeftSideBar = () => {
  const { pathname } = useLocation()
  const constructPath /** will reconstruct the @types { /search } */ = '/' + pathname.split('/')[1];
  
  return (
    <aside className="max-w-xs sticky top-2 z-[9999] lg:max-w-md px-4 py-2 w-full flex-shrink-0">
      <div className="">
        <ul className="space-y-6 bg-stone-800/40 border border-stone-900 p-4 rounded-md">
          {NavList.map((item) => (
            <li key={item.name} className={`${constructPath === item.to ? 'text-white' : 'text-stone-400 hover:text-white duration-300 hover:underline'}`}>
              <Link to={item.to} className="flex items-center w-fit font-medium text-base">
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
      </div>
    </aside>
  );
};
export default LeftSideBar;
