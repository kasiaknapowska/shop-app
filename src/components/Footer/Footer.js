import "./_Footer.scss";
import { Link } from "react-router-dom";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";

export default function Footer() {
  const links = [
    { linkTo: "/info", title: "Shop regulations" },
    { linkTo: "/info", title: "Privacy policy" },
    { linkTo: "/faq", title: "FAQ" },
    { linkTo: "/info", title: "Shipping" },
    { linkTo: "/info", title: "Complaints and returns" },
  ];

  return (
    <footer className="footer_bg">
      <div className="container footer_container">
        <div className="footer_info">
          <h2 className="footer_title">Customer service</h2>
          {links.map((link, index) => (
            <Link to={link.linkTo} className="footer_link" key={index}>
              {link.title}
            </Link>
          ))}
        </div>
        <div className="footer_info">
          <h2 className="footer_title">Contact</h2>
          <p className="icon_p">
            <PhoneAndroidOutlinedIcon fontSize="small" />
            &nbsp;+48 204 654 553
          </p>
          <p className="icon_p">
            <MailOutlineRoundedIcon fontSize="small" />
            &nbsp;&nbsp;shop@shop.com
          </p>
        </div>
        <div className="footer_icons">
          <a href="https://www.facebook.com/" target="blank" rel="noopener">
            <i className="fab fa-facebook-square"></i>
          </a>
          <a href="https://www.instagram.com/" target="blank" rel="noopener">
            <i className="fab fa-instagram-square"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
