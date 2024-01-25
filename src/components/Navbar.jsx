import { BsFillCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <div className="  mix-blend-difference   mb-[100px] fixed z-[100] top-0 left-0 w-full px-5 py-4  ">
      <nav className="flex items-center justify-between ">
        <h1 className="text-white">logIn</h1>

        <Link to={"/"}>
          <label className=" font-semibold cursor-pointer text-white">
            RX STUDIO
          </label>
        </Link>

        <div className="flex items-center gap-5">
          <Link
            className="flex gap-1 text-white items-center cursor-pointer"
            to={"/cart"}
          >
            <BsFillCartFill />
            <span>{cartQuantity}</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
