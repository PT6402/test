/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { Link, useNavigate } from "react-router-dom";

import { formatNumber } from "../../../helpers/format";

import styles from "./index.module.scss";
import Card from "../../../components/Card";
import Rating from "react-rating";
import IconFull, { IconEmpty } from "../../Products/icon";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../Hooks/useAuthContext";
import instance from "../../../../http";

const ProductCard = ({
  id,
  model,
  color,
  price,
  type,
  slug,
  url,
  rate,
  status,
  collection,
  _imageTop,
  _imageBottom,
  numberOfVariants,
  favorite,
  callBack,
}) => {
  const navigate = useNavigate();
  const { isVerified } = useAuthContext();
  const addFa = (id) => {
    if (isVerified) {
      instance.post("api/store-favorite", { id }).then((res) => {
        if (res.data.status == 200) {
          callBack();
          console.log(res.data.favorite);
        }
      });
    } else {
      navigate("/account/login");
    }
  };
  const deleteFa = (id) => {
    instance.post("api/delete-favorite", { id }).then((res) => {
      if (res.data.status == 200) {
        callBack();
        console.log(res.data.favorite);
      }
    });
  };

  return (
    <>
      <div
        className={`${styles.card_wrapper} 
${status == 2 ? styles.sale : status == 3 ? styles.new : ""}
      `}
      >
        <Card className={`${styles.card}`}>
          <div to={`/product/${slug}/${url}`} className={styles.link}>
            <div className={styles.image_wrapper}>
              {[_imageTop][0] && (
                <>
                  <Link to={`/product/${slug}/${url}`}>
                    <img
                      src={`http://127.0.0.1:8000${_imageTop.url}`}
                      // alt={`http://127.0.0.1:8000${_imageTop.url}`}
                      className={styles.image_top}
                    />
                    <img
                      src={`http://127.0.0.1:8000${_imageBottom.url}`}
                      // alt={`http://127.0.0.1:8000${_imageBottom.url}`}
                      className={styles.image_bottom}
                    />
                  </Link>
                </>
              )}
              <span className={styles.price}>${price}</span>

              {status == 2 && (
                <div className={`${styles.tags_wrapper} pl-5 items-center`}>
                  <span className={`${styles.tag_alt}`}>Sale</span>
                </div>
              )}
              {status == 3 && (
                <div className={`${styles.tags_wrapper} pl-5 items-center`}>
                  <span className={`${styles.tag_alt1}`}>New</span>
                </div>
              )}

              <div
                className={`${styles.favorite} ${
                  favorite ? styles.checked : ""
                }`}
              >
                {favorite ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    onClick={() => deleteFa(id)}
                  >
                    <path
                      stroke="#464455"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 11.286L10.8 13 15 9m-3-2.409l-.154-.164c-1.978-2.096-5.249-1.85-6.927.522-1.489 2.106-1.132 5.085.806 6.729L12 19l6.275-5.322c1.938-1.645 2.295-4.623.806-6.729-1.678-2.372-4.949-2.618-6.927-.522L12 6.591z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    onClick={() => addFa(id)}
                  >
                    <path
                      stroke="#464455"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.846 6.427l.154.164.154-.164c1.978-2.096 5.249-1.85 6.927.522 1.489 2.106 1.132 5.085-.806 6.729L12 19l-6.275-5.322c-1.938-1.645-2.295-4.623-.806-6.729 1.678-2.372 4.949-2.618 6.927-.522z"
                    ></path>
                  </svg>
                )}
              </div>
            </div>
          </div>
        </Card>
        <ul className={styles.info_wrapper}>
          <li className={styles.title}>
            {model} {type} {collection}
          </li>
          <div className={styles.priceColor}>
            <li className={styles.rate}>
              <Rating
                initialRating={rate}
                readonly
                emptySymbol={
                  <IconEmpty href="#icon-star-empty" className="icon" />
                }
                fullSymbol={
                  <IconFull href="#icon-star-full" className="icon" />
                }
              />
            </li>

            <li className={styles.color}>
              {color}
              {numberOfVariants > 1 && (
                <span>{`${numberOfVariants} colores`}</span>
              )}
            </li>
          </div>
        </ul>
      </div>
    </>
  );
};

export default ProductCard;
