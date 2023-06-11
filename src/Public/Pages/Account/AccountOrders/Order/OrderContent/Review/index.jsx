/* eslint-disable react/prop-types */
import { Link, useParams } from "react-router-dom";

import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

import styles from "./index.module.scss";
import Card from "../../../../../../components/Card";
import Rating from "react-rating";
import IconFull, { IconEmpty } from "../../../../../Products/icon";

const Review = ({
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
      console.log(item);
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

  const clearProduct = urlId === url && "/product";

  return (
    <Card className={styles.card}>
    
      <div className={styles.info_container}>
          <Rating
            initialRating={0}
            readonly
            emptySymbol={<IconEmpty href="#icon-star-empty" className="icon" />}
            fullSymbol={<IconFull href="#icon-star-full" className="icon" />}
          />
        <div className={styles.info_wrapper}>
          <div className={styles.title}>
          
          <span className={`${styles.textarea}`} role="textbox" contentEditable={true}></span>
          </div>
      
        </div>
       
      </div>
     

      <div className={styles.controls_wrapper}>
        <div className={styles.button_wrapper}>
          <button form="form" className={styles.button} type="submit">
            submit review
          </button>
        </div>
      
      </div>
    </Card>
  );
};

export default Review;
