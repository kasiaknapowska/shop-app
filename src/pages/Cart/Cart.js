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
import { setCurrentUserOrders } from "../../redux/userSlice";
import { useState, useEffect } from "react";
import { addOrder } from "../../lib/func-firebase";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.changeCart.items);
  const totalPrice = useSelector((state) => state.changePrice.price);
  const currentUser = useSelector((state) => state.user.currentUser);
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

  const onBuy = async (cart) => {   
    if (
      !currentUser.name ||
      !currentUser.surname ||
      !currentUser.street ||
      !currentUser.streetNumber ||
      !currentUser.zipCode ||
      !currentUser.city
    ) {
      setShippingDataError("Fill in shipping data");
      return;
    }

    setIsLoading(true);

    const orderedProducts = cart.map((item) => {
      return { id: item.id, quantity: item.quantity, image: item.image, title: item.title };
    });

    const orderDate = `${new Date().getDate()} / ${
      new Date().getMonth() + 1
    } / ${new Date().getFullYear()}`;

    const newOrder = {
      orderPrice: (totalPrice + shippingPrice).toFixed(2),
      orderId: parseInt(Math.random() * Math.pow(10, 7)),
      date: orderDate,
      products: orderedProducts,
    };

    try {
      addOrder(currentUser.uid, newOrder, () => buyProducts(newOrder));
      
    } catch (error) {
      console.log("Your order was not sent: " + error.message)
    }
    
  };

const buyProducts = (newOrder) => {
  setIsLoading(false);
  setThanks(true);
  setNewOrder(newOrder)
  dispatch(resetCart([]));
  dispatch(resetCount(0));
  dispatch(resetPrice(0));
  dispatch(setCurrentUserOrders(newOrder))
}

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
            currentUser={currentUser}
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
