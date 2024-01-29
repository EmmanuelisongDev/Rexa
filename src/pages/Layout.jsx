import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../components";

export default function Layout() {
  return (
    <div className="scroll-smooth">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
