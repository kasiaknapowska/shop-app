import "./_Thanks.scss";

export default function Thanks({ newOrder, bankAccount }) {
  return (
    <section className="thanks_container">
      <h2>Thank you for your order no. {newOrder.orderId}!</h2>
      <p>Our bank account for money transfer is {bankAccount}</p>
      <p>Transfer recipient: SHOP, Lolo Street 24, Hongkong</p>
      <p>Transfer title: Order ID {newOrder.orderId}</p>
      <p>
        As soon as we receive your payment we will send your products by FedEx
        courier.
      </p>
    </section>
  );
}
