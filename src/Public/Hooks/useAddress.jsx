import { useState } from "react";

import { useAuthContext } from "./useAuthContext";

import instance from "../../http";

export const useAddress = () => {
  const { addresses, dispatch } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [id, setId] = useState(null);
  const userAddresses = [addresses];

  const createAddress = async ({
    address,
    city,
    province,
    isMain = false,

    // isFromCheckout = null,
  }) => {
    setError(null);
    setIsLoading(true);
    try {
      if (!isMain) {
        userAddresses.length === 0 ? (isMain = true) : (isMain = false);
      }
      console.log(isMain)

      instance
        .post("api/store-address", {
          address,
          city,
          province,
          isMain,
         
        })
        .then((res) => {
          if (res.data.status === 200) {
            setId(res.data.id);
          }
        });
      const addressToAdd = {
        address,
        city,
        province,
        isMain,
        label: `${address} - ${city} - ${province}`,
        value: id,
      };

      if (isMain && userAddresses.length > 0) {
        const currentMainAddressIndex = userAddresses.findIndex(
          (address) => address.isMain
        );

        userAddresses[currentMainAddressIndex].isMain = false||0;

        userAddresses.unshift(addressToAdd);
      } else {
        userAddresses.push(addressToAdd);
      }

      for (let i = 1; i <= userAddresses.length; i++) {
        userAddresses[i - 1].displayOrder = i;
      }
      dispatch({ type: "UPDATE_ADDRESSES", payload: userAddresses });
      console.log(userAddresses)
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  const editAddress = async ({
    address,
    city,
    province,
    isMain,
    id,
    displayOrder,
  }) => {
    setError(null);
    setIsLoading(true);
    try {
      // Check so that there is always at least one address that is default
      if (!isMain) {
        const currentAddressIndex = userAddresses.findIndex(
          (address) => address.id === id
        );

        userAddresses[currentAddressIndex].isMain
          ? (isMain = true)
          : (isMain = false);
      }

      const updatedAddress = {
        id,
        address,
        city,
        province,
        isMain,
        label: `${address} - ${city} - ${province}`,
        value: id,
        displayOrder,
      };

      instance
        .post("api/update-address", {
          id,
          address,
          city,
          province,
          isMain,
        })
        .then((res) => {
          if (res.data.status === 200) {
               console.log(res.data)}
        });
        let updatedAddresses = [...userAddresses];
        if (isMain) {
            updatedAddresses = userAddresses.filter((address) => address.id !== id);
    
            const currentMainAddressIndex = updatedAddresses.findIndex(
              (address) => address.isMain
            );
    
            if (currentMainAddressIndex >= 0) {
              updatedAddresses[currentMainAddressIndex].isMain = false;
            }
    
            updatedAddresses.unshift(updatedAddress);
    
            for (let i = 1; i <= updatedAddresses.length; i++) {
              updatedAddresses[i - 1].displayOrder = i;
            }
          } else {
            const addressToEditIndex = updatedAddresses.findIndex(
              (address) => address.id === id
            );
    
            updatedAddresses[addressToEditIndex] = {
              ...updatedAddress,
            };
          }
          dispatch({ type: 'UPDATE_ADDRESSES', payload: updatedAddresses });

          setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  const deleteAddress = async (id) => {
    console.log(id)
    setError(null);
    setIsLoading(true);

    try {
    
      const updatedAddresses = userAddresses.filter(
        (address) => address.id !== id
      );

      if (updatedAddresses.length > 0) {
        for (let i = 1; i <= updatedAddresses.length; i++) {
          updatedAddresses[i - 1].displayOrder = i;
        }

        const checkForMain = updatedAddresses.find((address) => address.isMain);

        if (!checkForMain) {
          updatedAddresses[0].isMain = true;
        }
      }
 instance.post("api/delete-address",{id})
      // await updateDoc(userRef, {
      //   addresses: updatedAddresses,
      // });

      dispatch({ type: "UPDATE_ADDRESSES", payload: updatedAddresses });

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  return { createAddress, editAddress, deleteAddress, isLoading, error };
};
