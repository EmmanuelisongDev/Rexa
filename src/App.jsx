import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Product } from "./pages";
import { useState, useEffect } from "react";
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
      {
        path: "product/:slug",
        element: <Product />,
        loader: fetchSingleProduct,
      },
      // { path: "cart", element: <Cart /> },
    ],
  },
]);

function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // Fetch data or perform any asynchronous operations here
    // You can use the loader function or any other mechanism to fetch data

    // Example: Simulating data loading with a delay
    const fetchData = async () => {
      await fetchProduct(); // or fetchSingleProduct();
      setDataLoaded(true);
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on mount

  // Show a preloader while data is being fetched
  if (!dataLoaded) {
    // You can replace this with your own preloader component
    return <div>Loading...</div>;
  }

  return <RouterProvider router={router} />;
}
export default App;
