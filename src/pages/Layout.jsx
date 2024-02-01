import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../components";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
