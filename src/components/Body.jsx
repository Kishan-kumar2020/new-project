import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Body = () => {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Navbar />
      <main className="p-4 flex justify-center items-start">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
