import Hero from "../components/Hero.jsx";
import ProductItem from "../components/ProductItem.jsx";
import Client from "../client.js";
import { useLoaderData } from "react-router-dom";
function Home() {
  const product = useLoaderData();
  return (
    <>
      <Hero />
      <h1 className="text-black px-[5%] flex mt-9 text-2xl md:text-6xl">
        Products
      </h1>
      <div className="grid grid-cols-1 px-[5%] py-9 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {product &&
          product.map((item) => (
            <>
              <ProductItem
                key={item._id}
                id={item._id}
                slug={item.slug.current}
                title={item.title}
                price={item.price}
                image={item.image[0]}
              />
            </>
          ))}
      </div>
    </>
  );
}

export default Home;

export async function fetchProduct() {
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

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
