import { BsFillCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <div className=" mb-[100px] fixed z-50 top-0 left-0 w-full px-4 py-4  ">
      <nav className="flex items-center justify-between ">
        <h1>logIn</h1>

        <Link to={"/"}>
          <label className=" font-semibold cursor-pointer">RX STUDIO</label>
        </Link>

        <div className="flex items-center gap-5">
          <Link className="flex gap-1 items-center cursor-pointer" to={"/cart"}>
            <BsFillCartFill />
            <span>{cartQuantity}</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
