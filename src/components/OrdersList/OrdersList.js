import "./_OrderList.scss"

export default function OrdersList({ userOrders }) {
  return (
    <>
      {userOrders.map((order) => {
        return (
          <div className="order" key={order.orderId}>
            <h2><span>Order No. {order.orderId}</span><span>{order.date}</span><span>Total: ${order.orderPrice}</span></h2>
            <ul>
                {order.products.map(product => {
                    return (
                        <li className="order_list_product" key={product.id}>
                        <img className="order_img_prev" src={product.image} alt="preview"/>
                        <h3>{product.title} (x {product.quantity})</h3>
                        </li>
                    )
                })}
            </ul>

          </div>
        );
      })}
    </>
  );
}
