import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const LogIn = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values) => {
    console.log("Login Successful:", values.email, values.password);

    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((user) => {
        console.log(user);
        navigate("/");
        toast.success("Logged in successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        <Form className="max-w-md mx-auto mt-60 p-8 bg-white rounded shadow-md">
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
              className="w-full p-2 border rounded bg-white text-black"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm mt-1 "
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
              className="w-full p-2 border rounded bg-white text-black"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            >
              Login
            </button>
          </div>
          <div>
            <h1 className="text-black">
              Don`&apos;`t have an account?
              <span>
                <Link to="/signup" className="text-blue-500">
                  Create an account
                </Link>
              </span>
            </h1>
          </div>
        </Form>
      </Formik>
      <Toaster />
    </>
  );
};

export default LogIn;
