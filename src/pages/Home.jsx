import ProductItem from "../components/ProductItem.jsx";

function Home({ product }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
  );
}

export default Home;
