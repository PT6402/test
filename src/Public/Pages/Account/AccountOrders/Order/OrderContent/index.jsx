import Button from "../../../../../Components/Button";
import { useKeyDown } from "../../../../../Hooks/useKeyDown";
import { totalCartAmount, totalOrderAmount } from "../../../../../helpers/cart";
import { formatDate } from "../../../../../helpers/format";

import styles from "./index.module.scss";
import DialogModal from "./../../../../../Components/Dialog/index";
import Review from "./Review/index";

const OrderContent = ({ toggleOrderModal, id, items, date, order, status}) => {
  useKeyDown(() => {
    toggleOrderModal();
  }, ["Escape"]);

  console.log(order);
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
                {`${item.product_details.subcategory_name} ${item.product_name} - ${item.color_name} -${item.product_details.category_name}`}
              </p>
              <div className={styles.size}>{item.size_name}</div>
            </div>
            <p className={styles.price}>
              ${item.product_details.product_price}
            </p>  

            {status==2&&<div className={`${styles.wrapper_review}`}>
              <Review  status={item.status} comment={item.comment} rate={item.rate} review={item.review}/>
            </div>}
          </div>
        ))}
      </div>
      <div className={styles.modal_footer}>
        <div>
          <span>Total: $ {order.total_price} </span> | {totalOrderAmount(items)}{" "}
          {totalOrderAmount(items) > 1 ? "Items" : "Item"}
          {order.discount_name && (
            <div className={`${styles.tags_wrapper} pl-5 items-center`}>
              <span className={`${styles.tag_alt}`}>
                Discount: {order.discount_value}%{" "}
              </span>
            </div>
          )}
        </div>
        <Button className={styles.button} onClick={toggleOrderModal}>
          Back to my account
        </Button>
      </div>
    </div>
  );
};

export default OrderContent;
