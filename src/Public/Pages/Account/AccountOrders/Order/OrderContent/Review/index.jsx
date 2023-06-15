/* eslint-disable react/prop-types */
import { Link, useParams } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import styles from "./index.module.scss";
import Card from "../../../../../../components/Card";
import Rating from "react-rating";
import IconFull, { IconEmpty } from "../../../../../Products/icon";
import instance from "../../../../../../../http";
import { useRef, useState } from "react";
import CryptoJS from "crypto-js";
const Review = ({ status, comment, rate, review }) => {
  const [rating, setRating] = useState(rate);
  const [check, setCheck] = useState(status);
  const commentRef = useRef();

  const handleRatingChange = (value) => {
    setRating(value);
    console.log("Rating value:", value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const commentValue = commentRef.current.textContent;
    console.log("Comment value:", commentValue);
    const data = {
      rate: rating,
      comment: commentValue,
      status: 1,
      id: review.id,
    };
    instance.post("api/store-review", data).then((res) => {
      if (res.data.status == 200) {
        setCheck(1);

        instance.get("api/list-product").then((res) => {
          if (res.data.status == 200) {
            const encryptedProduct = CryptoJS.AES.encrypt(
              JSON.stringify(res.data.products),
              "secret_key"
            ).toString();
            localStorage.removeItem("product");
            localStorage.setItem("product", encryptedProduct);
          }
        });
      }
    });
  };
  console.log(status);
  return (
    <Card className={styles.card}>
      <div className={styles.info_container}>
        <Rating
          initialRating={rating}
          readonly={check == 1}
          onChange={handleRatingChange}
          emptySymbol={<IconEmpty href="#icon-star-empty" className="icon" />}
          fullSymbol={<IconFull href="#icon-star-full" className="icon" />}
        />
        <div className={styles.info_wrapper} key={review.id}>
          <div className={styles.title}>
            <span
              className={styles.textarea}
              contentEditable={!check == 1}
              ref={commentRef}
            >
              <span key={review.id}>{comment}</span>
            </span>
          </div>
        </div>
      </div>

      {check == 0 && (
        <div className={styles.controls_wrapper}>
          <div className={styles.button_wrapper}>
            <button
              className={styles.button}
              type="submit"
              onClick={handleFormSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default Review;
