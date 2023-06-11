/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import ScrollableDiv from "../../../Components/Scroll";
import Slider from "react-slick";
import "../../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../../node_modules/slick-carousel/slick/slick-theme.css";
const DetailsThumb = ({ images, tab, myRef }) => {
  console.log(images.length);

  return (
    <>
      <div
        className={`${styles.thumb}
       ${images.length > 2 ? "w-full" : ""}

       `}
      >
        {/* {images.length == 1 && (
          <Slider slidesToScroll={3} slidesToShow={1}>
            {images.map((img, index) => (
              <div key={index} className={styles.images}>
                <img
                  src={`http://127.0.0.1:8000${img.url}`}
                  alt=""
                  onClick={() => tab(index)}
                />
              </div>
            ))}
          </Slider>
        )} */}

        {images.length == 2 && (
          <Slider slidesToScroll={3} slidesToShow={2}>
            {images.map((img, index) => (
              <div key={index} className={`${styles.images}`}>
                <img
                  src={`http://127.0.0.1:8000${img.url}`}
                  alt=""
                  onClick={() => tab(index)}
                
                />
              </div>
            ))}
          </Slider>
        )}
        {images.length > 2 && (
          <Slider slidesToScroll={2} slidesToShow={3}>
            {images.map((img, index) => (
              <div key={index} className={`${styles.images}`}>
                <img
                  src={`http://127.0.0.1:8000${img.url}`}
                  alt=""
                  onClick={() => tab(index)}
             
                />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </>
  );
};

export default DetailsThumb;
