/* eslint-disable react/prop-types */


import styles from './index.module.scss';
import { useProduct } from './../../../Hooks/useProduct';

const ProductSize = ({ id, value, stock, selectedSize }) => {
  const { selectSize } = useProduct();
  // const { selectSize } = [];

  let addEventHandler = false;
  if (stock > 0 && value !== selectedSize) {
    addEventHandler = true;
  }

  const handleSelectSize = () => {
    if (value === selectedSize) {
      return;
    }
    selectSize({ id, value, stock });
  };

  let sizeStyles = `
    ${styles.size}
    ${value === selectedSize && styles.fill}
    ${stock <= 0 && styles.no_stock}
  `;

  return (
    <div
      className={sizeStyles}
      onClick={addEventHandler ? handleSelectSize : undefined}
    >
      {value}
    </div>
  );
};

export default ProductSize;
