import { useFormik } from "formik";
import { PaystackHookExample } from "../payStack.jsx";

const CheckoutForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md  mx-auto mt-48 ">
      <h1>CheckOut </h1>

      <div className="mb-4">
        <label
          htmlFor="firstName"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          onChange={formik.handleChange}
          value={formik.values.firstName}
          className="border p-2 w-full bg-white text-black"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="lastName"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          onChange={formik.handleChange}
          value={formik.values.lastName}
          className="border p-2 w-full bg-white text-black"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className="border p-2 w-full bg-white text-black"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="address"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          onChange={formik.handleChange}
          value={formik.values.address}
          className="border p-2 w-full bg-white text-black"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="city"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          City
        </label>
        <input
          type="text"
          id="city"
          name="city"
          onChange={formik.handleChange}
          value={formik.values.city}
          className="border p-2 w-full bg-white text-black"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="zipCode"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Zip Code
        </label>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          onChange={formik.handleChange}
          value={formik.values.zipCode}
          className="border p-2 w-full bg-white text-black"
        />
      </div>

      <PaystackHookExample email={formik.values.email} />
    </form>
  );
};

export default CheckoutForm;
