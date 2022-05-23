import "./_CartSummary.scss"
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

export default function CartSummary({totalPrice, shippingPrice, tax, checkOut, loggedIn, showLogin}) {
  const navigate = useNavigate();
    return  (
        <section className="cart_summary">  
          <p>Products' price: ${totalPrice.toFixed(2)}</p>
          <p>
            TAX included {`(${tax}%)`}: $ {(totalPrice * tax / 100).toFixed(2)}
          </p>
          <p>Shipping: $ {shippingPrice}</p>
          <p>
            Total:&nbsp;&nbsp;&nbsp;<span>$ {(totalPrice + shippingPrice).toFixed(2)}</span>
          </p>
          <Button text="Checkout" icon="checkout" type="primary" onClick={checkOut}/>
          {!loggedIn && showLogin && (
            <h2 className="login_redirection">
            Already have an account?&nbsp;&nbsp;
            <span
              className="login_redirection_link"
              onClick={() => navigate("/login")}
            >
              Log in
            </span>
          </h2>
        )}
        </section>
      )
}