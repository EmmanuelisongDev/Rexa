import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Product } from "./pages";
import { Cart } from "./components";
import Layout from "./pages/Layout.jsx";
import { fetchProduct } from "./pages/Home.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home />, loader: fetchProduct },
      {
        path: "product/:slug",
        element: <Product />,
      },
      { path: "cart", element: <Cart /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
