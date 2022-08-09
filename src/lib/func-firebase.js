import {
  doc,
  addDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "./init-firebase";

const usersCollectionRef = collection(db, "users");
const faqCollectionRef = collection(db, "faq");

// const getUsers = (successCallback) => {
//   getDocs(usersCollectionRef)
//     .then((response) => {
//       successCallback(response);
//     })
//     .catch((err) => console.log(err.message));
// };

export const getUserDoc = async id => {
  const userRef = doc(db, "users", id);

  try {
   const userDoc = await getDoc(userRef)
   console.log(userDoc.data())
   return userDoc.data(); 
  } catch (error) {
    console.log('An error occurred when fetching user docs')
  }
}

export const addOrder = (id, order, successcallback) => {
  const userRef = doc(db, "users", id);
  updateDoc(userRef, {
    orders: arrayUnion(order),
  })
    .then((response) => {
      console.log("User edited");
      successcallback();
    })
    .catch((err) => console.log(err.message));
};

export const getFAQ = (successCallback) => {
  getDocs(faqCollectionRef)
    .then((response) => {
      console.log(response.docs);
      successCallback(response);
    })
    .catch((err) => console.log(err.message));
};
