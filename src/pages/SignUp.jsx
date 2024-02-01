import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const SignUp = () => {
  const auth = getAuth();
  const [userExist, setUserExist] = useState(null);
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      navigate("/");
      await updateProfile(user, { displayName: values.name });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setUserExist("Email is already in use. Please use a different email.");
        toast.error(`Email is already in use. Please use a different email.`);
        setUserExist(true);
      } else {
        setUserExist(false);
      }
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={SignUpSchema}
        onSubmit={handleSubmit}
      >
        <Form className="md:max-w-md w-[80%] mb-48 mx-auto p-8 mt-60 bg-white  rounded shadow-md">
          <h1 className="text-black font-bold text-3xl mb-4">
            Create An Account{" "}
          </h1>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name:
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="w-full p-2 border rounded bg-white text-black"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <Field
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-2 border rounded  bg-white text-black"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password:
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full p-2 border rounded  bg-white text-black"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2 "
            >
              Confirm Password:
            </label>
            <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              className="w-full p-2 border rounded  bg-white text-black"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-black text-white font-bold py-2 px-4 text-xs md:text-base rounded-sm hover:bg-white hover:text-black border border-black w-full"
            >
              Create Account
            </button>
          </div>
        </Form>
      </Formik>
      {userExist && <p className="text-red-500">{userExist}</p>}
    </>
  );
};

export default SignUp;
