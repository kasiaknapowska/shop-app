import "./_CartItem.scss";
import Select from "../Select/Select";
import { useDispatch } from "react-redux";
import {
  addToCart,
  editSize,
  deleteFromCart,
  deleteSingleFromCart,
} from "../../redux/changeCartSlice";
import { addCount, substractCount } from "../../redux/counterSlice";
import { sumPrice, substractPrice } from "../../redux/changePriceSlice";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState, useEffect } from "react";

export default function CartItem({ item }) {
  const { id, image, title, description, category, quantity, price } = item;
  const [size, setSize] = useState(item.size || "")
  const dispatch = useDispatch();

  const addSingleItem = (item) => {
    dispatch(addCount(1));
    dispatch(addToCart(item));
    dispatch(sumPrice(item.price));
  };

  const deleteSingleItem = (item) => {
    dispatch(substractCount(1));
    dispatch(substractPrice(item.price));
    dispatch(deleteSingleFromCart(item));
  };

  const deleteItem = (item) => {
    dispatch(deleteFromCart(item));
    dispatch(substractPrice(item.price * item.quantity));
    dispatch(substractCount(item.quantity));
  };

  useEffect(() => {
    const cloth = {
      id,
      image,
      title,
      description,
      price,
      category,
      size: size,
    };
  dispatch(editSize(cloth))
  }, [size])

  return (
    <div className="cart_item">
      <img className="cart_img" src={image} alt="product" />
      <div>
        <h2>{title}</h2>
        <div className="row cart_select_row">
          <div className="cart_quantity">
            <span onClick={() => deleteSingleItem(item)}>-</span>
            <span> {quantity} </span>
            <span onClick={() => addSingleItem(item)}>+</span>
          </div>
          {item.category.includes("clothing") && (
              <Select
                option={item.size}
                dropDownOptions={["S", "M", "L", "XL"]}
                successcallback={setSize}
                inputSize={{ width: "10rem" }}
                arrowPosition={{ left: "8rem", top: ".5rem" }}
              />
            )}
        </div>
        <p>$ {(price * quantity).toFixed(2)}</p>
      </div>
      <DeleteOutlineIcon
        className="cart_delete_icon"
        onClick={() => deleteItem(item)}
      />
    </div>
  );
}
