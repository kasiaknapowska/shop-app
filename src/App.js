import "./App.scss";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { onAuthStateChangedListener } from "./lib/auth-firebase";
import { useDispatch } from "react-redux";
import { setCurrentUserData } from "./redux/userSlice";
import { getUserDoc } from "./lib/func-firebase";
import { logIn } from "./redux/logInSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        const { email, uid } = user;
        console.log(user);

        const dispatchUser = async () => {
          const userDoc = await getUserDoc(user.uid);
          dispatch(setCurrentUserData({ email, uid, ...userDoc }));
        };

        dispatchUser();
        dispatch(logIn());
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
