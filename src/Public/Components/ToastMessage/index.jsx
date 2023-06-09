import { useEffect } from 'react';

import { IoIosCheckmarkCircle, IoIosAlert } from 'react-icons/io';

import styles from './index.module.scss';

const ToastMessage = ({ toggleToast, content, className }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      toggleToast();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [content]);

  if (content.addToCartSuccess) {
    const thumbnail = (`http://127.0.0.1:8000${content.thumbnail}`);
    return (
      <div className={`${styles.addToCart} ${styles.success}`}>
        <div className={styles.content_wrapper}>
          <img className={styles.image} src={thumbnail} alt="" />
          <div>
            <p className={styles.title}>Product added to cart.</p>
            <p className={styles.details}>
              {content.details || 'The operation was carried out successfully.'}
            </p>
          </div>
        </div>
        <i className={styles.icon}>
          <IoIosCheckmarkCircle />
        </i>
      </div>
    );
  }
  if (content.addToCartNotSize) {
    // const thumbnail = (`http://127.0.0.1:8000${content.thumbnail}`);
    return (
      <div className={`${styles.addToCartFail} ${styles.fail}`}>
        <div className={styles.content_wrapper}>
          {/* <img className={styles.image} src={thumbnail} alt="" /> */}
          <div>
            <p className={styles.title}>chon size</p>
            <p className={styles.details}>
              {content.details || 'The operation was carried out successfully.'}
            </p>
          </div>
        </div>
        <i className={styles.icon}>
          <IoIosCheckmarkCircle />
        </i>
      </div>
    );
  }

  if (content.error) {
    return (
      <div className={`${styles.error} ${className}`}>
        <div className={styles.content_wrapper}>
          <div>
            <p className={styles.title}>Hubo un error.</p>
            <p className={styles.error_details}>
              {content.details || 'La operacion no pudo ser realizada.'}
            </p>
          </div>
        </div>
        <i className={styles.icon}>
          <IoIosAlert />
        </i>
      </div>
    );
  }
};

export default ToastMessage;
