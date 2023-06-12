/* eslint-disable react/prop-types */
import { Link, useParams } from "react-router-dom";

import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

import styles from "./index.module.scss";

import Rating from "react-rating";
import Card from "../../../components/Card";
import IconFull, { IconEmpty } from "../icon";

const ReviewProduct = (review) => {
  return (
    <>
      <>
        {[review.review].length > 0 &&
          [review.review][0].map((rev,index) => {
            console.log([review.review])
            return (
              <Card className={styles.card} key={index}>
                <div className={styles.info_container}>
                <div className={styles.info}>{rev.user.name}</div>
                  <Rating
                    initialRating={rev.rate}
                    readonly
                    emptySymbol={
                      <IconEmpty href="#icon-star-empty" className="icon" />
                    }
                    fullSymbol={
                      <IconFull href="#icon-star-full" className="icon" />
                    }
                  />
                  <div className={styles.info_wrapper}>
                    <div className={styles.title}>
                      <span
                        className={`${styles.textarea}`}
                        role="textbox"
                        
                        contentEditable={false}
                      >{rev.comment}</span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
      </>
    </>
  );
};

export default ReviewProduct;
