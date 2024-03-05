import { Link, useLocation } from "react-router-dom";
import { NavList, availableMarkets } from "../../constants";
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addCountry, clearSelectedCountries, removeCountry } from "../../redux/pagination";

const LeftSideBar = () => {
  const { pathname } = useLocation();
  // const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const dispatch = useDispatch()
  const { selectedCountries } = useSelector((state: RootState) => state.setOffset)
  console.log({ selectedCountries });

  const handleCountryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const countryCode = event.target.value;
    if (selectedCountries.includes(countryCode)) {
      dispatch(removeCountry(countryCode));
    } else {
      dispatch(addCountry(countryCode));
    }
  };
  const constructPath /** will reconstruct the @types { /search } */ =
    "/" + pathname.split("/")[1];

  const resetSelectedCountries = () => {
   dispatch(clearSelectedCountries())
  }

  return (
    <aside className="max-w-xs sticky top-2 z-[9999] lg:max-w-md px-4 py-2 w-full flex-shrink-0">
      <div className="">
        <ul className="space-y-6 bg-stone-800/40 border border-stone-900 p-4 rounded-md">
          {NavList.map((item) => (
            <li
              key={item.name}
              className={`${
                constructPath === item.to
                  ? "text-white"
                  : "text-stone-400 hover:text-white duration-300 hover:underline"
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
        
        <div className="grid grid-cols-8 gap-3 h-full mt-5 px-2 overflow-y-scroll max-h-96">
          {availableMarkets.map((countryCode, index) => (
            <div className="flex gap-2 group" key={index}>
              <input
                type="checkbox"
                id={countryCode}
                name="country"
                value={countryCode}
                checked={selectedCountries.includes(countryCode)}
                onChange={handleCountryChange}
              />
              <label className={`text-sm ${selectedCountries.includes(countryCode) && 'text-white'} group-hover:text-white duration-300 text-stone-500`} htmlFor={countryCode}>{countryCode}</label>
            </div>
          ))}
        </div>
        <button className="w-full  bg-neutral-900 border border-stone-800 py-2 rounded-md mt-3" onClick={resetSelectedCountries}>reset</button>
      </div>
    </aside>
  );
};
export default LeftSideBar;
