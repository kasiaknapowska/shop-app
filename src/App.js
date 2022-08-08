import "./App.scss";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { onAuthStateChanged } from "firebase/auth";
import { onAuthStateChangedListener } from "./lib/auth-firebase";
import { useDispatch } from "react-redux";
import { setCurrentUserData } from "./redux/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        const { displayName, email, uid } = user;
        dispatch(setCurrentUserData({ displayName, email, uid }));
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
