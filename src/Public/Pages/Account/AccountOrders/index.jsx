import Order from './Order';

import styles from './index.module.scss';

const AccountOrders = ({ orders }) => {
  console.log(orders)
  return (
    <div className={styles.orders_wrapper}>
      {orders.length === 0 && (
        <h2 className={styles.no_orders}>Todavía no creaste una orden!</h2>
      )}

      {orders.length > 0 && (
        <>
          <h2 className={styles.title}>Mis Ordenes</h2>
          <div className={styles.orders_list}>
            {orders.map((order) => (
              <Order
                key={order.id}
                id={order.id}
                items={order.order_items}
                date={order.created_at}
                order = {order}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AccountOrders;
