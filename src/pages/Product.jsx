import { useParams, useLoaderData } from "react-router-dom";
import { useState } from "react";
import Client from "../client.js";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart-slice.js";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(Client);

const urlFor = (source) => builder.image(source);

function Product() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const single = useLoaderData();
  const [imageIndex, setImageIndex] = useState(0);
  const { slug } = useParams();
  const addItemHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id: single._id,
        title: single.title,
        price: single.price,
        image: single.image[0],
        slug: single.slug,
      })
    );
  };
  const findQuantity =
    cartItems.find((item) => item.id === single?._id)?.quantity || 0;
  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(single._id));
  };

  const handleThumbnailClick = (index) => {
    setImageIndex(index);
  };

  return (
    <div className="flex h-screen px-[10%]  flex-col md:flex-row w-full gap-5 mt-36 text-black">
      {single && (
        <>
          <div>
            <div>
              <img src={urlFor(single?.image[imageIndex]).url()} alt="" />
            </div>

            <div className="flex gap-2 mt-5">
              {single.image.map((images, index) => (
                <img
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className=" h-32 w-32 object-cover "
                  src={urlFor(images)}
                  alt={slug}
                />
              ))}
            </div>
          </div>

          <div className="md:w-1/2 ">
            <h1 className="text-4xl font-bold ">{single.title}</h1>
            <h3 className="text-2xl mb-10">N{single.price}</h3>

            <p className="mb-6">{single.description}</p>

            <div
              className="grid grid-flow-col justify-center gap-9 
              my-6 items-center "
            >
              <button onClick={removeItemHandler} className=" font-extrabold ">
                -
              </button>

              <span>{findQuantity}</span>

              <button onClick={addItemHandler}>+</button>
            </div>

            <button
              onClick={addItemHandler}
              className="bg-blue-500 text-white font-extrabold hover:bg-blue-700 w-full rounded-sm p-6 text-xl "
            >
              Add to Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Product;

export const fetchSingleProduct = async ({ request, params }) => {
  const slug = params.slug;
  try {
    const data = await Client.fetch(
      `*[_type == "product" && slug.current == "${slug}"][0]{
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
  }
};
