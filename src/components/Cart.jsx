import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../store/ui-slice.js";
import CartItem from "./CartItem.jsx";

function Cart({ onShow }) {
  const cartItems = useSelector((state) => state.cart.items);

  const totalPriceOfCart = cartItems.reduce(
    (acc, cur) => acc + cur.totalPrice,
    0
  );

  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  function handleShowHideCart() {
    dispatch(uiActions.toggle());
  }
  return (
    <div
      className={`bg-white md:mr-6 mt-12 rounded-md pt-6  overflow-hidden overflow-y-auto scrollbar-thumb-bg-888 scrollbar-thumb-radius-4 scrollbar-track-bg-eee ${
        onShow ? "block transition-all ease-in-out duration-200" : " scale-[0]"
      }  transition-all ease-in-out duration-200 z-50 max-h-[80vh] text-black fixed shadow-2xl md:w-[40%] top-0 right-0  px-7`}
    >
      <header>
        <h1 className="md:text-2xl font-bold">Cart</h1>
        <h1>{`${totalQuantity} items`}</h1>
      </header>

      <section className="my-20 flex flex-col justify-center ">
        {cartItems.length < 1 && (
          <>
            <p className="md:text-2xl  font-extrabold  "> No Items In Cart</p>
            <Link className="mt-4" to="/">
              <button
                onClick={handleShowHideCart}
                className="bg-black text-white font-bold py-2 px-4 text-xs md:text-base rounded-sm hover:bg-white hover:text-black border border-black"
              >
                Continue Shopping
              </button>
            </Link>
          </>
        )}

        {cartItems.length >= 1 &&
          cartItems.map((item) => (
            <div key={item._id}>
              <CartItem
                item={{
                  id: item.id,
                  title: item.name,
                  quantity: item.quantity,
                  total: item.totalPrice,
                  price: item.price,
                  image: item.image,
                }}
              />
            </div>
          ))}

        {cartItems.length >= 1 && (
          <div className="mt-20 bg-[#000] text-white p-5 rounded-sm">
            <h1 className="md:text-2xl ">Order Summary</h1>

            <div>
              <div className="flex my-2 justify-between">
                <h2>Subtotal</h2>
                <p>N{totalPriceOfCart}</p>
              </div>
            </div>

            <div className="w-full mt-4 ">
              <Link onClick={handleShowHideCart} to="checkoutform">
                <button className="text-black hover:bg-black border hover:text-white w-full  text-bold py-3 rounded-sm  bg-white">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Cart;
