import "./_Form.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/logInSlice";
import Button from "../Button/Button";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  updateUserProfile,
} from "../../lib/auth-firebase";
import { useNavigate } from "react-router-dom";
import { OutlinedInput } from "@mui/material";
import CustomInput from "../CustomInput/CustomInput";

export default function FormSignUp({ formData, onInputChange }) {
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const onSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);
    const newErrors = [];

    if (!formData.email.includes("@")) {
      newErrors.push("Email must contain @");
    }
    if (formData.password.length < 8 || formData.repeatPassword.length < 8) {
      newErrors.push("Password must contain minimum 8 signs");
    }
    if (formData.password !== formData.repeatPassword) {
      newErrors.push("Passwords must be the same");
    }
    if (!checked) {
      newErrors.push("Checkbox must be checked");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const { user } = await createAuthUserWithEmailAndPassword(
          formData.email,
          formData.password
        );
        const displayName = formData.email;

        await createUserDocumentFromAuth(user, { displayName });
        await updateUserProfile({ displayName });
        dispatch(logIn());
        navigate(`/user/${user.uid}`);
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          alert("Cannot create a user, email already in use");
        }
        console.log("user creation encontered an error", error.message);
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
          <CustomInput
          name="repeatPassword"
          inputType="password"
          placeholder="Repeat passwsord"
          value={formData.repeatPassword}
          onChange={onInputChange}
        />
        <label className="checkbox">
          <input type="checkbox" onClick={() => setChecked(!checked)} />
          <span></span>
          Spicy jalapeno bacon ipsum dolor amet ground round pork voluptate
          aliquip incididunt pariatur.
        </label>
        <Button type="submit" text="Sign up" />
        {errors &&
          errors.map((error, i) => {
            return (
              <p key={i} className="error">
                {error}
              </p>
            );
          })}
      </form>
    </>
  );
}
