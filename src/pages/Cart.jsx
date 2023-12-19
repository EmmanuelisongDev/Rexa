import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useStateContext } from "../StateContext";
import Client from "../client.js";
import { Link } from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";

function Cart() {
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  const builder = imageUrlBuilder(Client);
  const urlFor = (source) => builder.image(source);

  return (
    <div>
      <header>
        <h1 className="text-2xl font-bold">Cart</h1>
        <h1>{`${totalQuantities} items`}</h1>
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
            <div
              key={item._id}
              className="flex justify-between items-center border-b-[0.5px] border-t-[0.5px] w-[100%] py-8  "
            >
              <div className="flex gap-3">
                <img
                  className="w-[20%] object-cover"
                  src={urlFor(item?.image[0])}
                  alt=""
                />
                <div className="text-sm">
                  <h2 className="mb-1 text-lg ">{item?.title}</h2>
                  <p className="mb-1">N{item?.price}</p>
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <div className="flex flex-col items-center ">
                  <button
                    onClick={() => toggleCartItemQuantity(item._id, "inc")}
                  >
                    <BiUpArrow />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => toggleCartItemQuantity(item._id, "dec")}
                  >
                    <BiDownArrow />
                  </button>
                </div>
                <AiFillDelete onClick={() => onRemove(item)} />
              </div>
            </div>
          ))}

        {cartItems.length >= 1 && (
          <div className="mt-20 bg-[#000] text-white p-5 rounded-sm">
            <h1 className="text-2xl ">Order Summary</h1>

            <div>
              <div className="flex my-2 justify-between">
                <h2>Subtotal</h2>
                <p>N{totalPrice}</p>
              </div>
            </div>

            <div className="w-full mt-4 ">
              <Link to="/payment">
                <button className=" bg-white  text-black py-2 rounded-sm w-full">
                  {/* <PaystackButton {...componentProps} /> */}
                  Buy Now
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
