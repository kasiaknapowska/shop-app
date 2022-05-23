import "./_Cart.scss";
import CartItem from "../../components/CartItem/CartItem";
import CartSummary from "../../components/CartSummary/CartSummary";
import Button from "../../components/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { resetCart } from "../../redux/changeCartSlice";
import { resetCount } from "../../redux/counterSlice";
import { resetPrice } from "../../redux/changePriceSlice";
import { useState, useEffect } from "react";
import FormEdit from "../../components/Form/FormEdit";

export default function Cart() {
  const cart = useSelector((state) => state.changeCart.items);
  const totalPrice = useSelector((state) => state.changePrice.price);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const loggedIn = useSelector((state) => state.logIn.loggedIn);
  const dispatch = useDispatch();

  const tax = 23;
  const [shippingPrice, setShippingPrice] = useState(0);
  const [showUserData, setShowUserData] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    setShippingPrice(totalPrice > 200 ? 0 : 9.99);
  }, [totalPrice]);

  const deleteAll = () => {
    dispatch(resetCart([]));
    dispatch(resetCount(0));
    dispatch(resetPrice(0));
  };

  const checkOut = () => {
    if (loggedIn) setShowUserData(true);
    setShowLogin(true);
  };

  const buy = (cart) => {
    console.log("buy");
    dispatch(resetCart([]))
    dispatch(resetCount(0))
  };

  return (
    <>
      <main className="container cart_container">
        <h1>Cart</h1>
        {cart.length === 0 && <p>Your cart is empty</p>}
        {cart.length > 0 && (
          <Button
            text="Remove all"
            icon="delete"
            type="secondary"
            onClick={deleteAll}
          />
        )}
        <section className="cart_items">
          {cart.length > 0 &&
            cart.map((item) => {
              return <CartItem item={item} key={item.id} />;
            })}
        </section>
        {cart.length > 0 && (
          <CartSummary
            totalPrice={totalPrice}
            shippingPrice={shippingPrice}
            tax={tax}
            checkOut={checkOut}
            loggedIn={loggedIn}
            showLogin={showLogin}
          />
          
        )}
       
        {loggedIn && showUserData && cart.length > 0 && (
          <>
            <section className="shipping_data">
              <div>
                <h2>Payment</h2>
                <p>
                  Money transfer to a bank account: 00 0000 0000 0000 0000 0000
                </p>
              </div>
              <div>
                <h2>Shipping data</h2>
                <p>
                  {loggedInUser.name} {loggedInUser.surname},{" "}
                  {loggedInUser.street} {loggedInUser.streetNumber},{" "}
                  {loggedInUser.zipCode} {loggedInUser.city}
                </p>
              </div>
              {editFormOpen && <FormEdit setEditFormOpen={setEditFormOpen} />}
             
                <Button
                  text="Edit data"
                  type="secondary"
                  icon="edit"
                  onClick={() => setEditFormOpen(true)}
                />
                <Button
                  text="Buy products"
                  type="primary"
                  icon="buy"
                  onClick={() => buy(cart)}
                />
              
            </section>
          </>
        )}
      </main>
    </>
  );
}
