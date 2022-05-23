import "./_Form.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loggedInUserData } from "../../redux/userSlice";
import { logIn } from "../../redux/logInSlice";
import Button from "../Button/Button";
import { postUser, getUsers } from "../../lib/func-firebase";

export default function FormSignUp({
  formData,
  onInputChange,
  users,
  setUsers,
}) {
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  const checkNewUser = (e) => {
    e.preventDefault();
    setErrors([]);
    const newErrors = [];

    if (users.find((user) => user.email === formData.email)) {
      console.log();
      newErrors.push("The user is already registered");
    }
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
      const newUser = {
        email: formData.email,
        password: formData.password,
        name: "",
        surname: "",
        phone: "",
        street: "",
        streetNumber: "",
        zipCode: "",
        city: "",
        orders: [],
      };
      postUser(newUser, () =>
        getUsers((response) => {
          const usersFromFirebase = response.docs.map((doc) => ({
            email: doc.data().email,
            // password: doc.data().password,
            // name: doc.data().name,
            // surname: doc.data().surname,
            // phone: doc.data().phone,
            // street: doc.data().street,
            // streetNumber: doc.data().streetNumber,
            // zipCode: doc.data().zipCode,
            // city: doc.data().city,
            // orders: doc.data().orders,
            id: doc.id,
          }));
          setUsers(usersFromFirebase);
          const isUserInDatabase = usersFromFirebase.find((user) => {
            return user.email === formData.email;
          });
          dispatch(loggedInUserData({ ...isUserInDatabase }));
          dispatch(logIn());
        })
      );
      setErrors("");
    }
  };

  return (
    <>
      <form className="form_container" onSubmit={checkNewUser}>
        <input
          type="email"
          name="email"
          placeholder="Your email"
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
        <input
          type="password"
          name="repeatPassword"
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
