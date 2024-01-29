import { usePaystackPayment } from "react-paystack";

const config = {
  reference: new Date().getTime().toString(),
  email: "user@example.com",
  amount: 20000,
  publicKey: "pk_test_dsdfghuytfd2345678gvxxxxxxxxxx",
};

const onSuccess = (reference) => {
  console.log(reference);
};

const onClose = () => {
  console.log("closed");
};

export const PaystackHookExample = () => {
  const initializePayment = usePaystackPayment(config);

  return (
    <div>
      <button
        className=" bg-white  text-black py-2 rounded-sm w-full"
        onClick={() => {
          initializePayment(onSuccess, onClose);
        }}
      >
        Pay With PayStack
      </button>
    </div>
  );
};
