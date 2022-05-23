import "./_Form.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/logInSlice";
import { loggedInUserData } from "../../redux/userSlice";
import Button from "../Button/Button";

export default function FormLogin({formData, users, onInputChange}) {
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const checkUser = (e) => {
    e.preventDefault();
    const isUserInDatabase = users.find((user) => {
      return (
        user.email === formData.email && user.password === formData.password
      );
    });
    if (!isUserInDatabase) {
      setError("Invalid email or password");
    } else {
      dispatch(logIn());
      dispatch(loggedInUserData({...isUserInDatabase}))
      setError("");
      
    }
  };
 
  return (
    <>
      <form className="form_container" onSubmit={checkUser}>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={onInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={onInputChange}
        />
        <Button type="submit" text="Log in" />
        {error && <p className="error">{error}</p>}
      </form>
      
    </>
  );
}
