/* eslint-disable react/prop-types */
import { Link, useParams } from 'react-router-dom';

import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

import Card from '../../../components/Card';

import { formatNumber } from '../../../helpers/format';
import { addItemPrice } from '../../../helpers/item';

import styles from './index.module.scss';

const CartItem = ({
  model,
  type,
  color,
  size,
  price,
  url,
  amount,
  _thumbnail,
  item,
  toggleCartModal,
  addItem,
  removeItem,
  deleteItem,
  isLoading,
}) => {
  const { id: urlId } = useParams();

  const handleAddItem = () => {
    if (!isLoading) {
      addItem(item);
    }
  };

  const handleRemoveItem = () => {
    if (!isLoading) {
      removeItem(item);
    }
  };

  const handleDeleteItem = () => {
    if (!isLoading) {
      deleteItem(item);
    }
  };
//
  // const thumbnail = require(`../../../assets/${_thumbnail}`);

  const clearProduct = urlId === url && '/product';

  return (
    <Card className={styles.card}>
      <Link
        to={`/product/${url}`}
        state={clearProduct}
        onClick={toggleCartModal ? toggleCartModal : ''}
      >
        <div className={styles.info_container}>
          <div className={styles.info_wrapper}>
            <p className={styles.title}>{`${type} ${model}`}</p>
            <p className={styles.color}>{color}</p>
            <p className={styles.size}>{size}</p>
            <p className={styles.price}>${price}</p>
          </div>
          <img className={styles.image} src={`http://127.0.0.1:8000/${_thumbnail}`} alt="" />
        </div>
      </Link>

      <div className={styles.controls_wrapper}>
        <div className={styles.delete_wrapper}>
          <i className={styles.delete_icon} onClick={handleDeleteItem}>
            <FaTrash />
          </i>
        </div>
        <div className={styles.quantity_wrapper}>
          <i className={styles.minus_icon} onClick={handleRemoveItem}>
            <FaMinus />
          </i>
          <div className={styles.quantity}>{amount}</div>
          <i className={styles.plus_icon} onClick={handleAddItem}>
            <FaPlus />
          </i>
        </div>
        <div className={styles.total}>${item.total_price}</div>
      </div>
    </Card>
  );
};

export default CartItem;
