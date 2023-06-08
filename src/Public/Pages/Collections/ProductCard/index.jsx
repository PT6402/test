/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { Link } from "react-router-dom";

import { formatNumber } from "../../../helpers/format";

import styles from "./index.module.scss";
import Card from "../../../components/Card";

const ProductCard = ({
  model,
  color,
  price,
  type,
  slug,
  url,
  _imageTop,
  _imageBottom,
  numberOfVariants,
}) => {
  // const imageTop = require(`../../../../../assets/${_imageTop}`);
  // const imageBottom = require(`../../../../../assets/${_imageBottom}`);
  // const imageTop = '';
  // const imageBottom = '';
  // console.log([_imageTop][0].url)

  return (
    <>
      <div className={styles.card_wrapper}>
        <Card className={styles.card}>
          <Link to={`/product/${slug}/${url}`} className={styles.link}>
            <div className={styles.image_wrapper}>
              {[_imageTop][0] && (
                <>
                  <img
                    src={`http://127.0.0.1:8000${_imageTop.url}`}
                    alt=""
                    className={styles.image_top}
                  />
                  <img
                    src={`http://127.0.0.1:8000${_imageBottom.url}`}
                    alt=""
                    className={styles.image_bottom}
                  />
                </>
              )}
            </div>
          </Link>
        </Card>
        <ul className={styles.info_wrapper}>
          <li className={styles.title}>
            {type} {model}
          </li>
          <li className={styles.color}>
            {color}
            {numberOfVariants > 1 && (
              <span>{`${numberOfVariants} colores`}</span>
            )}
          </li>
          <li className={styles.price}>${price}</li>
        </ul>
      </div>
    </>
  );
};

export default ProductCard;
