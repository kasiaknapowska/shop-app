import { initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore'

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOG6WeIkeiLkB8pStpROT-fSK3I6pl_mw",
  authDomain: "shop-app-e95a4.firebaseapp.com",
  projectId: "shop-app-e95a4",
  storageBucket: "shop-app-e95a4.appspot.com",
  messagingSenderId: "870236596656",
  appId: "1:870236596656:web:36937e0728ceacf5730e75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize firestore
export const db = getFirestore(app)

