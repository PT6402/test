



import Button from '../../../../../Components/Button';
import { useKeyDown } from '../../../../../Hooks/useKeyDown';
import { formatDate} from '../../../../../helpers/format';

import styles from './index.module.scss';

const OrderContent = ({ toggleOrderModal, id, items, date ,order}) => {
  useKeyDown(() => {
    toggleOrderModal();
  }, ['Escape']);
  let count=0;
  for (const item of items) {
  for (const item of [items[0].order_items]) {
count++
  }
  }
  console.log(items)
  return (
    <div className={styles.content_container}>
      <div className={styles.modal_header}>
        <h3>Orden #{id}</h3>
        <p className={styles.date}>{formatDate(date)}</p>
      </div>
      <div className={styles.list_wrapper}>
        {items.map((item) => (
          <div key={item.id} className={styles.item_container}>
            <div className={styles.image_wrapper}>
              <img
                className={styles.image}
                src={`http://127.0.0.1:8000${item.product_image}`}
                alt=""
              />
              <div className={styles.amount}>
                <div>{item.quantity}</div>
              </div>
            </div>
            <div className={styles.info_wrapper}>
              <p className={styles.name}>
                {`${item.product_details.subcategory_name} ${item.product_name} - ${item.color_name}`}
              </p>
              <p className={styles.size}>{item.size_name}</p>
            </div>
            <p className={styles.price}>${item.product_details.product_price}</p>
          </div>
        ))}
      </div>
      <div className={styles.modal_footer}>
        <p>
          <span>Total: {order.total_price} </span> |{' '}
          {count}{' '}
          {count > 1 ? 'Items' : 'Item'}
        </p>
        <Button className={styles.button} onClick={toggleOrderModal}>
          Volver a mi cuenta
        </Button>
      </div>
    </div>
  );
};

export default OrderContent;
