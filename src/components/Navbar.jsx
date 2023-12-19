import { BsFillCartFill } from "react-icons/bs";
import { MdNightlightRound } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useStateContext } from "../StateContext.jsx";

function Navbar() {
  const [darkMode, setDarkMode] = useState(true);

  const { totalQuantities } = useStateContext();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
    }
  });

  return (
    <div className=" mb-[100px] ">
      <nav className="flex items-center justify-between ">
        <Link to={"/"}>
          <label className="font-black cursor-pointer">REXA</label>
        </Link>

        <div className="flex items-center gap-5">
          <Link className="flex gap-1 items-center cursor-pointer" to={"/cart"}>
            <BsFillCartFill />
            <span>{totalQuantities}</span>
          </Link>

          <div
            className=" cursor-pointer"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <MdNightlightRound /> : <CiLight />}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
