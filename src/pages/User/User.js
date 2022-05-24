import "./_User.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import FormEdit from "../../components/Form/FormEdit";
import OrdersList from "../../components/OrdersList/OrdersList";
import { usersCollectionRef, getUsers } from "../../lib/func-firebase";
import { onSnapshot } from "firebase/firestore";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";

export default function User() {
  const loggedIn = useSelector((state) => state.logIn.loggedIn);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn === false) navigate("/login");
  }, [loggedIn]);

  useEffect(() => {
    getUsers((response) => {
      const usersFromFirebase = response.docs.map((doc) => ({
        orders: doc.data().orders,
        id: doc.id,
      }));
      usersFromFirebase.filter(user => {
        if (user.id === loggedInUser.id) {
          setUserOrders(user.orders)
        }
      });
    });
  }, []);

  // Realtime  watching firestore database
  useEffect(() => {
    const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
      const usersFromFirebase = snapshot.docs.map((doc) => ({
        orders: doc.data().orders,
        id: doc.id,
      }));
      usersFromFirebase.filter(user => {
        if (user.id === loggedInUser.id) {
          setUserOrders(user.orders)
        }
      });
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <main className="container">
      <h1>Your profile</h1>
      <span className="user_id">
        User ID: {loggedInUser.id && loggedInUser.id}
      </span>
      <div className="btns_container">
        <Button
          text="Go to cart"
          type="primary"
          icon="checkout"
          onClick={() => navigate("/cart")}
        />
        <Button
          text={loggedInUser.name ? "Edit data" : "Fill in data"}
          type="secondary"
          icon="edit"
          onClick={() => setEditFormOpen(true)}
        />
      </div>
      {editFormOpen && <FormEdit setEditFormOpen={setEditFormOpen} />}
      {loggedInUser && (
        <>
          <section className="user">
            <div className="user_data">
              <div>
                <h2>Personal data</h2>
                <ul>
                  <li>
                    {loggedInUser.name
                      ? `${loggedInUser.name} ${loggedInUser.surname}`
                      : "Your name here"}
                  </li>
                  <li className="icon_li">
                    <MailOutlineRoundedIcon fontSize="small" />
                    &nbsp;&nbsp;{loggedInUser.email}
                  </li>
                  <li className="icon_li">
                    <PhoneAndroidOutlinedIcon fontSize="small" />
                    &nbsp;&nbsp;
                    {loggedInUser.phone ? loggedInUser.phone : "Phone No."}
                  </li>
                </ul>
              </div>
              <div>
                <h2>Shipping address</h2>
                <ul>
                  <li>
                    {loggedInUser.name
                      ? `${loggedInUser.street} ${loggedInUser.streetNumber}`
                      : "Address here"}
                  </li>
                  <li>
                    {loggedInUser.zipCode} {loggedInUser.city}
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <section className="orders">
            <h2>Your orders</h2>
            {userOrders.length === 0 ? <p>You don't have any orders yet</p> : <OrdersList userOrders={userOrders}/>}
          </section>
        </>
      )}
    </main>
  );
}
