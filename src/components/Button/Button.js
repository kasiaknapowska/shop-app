import classNames from "classnames";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import "./_Button.scss";

export default function Button({ text, icon, onClick, type }) {
  return (
    <>
      {type === "submit" && (
        <button className="btn submit_btn" type="submit">
          {text}
        </button>
      )}
      {type !== "submit" && (
        <button
          className={classNames("btn", {
            primary: type === "primary",
            secondary: type === "secondary",
          })}
          onClick={onClick}
        >
          {" "}
          <div className="button_icon">
            {icon === "cart" && <AddShoppingCartOutlinedIcon />}
            {icon === "delete" && <DeleteOutlineIcon />}
            {icon === "checkout" && <ShoppingCartCheckoutIcon />}
            {icon === "edit" && <CreateRoundedIcon />}
            {icon === "payment" && <AttachMoneyRoundedIcon />}
            {icon === "buy" && <InventoryRoundedIcon/>}
          </div>
         
          {text}
        </button>
      )}
    </>
  );
}
