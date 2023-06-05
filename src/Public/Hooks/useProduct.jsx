import { useProductContext } from './useProductContext';

export const useProduct = () => {
  const { selectedProduct, dispatch } = useProductContext();

  const selectVariant = (id) => {
    const variant = selectedProduct.colorSizes.find(
      (variant) => variant.id === id
    );

    dispatch({ type: 'SELECT_VARIANT', payload: variant });
  };

  const selectSize = ({ id, value, stock }) => {
    dispatch({ type: 'SELECT_SIZE', payload: { id, value, stock } });
  };

  return { selectVariant, selectSize };
};
