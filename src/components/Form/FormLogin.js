import "./_Form.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/logInSlice";
import Button from "../Button/Button";
import { signInUserWithEmailAndPassword } from "../../lib/auth-firebase";
import { useNavigate } from "react-router-dom";
import { OutlinedInput } from "@mui/material";
import CustomInput from "../CustomInput/CustomInput";

export default function FormLogin({ formData, onInputChange }) {
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

if (!formData.email || !formData.password) {
  setError("Please provide your email / password")
  return
}

    try {
      const { user } = await signInUserWithEmailAndPassword(
        formData.email,
        formData.password
      );
      dispatch(logIn());
      navigate(`/user/${user.uid}`)
      setError("");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setError("incorrect email");
          break;
        case "auth/user-not-found":
          setError("user not found");
          break;
        case "auth/wrong-password":
          setError("wrong password");
          break;
        default:
          console.log(error);
          break;
      }
    }
  };

  return (
    <>
      <form className="form_container" onSubmit={onSubmit}>
             <OutlinedInput
          color="secondary"
          placeholder="Your email"
          type="email"
          name="email"
          value={formData.email}
          onChange={onInputChange}
          required
        />
          <CustomInput
          name="password"
          inputType="password"
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
