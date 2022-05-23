import "./_Product.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCount } from "../../redux/counterSlice";
import { addToCart } from "../../redux/changeCartSlice";
import { sumPrice } from "../../redux/changePriceSlice";
import ProductOverview from "../ProductOverview/ProductOverview";

import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function Product({ product, favorites, toggleFavorite }) {
  const { id, image, title, description, price, category } = product;
  const [isOverviewOpen, setIsOverviewOpen] = useState(false)

  const dispatch = useDispatch();

  const addItem = (product) => {
    dispatch(addCount(1))
    dispatch(addToCart(product))
    dispatch(sumPrice(product.price))
  }

  return (
    <>
      <div className="card">
        <div className="img_container">
          <img className="card_img" src={image} alt="product" />
        </div>
        <h3 onClick={() => setIsOverviewOpen(true)}>{title}</h3>
        <span>$ {price.toFixed(2)}</span>
        {favorites.find((el) => el.id === id) ? (
          <FavoriteIcon
            className="favorite_icon"
            onClick={() => toggleFavorite(id, image, title, description, price, category)}
          />
        ) : (
          <FavoriteBorderIcon
            className="favorite_icon"
            onClick={() => toggleFavorite(id, image, title, description, price, category)}
          />
        )}
        <AddShoppingCartOutlinedIcon className="cart_add_icon" onClick={() => addItem(product)}/>
      </div>
      {isOverviewOpen && <ProductOverview setIsOverviewOpen={setIsOverviewOpen} product={product}/>}
    </>
  );
}
