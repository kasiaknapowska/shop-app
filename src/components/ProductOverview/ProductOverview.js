import { useState } from "react";
import "./_ProductOverview.scss";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Button from "../Button/Button";
import Select from "../Select/Select";
import { useDispatch } from "react-redux";
import { addCount } from "../../redux/counterSlice";
import { addToCart, editSize } from "../../redux/changeCartSlice";
import { sumPrice } from "../../redux/changePriceSlice";
// import ZoomOutMapRoundedIcon from "@mui/icons-material/ZoomOutMapRounded";

export default function ProductOverview({ product, setIsOverviewOpen }) {
  const { id, image, title, description, price, category } = product;
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  const addItem = (id, image, title, description, price, category) => {
    const cloth = {
      id,
      image,
      title,
      description,
      price,
      category,
      size: size,
    };

    dispatch(addCount(1));
    dispatch(addToCart(cloth));
    dispatch(editSize(cloth))
    dispatch(sumPrice(cloth.price));
    setIsOverviewOpen(false)
  };

  return (
    <>
      <div className="overview_bg"></div>
      <div className="overview_container">
        <CloseRoundedIcon
          fontSize="large"
          className="close_icon"
          onClick={() => setIsOverviewOpen(false)}
        />
        {/* <ZoomOutMapRoundedIcon className="zoom_icon" fontSize="medium" /> */}
        <img className="overview_img" src={image} alt="product" />

        <div className="overview_info">
          <h1>{title}</h1>
          <span>$ {price.toFixed(2)}</span>
          <h2>Details</h2>
          <p>{description}</p>
          <div className="row">
            {category.includes("clothing") && (
              <Select
                option={size}
                dropDownOptions={["S", "M", "L", "XL"]}
                successcallback={setSize}
                inputSize={{ width: "10rem" }}
                arrowPosition={{ left: "8rem", top: ".5rem" }}
              />
            )}
            <Button
              text="Add to cart"
              icon="cart"
              type="primary"
              onClick={() => addItem(id, image, title, description, price, category)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
