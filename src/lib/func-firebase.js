import {
  doc,
  addDoc,
  collection,
  getDocs,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "./init-firebase";

const usersCollectionRef = collection(db, "users");
const faqCollectionRef = collection(db, "faq");

const getUsers = (successCallback) => {
  getDocs(usersCollectionRef)
    .then((response) => {
      successCallback(response);
    })
    .catch((err) => console.log(err.message));
};

// const postUser = (user, successCallback) => {
//   addDoc(usersCollectionRef, {
//     email: user.email,
//     password: user.password,
//     name: user.name,
//     surname: user.surname,
//     phone: user.phone,
//     street: user.street,
//     streetNumber: user.streetNumber,
//     zipCode: user.zipCode,
//     city: user.city,
//     orders: user.orders,
//   })
//     .then((response) => {
//       console.log("User posted");
//       successCallback();
//     })
//     .catch((err) => console.log(err.message));
// };

// const editUser = (
//   id,
//   name,
//   surname,
//   phone,
//   street,
//   streetNumber,
//   zipCode,
//   city
// ) => {
//   const docUsersRef = doc(db, "users", id);
//   updateDoc(docUsersRef, {
//     name: name,
//     surname: surname,
//     phone: phone,
//     street: street,
//     streetNumber: streetNumber,
//     zipCode: zipCode,
//     city: city,
//   })
//     .then((response) => {
//       console.log("User edited");
//     })
//     .catch((err) => console.log(err.message));
// };

const addOrder = (id, order, successcallback) => {
  const docUsersRef = doc(db, "users", id);
  updateDoc(docUsersRef, {
    orders: arrayUnion(order),
  })
    .then((response) => {
      console.log("User edited");
      successcallback();
    })
    .catch((err) => console.log(err.message));
};

const getFAQ = (successCallback) => {
  getDocs(faqCollectionRef)
    .then((response) => {
      console.log(response.docs);
      successCallback(response);
    })
    .catch((err) => console.log(err.message));
};

export { usersCollectionRef, getUsers, addOrder, getFAQ };
