/* eslint-disable react/prop-types */
import Order from './Order';

import styles from './index.module.scss';

const AccountOrders = ({ orders }) => {
  return (
    <div className={styles.orders_wrapper}>
      {orders.length === 0 && (
        <h2 className={styles.no_orders}>You haven't created an order yet!</h2>
      )}
      {orders.length > 0 && (
        <>
          <h2 className={styles.title}>my orders</h2>
          <div className={styles.orders_list}>
            {orders.map((order) => (
              <Order
                key={order.id}
                id={order.id}
                items={order.items}
                date={order.createdAt}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AccountOrders;
