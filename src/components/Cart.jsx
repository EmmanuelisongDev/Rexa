import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartItem from "./CartItem.jsx";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
function Cart({ onShow }) {
  const cartItems = useSelector((state) => state.cart.items);

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalPriceOfCart = cartItems.reduce(
    (acc, cur) => acc + cur.totalPrice,
    0
  );
  const amount = totalPriceOfCart;
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

  async function handleCheckout() {
    const lineItems = cartItems.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: amount,
        },
        quantity: totalQuantity,
      };
    });
    const { data } = await axios.post("http://localhost:5000/checkout", {
      lineItems,
    });
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: data.id });
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
              <button className="bg-blue-500 text-white font-bold py-2 px-4 text-xs md:text-base rounded-sm hover:bg-blue-700">
                Continue Shopping
              </button>
            </Link>
          </>
        )}

        {cartItems.length >= 1 &&
          cartItems.map((item) => (
            <CartItem
              key={item._id}
              item={{
                id: item.id,
                title: item.name,
                quantity: item.quantity,
                total: item.totalPrice,
                price: item.price,
                image: item.image,
              }}
            />
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
              <button
                onClick={handleCheckout}
                className=" bg-white  text-black py-2 rounded-sm w-full"
              >
                Check Out
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Cart;
