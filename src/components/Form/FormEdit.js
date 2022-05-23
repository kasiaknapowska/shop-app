import "./_Form.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loggedInUserData } from "../../redux/userSlice";
import Button from "../Button/Button";
import { editUser } from "../../lib/func-firebase";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function FormEdit({ setEditFormOpen }) {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  const [formData, setFormData] = useState({
    // email: loggedInUser.email,
    name: loggedInUser.name,
    surname: loggedInUser.surname,
    phone: loggedInUser.phone,
    street: loggedInUser.street,
    streetNumber: loggedInUser.streetNumber,
    zipCode: loggedInUser.zipCode,
    city: loggedInUser.city,
    orders: loggedInUser.orders,
  });

  const dispatch = useDispatch();

  const onInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value || "",
      };
    });
  };

  const onEdit = (e, formData) => {
    e.preventDefault();
    const { name, surname, phone, street, streetNumber, zipCode, city } =
      formData;
    const newData = {
      // id: loggedInUser.id,
      // email: loggedInUser.email,
      // password: loggedInUser.password,
      name: name,
      surname: surname,
      phone: phone,
      street: street,
      streetNumber: streetNumber,
      zipCode: zipCode,
      city: city,
      // orders: loggedInUser.orders,
    };
    dispatch(loggedInUserData(newData));
    editUser(
      loggedInUser.id,
      name || "",
      surname || "",
      phone || "",
      street || "",
      streetNumber || "",
      zipCode || "",
      city || ""
    );
    setEditFormOpen(false);
  };

  return (
    <>
    <div className="form_edit_bg"></div>
      <div className="form_edit_container">
      <CloseRoundedIcon
          fontSize="large"
          className="close_icon"
          onClick={() => setEditFormOpen(false)}
        />
      <form className="form_container" onSubmit={(e) => onEdit(e, formData)}>
        <label>Personal data</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={onInputChange}
        />
        <input
          type="text"
          name="surname"
          placeholder="Surname"
          value={formData.surname}
          onChange={onInputChange}
        />
        <input
          type="number"
          name="phone"
          placeholder="Phone No"
          value={formData.phone}
          onChange={onInputChange}
        />
        <label>Address</label>
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={formData.street}
          onChange={onInputChange}
        />
        <input
          type="text"
          name="streetNumber"
          placeholder="Street No."
          value={formData.streetNumber}
          onChange={onInputChange}
        />
        <input
          type="text"
          name="zipCode"
          placeholder="Zip code"
          value={formData.zipCode}
          onChange={onInputChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={onInputChange}
        />
        <Button type="submit" text="Save" />
      </form>
      </div>
    </>
    
  );
}
