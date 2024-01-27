import { Outlet, useNavigation } from "react-router-dom";

import { Footer, Navbar } from "../components";

export default function Layout() {
  const navigate = useNavigation();
  return (
    <div className=" scroll-smooth">
      <Navbar />
      <main>
        {navigate === "loading" ? (
          <p className="h-screen w-full bg-black">Loading...</p>
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
    </div>
  );
}