import "./globals.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
// import Callback from "./pages/callback";
import Home from "./pages/home";
import Search from "./pages/search";
import RootLayout from "./_root/root-layout";
import CustomSearch from "./pages/custom-search";

const App = () => {
  return (
    <main className="h-max">
      <Routes>
        {/* Login route /login */}
        <Route element={<Login />} path="/login" />

        {/* 
          * Main routes or protected routes
          * Still not all route are protected.
        */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} path="/" />
          <Route element={<Search />} path="/search/:id" />
          <Route element={<CustomSearch />} path="/search" />
        </Route>
      </Routes>
    </main>
  );
};
export default App;
