import { BsFillCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../store/ui-slice";
import Cart from "./Cart";
import { HiOutlineXCircle } from "react-icons/hi";

function Navbar() {
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const showCart = useSelector((state) => state.ui.cartIsVisible);

  function handleShowHideCart() {
    dispatch(uiActions.toggle());
  }

  return (
    <>
      <div className="  mix-blend-difference   mb-[100px] fixed z-[100] top-0 left-0 w-full px-5 py-4  ">
        <nav className="flex items-center justify-between ">
          <h1 className="text-white">logIn</h1>

          <Link to={"/"}>
            <label className=" font-black cursor-pointer text-white">
              RX STUDIO
            </label>
          </Link>

          <button
            onClick={handleShowHideCart}
            className="flex text-white items-center gap-1 cursor-pointer"
          >
            {showCart ? <HiOutlineXCircle /> : <BsFillCartFill />}
            <span>{cartQuantity}</span>
          </button>
        </nav>
      </div>
      <Cart onShow={showCart} />
    </>
  );
}

export default Navbar;
