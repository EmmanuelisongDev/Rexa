import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, LogIn, Product, SignUp } from "./pages";
import Layout from "./pages/Layout.jsx";
import { fetchProduct } from "./pages/Home.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import { fetchSingleProduct } from "./pages/Product.jsx";
import CheckoutForm from "./pages/CheckOutForm.jsx";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendCartData, fetchCartData } from "./store/cart-actions";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home />, loader: fetchProduct },
      { path: "login", element: <LogIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "checkoutform", element: <CheckoutForm /> },

      {
        path: "product/:slug",
        element: <Product />,
        loader: fetchSingleProduct,
      },
    ],
  },
]);
let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);
  return <RouterProvider router={router} />;
}
export default App;
