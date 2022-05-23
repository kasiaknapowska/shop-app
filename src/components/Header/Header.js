import { useNavigate, Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../redux/logInSlice";
import logo from "../../logo.svg";
import "./_Header.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function Header() {
  const navigate = useNavigate();
  const count = useSelector((state) => state.counter.count);
  const loggedIn = useSelector(state => state.logIn.loggedIn);
  const dispatch = useDispatch();
  return (
    <header>
      <nav className="nav_icons_container">
        <Link to={loggedIn ? "/user" : "/login"}>
          <PersonOutlineIcon fontSize="medium" className="nav_icon" />
        </Link>
        <HashLink
          smooth
          style={{ color: "white" }}
          to={{ pathname: "/", hash: "#favorites" }}
        >
          <FavoriteBorderIcon />
        </HashLink>
        <Link to="/cart">
          <ShoppingCartOutlinedIcon fontSize="medium" className="nav_icon" />
          <span className="circle">{count}</span>
        </Link>
        <div onClick={() => dispatch(logOut())}>Log Out</div>
      </nav>
      <img
        className="logo"
        src={logo}
        alt="logo"
        onClick={() => navigate("/")}
      />
    </header>
  );
}
