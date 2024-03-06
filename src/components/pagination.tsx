/**
 * @pagination i made it work but not had time to do so.
 */

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setOffset } from "@/redux/utilities";

const Pagination = ({ isPrevious, isNext } : { isPrevious: boolean, isNext: boolean }) => {
  const { offset } = useSelector((state: RootState) => state.selectUtility);
  const dispatch = useDispatch();
    
  const handlePaginate = (type: "next" | "prev") => {
    if (type === "next") {
      dispatch(setOffset(offset + 20));
    } else if (type === "prev") {
      dispatch(setOffset(offset - 20));
    }
  };
  return (
    <div className="flex gap-4">
      <button disabled={!isNext} onClick={() => handlePaginate("next")}>Next</button>
      <button disabled={!isPrevious} onClick={() => handlePaginate("prev")}>Prev</button>
    </div>
  );
};
export default Pagination;
