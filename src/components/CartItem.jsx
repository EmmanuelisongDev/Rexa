import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import imageUrlBuilder from "@sanity/image-url";
import Client from "../client.js";

const builder = imageUrlBuilder(Client);
const urlFor = (source) => builder.image(source);

function CartItem(props) {
  const dispatch = useDispatch();
  const { title, quantity, total, price, id, image } = props.item;

  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(id));
  };
  const deleteItemHandler = () => {
    dispatch(cartActions.deleteItemFromCart(id));
  };

  const addItemHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
        image,
      })
    );
  };

  return (
    <>
      <div className="flex justify-between items-center border-b-[0.5px] border-t-[0.5px] w-[100%] py-8  ">
        <div className="flex gap-3">
          <img className="w-[20%] object-cover" src={urlFor(image)} alt="" />
          <div className="text-sm">
            <h2 className="mb-1 text-lg ">{title}</h2>
            <p className="mb-1">N{total}</p>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className="flex flex-col items-center ">
            <button onClick={addItemHandler}>
              <BiUpArrow />
            </button>
            <span>{quantity}</span>
            <button onClick={removeItemHandler}>
              <BiDownArrow />
            </button>
          </div>
          <AiFillDelete onClick={deleteItemHandler} />
        </div>
      </div>
    </>
  );
}

export default CartItem;
