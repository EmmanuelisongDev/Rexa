import { BsFillCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../store/ui-slice";
import Cart from "./Cart";
import { HiOutlineXCircle } from "react-icons/hi";
import { signOut, getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
function Navbar() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const showCart = useSelector((state) => state.ui.cartIsVisible);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);
  function handleShowHideCart() {
    dispatch(uiActions.toggle());
  }

  async function handleSignOut() {
    const auth = getAuth();
    try {
      await signOut(auth);
      toast.dismiss("Signed Out");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="  mix-blend-difference   mb-[100px] fixed z-[100] top-0 left-0 w-full px-5 py-4  ">
        <nav className="flex items-center justify-between ">
          {user ? (
            <button onClick={handleSignOut} className="text-white">
              Sign Out
            </button>
          ) : (
            <Link to={"login"}>
              <button className="text-white">Sign In</button>
            </Link>
          )}

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
      <Toaster />
    </>
  );
}

export default Navbar;
