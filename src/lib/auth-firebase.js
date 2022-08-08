import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import { doc, getDoc, setDoc, updateDoc, collection, query, getDocs } from "firebase/firestore";

import { auth, db } from "./init-firebase";

export const currentUser = auth.currentUser;

//sign up / sign in with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

//sign in with google
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGooglePopup = async () => {
  const res = await signInWithPopup(auth, googleProvider);
  const { displayName } = res.user;
  console.log(displayName);
  createUserDocumentFromAuth(res.user, { displayName });
};

//sign in with facebook
const facebookProvider = new FacebookAuthProvider();
export const signInWithFacebookPopup = async () => {
  const res = await signInWithPopup(auth, facebookProvider);
  const { displayName } = res.user;
  console.log(displayName);
  createUserDocumentFromAuth(res.user, { displayName });
};

//export methods
export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const createUserDocumentFromAuth = async (
  userAuth,
  aditionalInformation = {}
) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    const createdAt = new Date();
    const uid = userDocRef.id;

    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
        uid,
        ...aditionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error);
    }
  }

  return userDocRef;
};

export const updateUser = async (id, updates) => {
  const userRef = doc(db, "users", id);
  console.log(id, updates);

  await updateDoc(userRef, updates);
};

export const getCurrentUser = async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      return user;
    }
    return;
  });
};

export const getUserById = async (id) => {
  const collectionRef = collection(db, "users");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  const users = querySnapshot.docs.map((doc) => doc.data());
  const user = users.filter((user) => user.uid === id);
  return user[0];
};
