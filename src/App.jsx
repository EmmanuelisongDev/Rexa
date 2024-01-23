import { Routes, Route } from "react-router-dom";
import { Home, Product, Payment } from "./pages";
import { Footer, Cart, Navbar } from "./components";
import { useState, useEffect } from "react";
import Client from "./client.js";

function App() {
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const data = await Client.fetch(
        `*[_type == 'product']{
        _id,
        slug,
        title,
        image,
        price,
        description,
      }`
      );

      setProduct(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home product={product} />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
