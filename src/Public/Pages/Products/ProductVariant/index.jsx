/* eslint-disable react/prop-types */


import { useProduct } from '../../../Hooks/useProduct';
import styles from './index.module.scss';

const ProductVariant = ({ id, thumbnail, selectedVariantId ,handleThumbnails}) => {
  const { selectVariant } = useProduct();

  let shouldAddEventHandler = false;
  if (selectedVariantId !== id) {
    shouldAddEventHandler = true;
  }

  const handleSelectVariant = () => {
    if (id === selectedVariantId) {
      return;
    }
    selectVariant(id);
  };

  let variantStyles =
    selectedVariantId === id ? `${styles.thumbnail_selected}` : styles.thumbnail;
console.log(thumbnail)


  return  (
    <div onClick={handleThumbnails}      >

    <img
      className={`${variantStyles}`}
      onClick={shouldAddEventHandler ? handleSelectVariant : undefined }
      src={`http://127.0.0.1:8000${thumbnail}`}
      alt={`${thumbnail}`}
     
    />
    </div>
    
  );
};

export default ProductVariant;
