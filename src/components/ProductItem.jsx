import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice.js";
import { Link } from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";
import Client from "../client.js";
import toast, { Toaster } from "react-hot-toast";

const builder = imageUrlBuilder(Client);

const urlFor = (source) => builder.image(source);

function ProductItem(props) {
  const dispatch = useDispatch();
  const { id, slug, title, price, image } = props;
  const addToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        slug,
        title,
        price,
        image,
      })
    );
    toast.success(`${title} added to cart`);
  };

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <>
      <div id="shop" className="text-black ">
        <Link
          onClick={scrollToTop}
          to={`product/${slug}`}
          className=" overflow-hidden w-full   "
        >
          <img
            className="rounded-sm w-full h-[30vh]  object-cover hover:shadow-xl hover:-translate-y-2  transition
            ease-in-out  duration-500 "
            src={urlFor(image)}
            alt={slug}
          />
          <div className="flex justify-between">
            <h1 className="text-base">{title}</h1>
            <p className="text-base">N{price}</p>
          </div>
        </Link>
        <span className="cursor-pointer" onClick={addToCartHandler}>
          +
        </span>
        <Toaster />
      </div>
    </>
  );
}

export default ProductItem;
