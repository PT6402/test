/* eslint-disable react/prop-types */
import { Link, useParams } from "react-router-dom";

import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

import styles from "./index.module.scss";

import Rating from "react-rating";
import Card from "../../../components/Card";
import IconFull, { IconEmpty } from "../icon";


const ReviewProduct= ({
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
          
          <span className={`${styles.textarea}`} role="textbox" contentEditable={true}>asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf</span>
          </div>
      
        </div>
       
      </div>
     

     
    </Card>
  );
};

export default ReviewProduct;
