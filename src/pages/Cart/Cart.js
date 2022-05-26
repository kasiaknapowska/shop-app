import "./_Cart.scss";
import CartItem from "../../components/CartItem/CartItem";
import CartSummary from "../../components/CartSummary/CartSummary";
import CartShipping from "../../components/CartShipping/CartShipping";
import Button from "../../components/Button/Button";
import Loading from "../../components/Loading/Loading";
import Thanks from "../../components/Thanks/Thanks";
import { useSelector, useDispatch } from "react-redux";
import { resetCart } from "../../redux/changeCartSlice";
import { resetCount } from "../../redux/counterSlice";
import { resetPrice } from "../../redux/changePriceSlice";
import { useState, useEffect } from "react";
import { addOrder } from "../../lib/func-firebase";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.changeCart.items);
  const totalPrice = useSelector((state) => state.changePrice.price);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const loggedIn = useSelector((state) => state.logIn.loggedIn);

  const [sizeError, setSizeError] = useState("");
  const [shippingDataError, setShippingDataError] = useState("");
  const [shippingPrice, setShippingPrice] = useState(0);
  const [showUserData, setShowUserData] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [newOrder, setNewOrder] = useState({
    date: "",
    orderId: null,
    orderPrice: "",
    products: [],
  });
  const [postOrder, setPostOrder] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [thanks, setThanks] = useState(false);

  const bankAccount = "00 0000 0000 0000 0000 0000 0000";

  useEffect(() => {
    setShippingPrice(totalPrice > 200 ? 0 : 9.99);
  }, [totalPrice]);

  const deleteAll = () => {
    dispatch(resetCart([]));
    dispatch(resetCount(0));
    dispatch(resetPrice(0));
  };

  const onCheckOut = () => {
    const error = [];
    cart.forEach((item) => {
      if (item.category.includes("cloth") && item.size === "") {
        error.push("Choose cloth size")
      }
    });
    if (error.length > 0) setSizeError(error[0]);

    if (loggedIn && error.length === 0) {
      setSizeError("");
      setShowUserData(true);
    } else if (!loggedIn && error.length === 0) {
      setSizeError("");
      setShowLogin(true);
    }
  };

  const onBuy = (cart) => {
    if (
      !loggedInUser.name ||
      !loggedInUser.surname ||
      !loggedInUser.street ||
      !loggedInUser.streetNumber ||
      !loggedInUser.zipCode ||
      !loggedInUser.city
    ) {
      setShippingDataError("Fill in shipping data");
      return;
    }

    dispatch(resetCart([]));
    dispatch(resetCount(0));
    dispatch(resetPrice(0));

    const orderedProducts = cart.map((item) => {
      return { id: item.id, quantity: item.quantity, image: item.image, title: item.title };
    });
    const orderDate = `${new Date().getDate()} / ${
      new Date().getMonth() + 1
    } / ${new Date().getFullYear()}`;

    setNewOrder({
      orderPrice: (totalPrice + shippingPrice).toFixed(2),
      orderId: parseInt(Math.random() * Math.pow(10, 7)),
      date: orderDate,
      products: orderedProducts,
    });
    setPostOrder(true);
    setIsLoading(true);
  };

  useEffect(() => {
    if (postOrder && !shippingDataError) {
      addOrder(loggedInUser.id, newOrder, () => setThanks(true));
      setIsLoading(false);
    }
  }, [postOrder]);

  return (
    <>
      <main className="container cart_container">
      {isLoading && <Loading text="SENDING ORDER" />}
        {thanks && <Thanks newOrder={newOrder} bankAccount={bankAccount} />}
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
            onCheckOut={onCheckOut}
            loggedIn={loggedIn}
            showLogin={showLogin}
            sizeError={sizeError}
          />
        )}

        {loggedIn && showUserData && cart.length > 0 && (
          <CartShipping
            bankAccount={bankAccount}
            loggedInUser={loggedInUser}
            shippingDataError={shippingDataError}
            setShippingDataError={setShippingDataError}
            onBuy={onBuy}
            cart={cart}
          />
        )}
      
      </main>
    </>
  );
}
