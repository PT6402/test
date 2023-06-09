import { useState, useEffect, useRef } from "react";

import styles from "./index.module.scss";
import { useAddress } from "../../../Hooks/useAddress";
import { useKeyDown } from "../../../Hooks/useKeyDown";
import Toast from "../../../Components/Toast";
import Loader from "../../../Components/Loader";
import ToastMessage from "../../../Components/ToastMessage";

const AddAddress = ({ toggleAddAddressModal }) => {
  const { createAddress, isLoading, error } = useAddress();

  const [isChecked, setIsChecked] = useState(false);
  const [notification, setNotification] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const handleCheckboxInput = () => {
    setIsChecked((prevState) => !prevState);
  };

  const addressInput = useRef();

  const cityInput = useRef();
  const provinceInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAddress({
      address: addressInput.current.value,
      city: cityInput.current.value,
      province: provinceInput.current.value,
      isMain: isChecked,
    });

    setNotification(true);
  };

  useEffect(() => {
    if (notification) {
      if (error) {
        setToastMessage({ error, details: error.details });
        setNotification(false);
      } else {
        toggleAddAddressModal();
      }
    }
  }, [notification]);

  const toggleToast = () => {
    setToastMessage(null);
  };

  useKeyDown(() => {
    toggleAddAddressModal();
  }, ["Escape"]);

  return (
    <>
      <Toast>
        {toastMessage && (
          <ToastMessage toggleToast={toggleToast} content={toastMessage} />
        )}
      </Toast>
      {isLoading && (
        <Loader noPortal={true} wrapperClassName={styles.loader_wrapper} />
      )}
      {!isLoading && (
        <form id="form" className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Add Address:</h2>
          <div className={styles.form_inputs_wrapper}>
           
            <label className={styles.label}>
              <span>Address:</span>
              <input
                className={styles.input}
                type="text"
                required
                ref={addressInput}
              />
            </label>
            <label className={styles.label}>
              <span>City:</span>
              <input
                className={styles.input}
                type="text"
                required
                ref={cityInput}
              />
            </label>
            

            <label className={styles.label}>
              <span>Province</span>
              <input
                className={styles.input}
                type="text"
                required
                ref={provinceInput}
              />
            </label>
            <label className={styles.checkbox}>
              <input
                className={styles.input}
                type="checkbox"
                onChange={handleCheckboxInput}
              />
              <div>Default address</div>
            </label>
          </div>
          <div className={styles.button_wrapper}>
            <button form="form" className={styles.button} type="submit">
              
Add
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default AddAddress;
