import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, LogIn, Product, SignUp } from "./pages";
import Layout from "./pages/Layout.jsx";
import { fetchProduct } from "./pages/Home.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import { fetchSingleProduct } from "./pages/Product.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home />, loader: fetchProduct },
      { path: "login", element: <LogIn /> },
      { path: "signup", element: <SignUp /> },

      {
        path: "product/:slug",
        element: <Product />,
        loader: fetchSingleProduct,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}
export default App;
