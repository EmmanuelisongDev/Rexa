import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Client from "../client.js";
import imageUrlBuilder from "@sanity/image-url";
import { useStateContext } from "../StateContext";

function Product() {
  const builder = imageUrlBuilder(Client);

  const urlFor = (source) => builder.image(source);

  const [single, setSingle] = useState();
  const [imageIndex, setImageIndex] = useState(0);
  const { slug } = useParams();

  const { decQty, incQty, qty, onAdd } = useStateContext();

  const fetchSingleProduct = async () => {
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
      setSingle(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleThumbnailClick = (index) => {
    setImageIndex(index);
  };

  useEffect(() => {
    fetchSingleProduct();
  }, [slug]);

  return (
    <div className="flex flex-col md:flex-row w-full gap-5 mb-52">
      {single && (
        <>
          <div>
            <div>
              <img src={urlFor(single?.image[imageIndex]).url()} alt="" />
            </div>

            <div className="flex gap-2 mt-5">
              {single.image.map((images, index) => (
                <>
                  <img
                    onClick={() => handleThumbnailClick(index)}
                    className=" h-32 w-32 object-cover "
                    src={urlFor(images)}
                    alt=""
                  />
                </>
              ))}
            </div>
          </div>

          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold ">{single.title}</h1>
            <h3 className="text-2xl mb-10">N{single.price}</h3>

            <p className="mb-6">{single.description}</p>

            <div
              className="grid grid-flow-col justify-center gap-9 
              my-6 items-center "
            >
              <button onClick={decQty} className=" font-extrabold ">
                -
              </button>
              <span>{qty}</span>
              <button onClick={incQty}>+</button>
            </div>

            <button
              onClick={() => onAdd(single, qty)}
              className="bg-blue-500 hover:bg-blue-700 w-full rounded-sm p-6 text-xl "
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
