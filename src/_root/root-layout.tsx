import { Outlet } from "react-router-dom";
import LeftSideBar from "../components/sidebar/left-sidebar";
// import { useSelector } from "react-redux";
import Navbar from "../components/navbar";
// import { RootState } from "../redux/root-state";

const RootLayout = () => {
  // const { token } = useSelector((state: RootState) => state.token);


  return (
    <div className="flex w-full relative">
      <div className="max-w-xs lg:max-w-md w-full flex-shrink-0">
        <LeftSideBar />
      </div>
      <section className="h-full relative w-full rounded-md overflow-x-hidden">
        <div className="bg-gradient-to-b top-4 from-neutral-800 to-black/50 rounded-md absolute left-0 w-full h-96 -z-10" />
        {/* <header className={`sticky ${scrolled ? 'bg-black' : 'bg-transparent'} top-0 z-[9999] left-0 py-4 inset-0`}> */}
          <Navbar />
        {/* </header> */}
        <div className="overflow-hidden relative rounded-md px-2">
          <Outlet />
        </div>
      </section>
    </div>
  );
};
export default RootLayout;
