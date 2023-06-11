import React, { useEffect, useRef, useState } from "react";
import DetailsThumb from "../SlickImageProduct";
import styles from "./index.module.scss";

export default function ImageDetail({ selectedVariant }) {
  const [index, setIndex] = useState(0);
  const myRef = useRef("");

  const handleTab = (index) => {
    setIndex(index);
    if (myRef.current) {
      const images = myRef.current.children;
      for (let i = 0; i < images.length; i++) {
        images[i].className = images[i].className.replace("active", "");
      }
      images[index].className = "active";
    }
  };

  useEffect(() => {
    if (myRef.current) {
      myRef.current.children[index].className = "active";
    }
  }, [index]);

  useEffect(() => {
    // Xóa giá trị của myRef khi selectedVariant thay đổi
    myRef.current = "";
    setIndex(0);
  }, [selectedVariant]);

  console.log(index);
  return (
    <div className={`${styles.image_wrapper}`}>
      <div className={styles.imageMain}>
        {selectedVariant.images.map((image, i) => {
          console.log("abdc",i,index)
          if (i === index) {
            return (
              <img key={image.i} src={`http://127.0.0.1:8000${image.url}`} />
            );
          }
        })}
      </div>
      {selectedVariant && (
        <DetailsThumb
          images={selectedVariant.images}
          tab={handleTab}
          myRef={myRef}
        />
      )}
    </div>
  );
}
