import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartItem from "./CartItem.jsx";
import PaystackPop from "@paystack/inline-js";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalPriceOfCart = cartItems.reduce(
    (acc, cur) => acc + cur.totalPrice,
    0
  );
  const amount = totalPriceOfCart;

  const publicKey = import.meta.env.VITE_PAYSTACK_KEY;

  function PayW() {
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: publicKey,
      email: "emmisongdev@gmail.com",
      amount: amount,
      backgroundColor: "rgba(0, 0, 0, 0)",
      ref: "" + Math.floor(Math.random() * 1000000000 + 1),
      metadata: {
        custom_fields: [
          {
            display_name: "Mobile Number",
            variable_name: "mobile_number",
            value: "+2348012345678",
          },
        ],
      },
      onSuccess: (transaction) => {
        console.log(transaction);
      },
      onCancel: () => {
        console.log("cancel");
      },
    });
  }

  return (
    <div className=" text-black">
      <header>
        <h1 className="text-2xl font-bold">Cart</h1>
        <h1>{`${totalQuantity} items`}</h1>
      </header>

      <section className="my-20 flex flex-col  justify-center ">
        {cartItems.length < 1 && (
          <>
            <p className="text-2xl  font-extrabold  "> No Items In Cart</p>
            <Link className="mt-4" to="/">
              <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-sm hover:bg-blue-700">
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
            <h1 className="text-2xl ">Order Summary</h1>

            <div>
              <div className="flex my-2 justify-between">
                <h2>Subtotal</h2>
                <p>N{totalPriceOfCart}</p>
              </div>
            </div>

            <div className="w-full mt-4 ">
              <button
                onClick={PayW}
                className=" bg-white  text-black py-2 rounded-sm w-full"
              >
                Buy Now
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Cart;
