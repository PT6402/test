import { useEffect, useState } from "react";

import { useAuthContext } from "./useAuthContext";

import instance from "../../http";
// let id;

export const useAddress = () => {
  const { addresses, dispatch } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [id, setId] = useState(0);
  const userAddresses = [...addresses];
  useEffect(() => {
    if (addresses.length === 0) {
      // addresses.length === 0 ? (isMain = true) : (isMain = false);
      setId(1);
    }
    if (addresses.length > 0) {
      let count = 0;
        for (let i = 0; i < addresses.length; i++) {
          count++;
        }
        console.log(count);
      setId((userAddresses.idAdd =count+1));
    }
  }, [id]);

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
        addresses.length === 0 ? (isMain = true) : (isMain = false);
        addresses.length === 0 ? setId(1) : (isMain = false);
      }
      console.log(addresses);
      console.log(userAddresses);
      console.log(isMain);

      instance
        .post("api/store-address", {
          address,
          city,
          province,
          isMain,
        })
        .then((res) => {
          if (res.data.status == 200) {
            setId(1);
            // console.log(id)
          }
        });
      console.log(id);
      const addressToAdd = {
        address,
        city,
        province,
        idAdd: id,

        isMain,
        label: `${address} - ${city} - ${province}`,
        value: id,
      };

      if (isMain && userAddresses.length > 0) {
        const currentMainAddressIndex = userAddresses.findIndex(
          (address) => address.isMain
        );
        // setId(userAddresses.idAdd+=1);
        
        userAddresses[currentMainAddressIndex].isMain = false;
        userAddresses.unshift(addressToAdd);
      } else {
        // console.log(userAddresses.idAdd);
        userAddresses.push(addressToAdd);
      
      }
      console.log(userAddresses);
      for (let i = 1; i <= addresses.length; i++) {
        userAddresses[i - 1].displayOrder = i;
      }
      dispatch({ type: "UPDATE_ADDRESSES", payload: userAddresses });
      console.log(userAddresses);
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
          (address) => address.idAdd == id
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
            console.log(res.data);
          }
        });
      let updatedAddresses = [...userAddresses];
      if (isMain) {
        updatedAddresses = userAddresses.filter((address) => address.idAdd !== id);

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
        for (let i = 0; i < updatedAddresses.length; i++) {
          updatedAddresses[i].idAdd = i + 1;
        }
      } else {
        const addressToEditIndex = updatedAddresses.findIndex(
          (address) => address.idAdd == id
        );
      
        updatedAddresses[addressToEditIndex] = {
          ...updatedAddress,
        };
      }
      dispatch({ type: "UPDATE_ADDRESSES", payload: updatedAddresses });

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  const deleteAddress = async (id) => {
    console.log(id);
    setError(null);
    setIsLoading(true);

    try {
      const updatedAddresses = userAddresses.filter(
        (address) => address.idAdd != id
      );

      if (updatedAddresses.length > 0) {
        for (let i = 0; i < updatedAddresses.length; i++) {
          updatedAddresses[i].idAdd = i + 1;
        }
        for (let i = 1; i <= updatedAddresses.length; i++) {
          updatedAddresses[i - 1].displayOrder = i;
        }

        const checkForMain = updatedAddresses.find((address) =>( address.isMain==1||address.isMain==true));
        console.log(checkForMain)
        if (!checkForMain) {
          updatedAddresses[0].isMain = true;
          console.log("success")
        }


      }else{
        console.log(id)
      }

      instance.post("api/delete-address", { id });

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
