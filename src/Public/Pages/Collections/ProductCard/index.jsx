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
  collection,
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
          <div to={`/product/${slug}/${url}`} className={styles.link}>
            <div className={styles.image_wrapper}>
              {[_imageTop][0] && (
                <>
                  <Link to={`/product/${slug}/${url}`} >
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
              <div className={styles.favorite}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path
                    d="M43 17.077c0-5.654-4.583-10.238-10.237-10.238-3.723 0-6.971 1.993-8.763 4.964-1.792-2.97-5.04-4.964-8.763-4.964C9.583 6.84 5 11.423 5 17.077c0 1.292.25 2.524.687 3.662C9.072 30.476 24 41.161 24 41.161s14.928-10.685 18.314-20.422c.437-1.138.686-2.37.686-3.662Z"
                    style={{
                      fill: "none",
                      stroke: "#000",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                    }}
                  />
                </svg>
              </div>
            </div>
          </div>
        </Card>
        <ul className={styles.info_wrapper}>
          <li className={styles.title}>
            {model} {type} {collection}
          </li>
          <div className={styles.priceColor}>
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
