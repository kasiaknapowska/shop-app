import "./_User.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../components/Button/Button";
import FormEdit from "../../components/Form/FormEdit";
import OrdersList from "../../components/OrdersList/OrdersList";
import { usersCollectionRef, getUsers } from "../../lib/func-firebase";
import { doc, onSnapshot } from "firebase/firestore";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import { db } from "../../lib/init-firebase";
import { setCurrentUserData } from "../../redux/userSlice";

export default function User() {
  const loggedIn = useSelector((state) => state.logIn.loggedIn);
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentUserOrders = useSelector(
    (state) => state.user.currentUser.orders
  );
  const [editFormOpen, setEditFormOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Realtime  watching firestore database
  // useEffect(() => {
  //   const userDocRef = doc(db, "users", currentUser.uid);
  //   const unsubscribe = onSnapshot(userDocRef, (doc) => {
  //   console.log(doc.data())
  //   dispatch(setCurrentUserData(doc.data().orders))
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  return (
    <main className="container">
      <h1>Your profile</h1>
      <span className="user_id">
        User ID: {currentUser.uid && currentUser.uid}
      </span>
      <div className="btns_container">
        <Button
          text="Go to cart"
          type="primary"
          icon="checkout"
          onClick={() => navigate("/cart")}
        />
        <Button
          text={currentUser.name ? "Edit data" : "Fill in data"}
          type="secondary"
          icon="edit"
          onClick={() => setEditFormOpen(true)}
        />
      </div>
      {editFormOpen && <FormEdit setEditFormOpen={setEditFormOpen} />}
      {currentUser && (
        <>
          <section className="user">
            <div className="user_data">
              <div>
                <h2>Personal data</h2>
                <ul>
                  <li>
                    {currentUser.name
                      ? `${currentUser.name} ${currentUser.surname}`
                      : "Your name here"}
                  </li>
                  <li className="icon_li">
                    <MailOutlineRoundedIcon fontSize="small" />
                    &nbsp;&nbsp;{currentUser.email}
                  </li>
                  <li className="icon_li">
                    <PhoneAndroidOutlinedIcon fontSize="small" />
                    &nbsp;&nbsp;
                    {currentUser.phone ? currentUser.phone : "Phone No."}
                  </li>
                </ul>
              </div>
              <div>
                <h2>Shipping address</h2>
                <ul>
                  <li>
                    {currentUser.name
                      ? `${currentUser.street} ${currentUser.streetNumber}`
                      : "Address here"}
                  </li>
                  <li>
                    {currentUser.zipCode} {currentUser.city}
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <section className="orders">
            <h2>Your orders</h2>
            {loggedIn && currentUserOrders ? (
              <OrdersList userOrders={currentUser.orders} />
            ) : (
              <p>You don't have any orders yet</p>
            )}
          </section>
        </>
      )}
    </main>
  );
}
