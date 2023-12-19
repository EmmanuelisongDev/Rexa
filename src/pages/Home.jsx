import { Link } from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";
import Client from "../client.js";
import { useStateContext } from "../StateContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { LoadingSkeleton } from "../components/LoadingSkeleton";

const builder = imageUrlBuilder(Client);

const urlFor = (source) => builder.image(source);

function Home({ product, isLoading }) {
  const { onAdd, qty } = useStateContext();

  const productLength = product?.length;
  console.log(productLength);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {isLoading && <LoadingSkeleton cards={productLength} />}
      {product &&
        product.map((item) => (
          <>
            <div key={item._id}>
              <Link to={`/product/${item.slug.current}`}>
                <img
                  className="rounded-sm w-full h-[30vh] object-cover"
                  src={urlFor(item.image[0]) || <Skeleton />}
                  alt={item.slug.current}
                />
                <div className="flex justify-between">
                  <h1 className="text-base">{item.title || <Skeleton />}</h1>
                  <p className="text-base">N{item.price || <Skeleton />}</p>
                </div>
              </Link>
              <span className="cursor-pointer" onClick={() => onAdd(item, qty)}>
                +
              </span>
            </div>
          </>
        ))}
    </div>
  );
}

export default Home;
