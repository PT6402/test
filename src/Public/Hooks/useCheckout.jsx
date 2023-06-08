import { useState } from 'react';
import { useCheckoutContext } from './useCheckoutContext';
import { useAuthContext } from './useAuthContext';
import { useAddress } from './useAddress';



export const useCheckout = () => {
  const { dispatch } = useCheckoutContext();
  const { user, addresses } = useAuthContext();
  const { createAddress } = useAddress();


  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const selectPreviousStep = () => {
    dispatch({ type: 'SELECT_PREVIOUS_STEP' });
  };

  const selectStep = (index) => {
    dispatch({ type: 'SELECT_STEP', payload: index });
  };

  const submitShippingInfo = async (userInput) => {
    setError(null);
    setIsLoading(true);
    try {
      const { email, isNew, ...shippingAddress } = userInput;

      if (isNew) {
        
        // Se puede agregar el display order aca de ser necesario, loopear por todos los addresses => index + 1 => etc
        await createAddress(shippingAddress);
      }

      shippingAddress.value = shippingAddress.id;
      shippingAddress.label = `${shippingAddress.address} - ${shippingAddress.city} - ${shippingAddress.province}`;

      // await updateDoc(checkoutSessionRef, {
      //   email,
      //   shippingAddress,
      // });

      dispatch({
        type: 'SUBMIT_SHIPPING_INFO',
        payload: { email, shippingAddress },
      });

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  const selectShippingOption = (option) => {
    let selectedOption;
    if (option === 'standard') {
      selectedOption = {
        standard: true,
        express: false,
      };
    } else {
      selectedOption = {
        standard: false,
        express: true,
      };
    }

    dispatch({ type: 'SELECT_SHIPPING_OPTION', payload: selectedOption });
  };

  const submitShippingOption = async (option) => {
    setError(null);
    setIsLoading(true);
    try {
      // await updateDoc(checkoutSessionRef, {
      //   shippingOption: option,
      // });

      dispatch({ type: 'SUBMIT_SHIPPING_OPTION' });

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  const deleteCheckoutSession = async () => {
    setError(null);
    setIsLoading(true);
    try {
      // await deleteDoc(checkoutSessionRef);
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  return {
    selectPreviousStep,
    selectStep,
    submitShippingInfo,
    selectShippingOption,
    submitShippingOption,
    deleteCheckoutSession,
    isLoading,
    error,
  };
};
