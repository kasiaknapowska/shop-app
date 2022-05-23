import "./_CartShipping.scss";
import { useState, useEffect } from "react";
import FormEdit from "../../components/Form/FormEdit";
import Button from "../Button/Button";

export default function CartShipping({
  bankAccount,
  loggedInUser,
  shippingDataError,
  setShippingDataError,
  onBuy,
  cart,
}) {
  const [editFormOpen, setEditFormOpen] = useState(false);

  useEffect(() => {
    setShippingDataError("");
  }, [editFormOpen]);

  return (
    <section className="shipping_data">
      <div>
        <h2>Payment</h2>
        <p>Money transfer to a bank account: {bankAccount}</p>
      </div>
      <div>
        <h2>Shipping data</h2>
        <p>
          {loggedInUser.name} {loggedInUser.surname}, {loggedInUser.street}{" "}
          {loggedInUser.streetNumber}, {loggedInUser.zipCode}{" "}
          {loggedInUser.city}
        </p>
      </div>
      {editFormOpen && <FormEdit setEditFormOpen={setEditFormOpen} />}

      <Button
        text="Edit data"
        type="secondary"
        icon="edit"
        onClick={() => setEditFormOpen(true)}
      />
      <Button
        text="Buy products"
        type="primary"
        icon="buy"
        onClick={() => onBuy(cart)}
      />
      {shippingDataError && <p className="error">{shippingDataError}</p>}
    </section>
  );
}
