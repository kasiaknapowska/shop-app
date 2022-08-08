import "./_Form.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUserData } from "../../redux/userSlice";
import Button from "../Button/Button";
// import { editUser } from "../../lib/func-firebase";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { updateUser } from "../../lib/auth-firebase";

export default function FormEdit({ setEditFormOpen }) {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [formData, setFormData] = useState({
    name: currentUser.name,
    surname: currentUser.surname,
    phone: currentUser.phone,
    street: currentUser.street,
    streetNumber: currentUser.streetNumber,
    zipCode: currentUser.zipCode,
    city: currentUser.city,
    orders: currentUser.orders,
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

  const onEdit = async (e, formData) => {
    e.preventDefault();
    const { name, surname, phone, street, streetNumber, zipCode, city } =
      formData;

   try {
    await updateUser(currentUser.uid, {
      name,
      surname,
      phone,
      street,
      streetNumber,
      zipCode,
      city,
    });
   } catch (error) {
    console.log('User update encountered an error', error.message);
   }

    dispatch(setCurrentUserData(formData));
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
