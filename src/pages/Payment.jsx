import { PaystackButton } from "react-paystack";

import { useSelector } from "react-redux";
import { useState } from "react";

const Payment = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPriceOfCart = cartItems
    .reduce((acc, cur) => acc + cur.totalPrice, 0)
    .toFixed(2);
  const amount = totalPriceOfCart;

  const publicKey = import.meta.env.VITE_PAYSTACK_KEY;

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setEmail("");
    setName("");
    setPhone("");
  };

  const handleFormSubmit = () => {
    if (!email || !name || !phone) {
      alert("Please fill in all the required fields.");
      return;
    }

    setLoading(true);
  };

  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay with PayStack",
    onSuccess: ({ reference }) => {
      setLoading(false);
      alert(
        `Your purchase was successful! Transaction reference: ${reference}`
      );
      resetForm();
    },
    onError: (error) => {
      setLoading(false);
      alert(`Payment failed. Error: ${error.message}`);
    },
    onClose: () => {
      setLoading(false);
      alert("Wait! You need this oil, don't go!!!!");
    },
    onCancel: () => {
      setLoading(false);
      alert("Wait!");
    },
  };

  return (
    <div>
      <div className="border w-[85%]">
        <div className="flex flex-col m-10">
          <form className="flex flex-col gap-5">
            <label htmlFor="name">Name</label>
            <input
              className="text-white p-3"
              type="text"
              value={name}
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
              className="text-white p-3"
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="phone">Phone</label>
            <input
              className="text-white p-3"
              value={phone}
              type="text"
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </form>

          {email && name && phone && (
            <PaystackButton
              className="mt-8 bg-green-500 py-2 rounded-sm w-full"
              {...componentProps}
            />
          )}

          {loading && <div className="text-center">Loading...</div>}
        </div>
      </div>
    </div>
  );
};

export default Payment;
