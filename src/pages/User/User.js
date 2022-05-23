import "./_User.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import FormEdit from "../../components/Form/FormEdit";
// import { usersCollectionRef, getUsers } from "../../lib/func-firebase";
// import { onSnapshot } from "firebase/firestore";
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';

export default function User() {
  const loggedIn = useSelector((state) => state.logIn.loggedIn);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const [editFormOpen, setEditFormOpen] = useState(false);
  // const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn === false) navigate("/login");
  }, [loggedIn]);

  // useEffect(() => {
  //   getUsers((response) => {
  //     const usersFromFirebase = response.docs.map((doc) => ({
  //       email: doc.data().email,
  //       password: doc.data().password,
  //       id: doc.id,
  //     }));
  //     setUsers(usersFromFirebase);
  //   });
  // }, []);

  // // Realtime  watching firestore database
  // useEffect(() => {
  //   const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
  //     setUsers(
  //       snapshot.docs.map((doc) => ({
  //         email: doc.data().email,
  //         name: doc.data().name,
  //         surname: doc.data().surname,
  //         phone: doc.data().phone,
  //         password: doc.data().password,
  //         street: doc.data().street,
  //         streetNumber: doc.data().streetNumber,
  //         zipCode: doc.data().zipCode,
  //         city: doc.data().city,
  //         orders: doc.data().orders,
  //         id: doc.id,
  //       }))
  //     );
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  return (
    <main className="container user_profile_container">
      <h1>Your profile</h1>
      <span className="user_id">
          User ID: {loggedInUser.id && loggedInUser.id}
      </span>
     <div className="btns_container">
     <Button
        text="Go to cart"
        type="primary"
        icon="buy"
        onClick={() => navigate("/cart")}
      />
      <Button
        text="Edit data"
        type="secondary"
        icon="edit"
        onClick={() => setEditFormOpen(true)}
      />
     </div>
      {editFormOpen && <FormEdit setEditFormOpen={setEditFormOpen} />}
      {loggedInUser && (
        <section className="user">
          <div className="user_data">
            <div>
              <h2>Personal data</h2>
              <ul>
                <li>
                  {loggedInUser.name} {loggedInUser.surname}
                </li>
                <li className="icon_li"><PhoneAndroidOutlinedIcon fontSize="small"/>&nbsp;&nbsp;{loggedInUser.email}</li>
                <li className="icon_li"><MailOutlineRoundedIcon fontSize="small"/>&nbsp;&nbsp;{loggedInUser.phone}</li>
              </ul>
            </div>
            <div>
              <h2>Shipping address</h2>
              <ul>
                <li>
                  {loggedInUser.street} {loggedInUser.streetNumber}
                </li>
                <li>
                  {loggedInUser.zipCode} {loggedInUser.city}
                </li>
              </ul>
            </div>
          </div>

          <div className="orders">
            <h2>Your orders</h2>
            <p>You don't have any orders yet</p>
          </div>
        </section>
      )}
    </main>
  );
}
