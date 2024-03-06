import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { availableMarkets } from "@/constants";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import {
  addCountry,
  clearSelectedCountries,
  removeCountry,
} from "@/redux/utilities";
import { ChangeEvent } from "react";

const AvailableMarkets = () => {
  const dispatch = useDispatch();

  const { selectedCountries } = useSelector(
    (state: RootState) => state.selectUtility
  );

  /**
   * @reset will reset the selected countries filter to @empty []
   */
  const resetSelectedCountries = () => {
    dispatch(clearSelectedCountries());
  };

  /**
   * will store the selected countries into the state to filter them by market/countries.
   * @param event ChangeEvent<HTMLInputElement>
   */
  const handleCountryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const countryCode = event.target.value;
    if (selectedCountries.includes(countryCode)) {
      dispatch(removeCountry(countryCode));
    } else {
      dispatch(addCountry(countryCode));
    }
  };
  return (
    <Popover>
      <PopoverTrigger className="text-center w-full truncate hover:underline">
        Available Markets
      </PopoverTrigger>
      <PopoverContent className="w-[23rem]" align="start">
        <div className="grid grid-cols-5 gap-3 h-full mt-5 px-2 overflow-y-scroll max-h-96">
          {availableMarkets.map((countryCode, index) => (
            <div className="flex gap-2 group" key={index}>
              <input
                type="checkbox"
                id={countryCode}
                name="country"
                className=""
                value={countryCode}
                checked={selectedCountries.includes(countryCode)}
                onChange={handleCountryChange}
              />
              <label
                className={`text-sm ${
                  selectedCountries.includes(countryCode)
                    ? "text-black"
                    : "text-muted-foreground group-hover:text-muted-foreground/50"
                } font-medium duration-300  cursor-pointer`}
                htmlFor={countryCode}
              >
                {countryCode}
              </label>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          className="w-full rounded-md mt-3"
          onClick={resetSelectedCountries}
        >
          Reset
        </Button>
      </PopoverContent>
    </Popover>
  );
};
export default AvailableMarkets;
