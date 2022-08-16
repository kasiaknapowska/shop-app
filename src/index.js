import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import LogIn from "./pages/LogIn/LogIn";
import User from "./pages/User/User";
import Info from "./pages/Info/Info";
import FAQ from "./pages/FAQ/FAQ";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="cart" element={<Cart />} />
              <Route path="login" element={<LogIn />} />
              <Route path="user/:id" element={<User />} />
              <Route path="info" element={<Info />} />
              <Route path="faq" element={<FAQ />} />
            </Route>
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
