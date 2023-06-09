import { useState, useEffect, useRef } from 'react';




import styles from './index.module.scss';
import { useAddress } from '../../../../Hooks/useAddress';
import { useKeyDown } from '../../../../Hooks/useKeyDown';
import Loader from '../../../../Components/Loader';

const EditAddress = ({
  toggleEditAddressModal,

  address,

  city,
  province,
  isMain,
  id,
  displayOrder,
}) => {
  const { editAddress, isLoading, error } = useAddress();

  const [isChecked, setIsChecked] = useState(isMain);
  const [toggle, setToggle] = useState(false);

  const handleCheckboxInput = () => {
    setIsChecked((prevState) => !prevState);
  };


  const addressInput = useRef();

  const cityInput = useRef();
  const provinceInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await editAddress({
    
      address: addressInput.current.value,
   
      city: cityInput.current.value,
      province: provinceInput.current.value,
      isMain: isChecked,
      id,
      displayOrder,
    });

    setToggle(true);
  };

  useEffect(() => {
    if (toggle && !error) {
      toggleEditAddressModal();
    } else {
      setToggle(false);
    }
  }, [toggle]);

  useKeyDown(() => {
    toggleEditAddressModal();
  }, ['Escape']);

  return (
    <>
      {isLoading && (
        <Loader noPortal={true} wrapperClassName={styles.loader_wrapper} />
      )}
      {!isLoading && (
        <form id="form" className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Edit Address</h2>
          <div className={styles.form_inputs_wrapper}>
          
           
          
            <label className={styles.label}>
              <span>Address:</span>
              <input
                className={styles.input}
                type="text"
                required
                ref={addressInput}
                defaultValue={address}
              />
            </label>
            <label className={styles.label}>
              <span>City</span>
              <input
                className={styles.input}
                type="text"
                required
                ref={cityInput}
                defaultValue={city}
              />
            </label>
            

            <label className={styles.label}>
              <span>Province:</span>
              <input
                className={styles.input}
                type="text"
                required
                ref={provinceInput}
                defaultValue={province}
              />
            </label>
            <label className={styles.checkbox}>
              <input
                className={styles.input}
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxInput}
                disabled={isMain}
              />
              <div>Default address</div>
            </label>
          </div>
          <div className={styles.button_wrapper}>
            <button form="form" className={styles.button} type="submit">
            Edit
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default EditAddress;
