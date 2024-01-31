import { usePaystackPayment } from "react-paystack";
import { useSelector } from "react-redux";

export const PaystackHookExample = ({ email }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPriceOfCart = cartItems.reduce(
    (acc, cur) => acc + cur.totalPrice,
    0
  );
  const amount = totalPriceOfCart;
  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount: amount,
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
  };

  const onSuccess = (reference) => {
    console.log(reference);
  };
  const paystackStyle = {
    backgroundColor: "transparent",
  };
  const onClose = () => {
    console.log("closed");
  };
  const initializePayment = usePaystackPayment(config);

  return (
    <div style={paystackStyle}>
      <button
        className=" text-white hover:bg-white border hover:text-black  bg-black  py-2 rounded-sm w-full"
        onClick={() => {
          initializePayment(onSuccess, onClose);
        }}
      >
        Pay With PayStack
      </button>
    </div>
  );
};
