import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { BiChevronLeft, BiPlus } from "react-icons/bi";

import styles from "./index.module.scss";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useAddress } from "../../Hooks/useAddress";
import Toast from "../../Components/Toast";
import ToastMessage from "../../Components/ToastMessage";
import CenterModal from "../../Components/CenterModal";
import AddAddress from "./AddAddress";
import Button from "../../Components/Button";
import Loader from "../../Components/Loader";
import Address from "./Address";

const Addresses = () => {
  const { addresses } = useAuthContext();
  const { deleteAddress, isLoading, error } = useAddress();

  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const defaultAddress = addresses.find((address) => address.isMain == 1||address.isMain == true);

  const otherAddresses = addresses.filter((address) => !address.isMain == 0||address.isMain == false);

  const toggleAddAddressModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (error) {
      setToastMessage({ error, details: error.details });
    }
  }, [error]);

  const toggleToast = () => {
    setToastMessage(null);
  };
  console.log(addresses);
  return (
    <>
      <Toast>
        {toastMessage && (
          <ToastMessage toggleToast={toggleToast} content={toastMessage} />
        )}
      </Toast>
      <CenterModal
        modalClassName={styles.modal}
        toggleModal={toggleAddAddressModal}
      >
        {isOpen && <AddAddress toggleAddAddressModal={toggleAddAddressModal} />}
      </CenterModal>
      <section>
        <div className={`${styles.container} main-container`}>
          <Link className={styles.back_button} to="/account">
            <span>
              <BiChevronLeft />
            </span>
            Volver a mi cuenta
          </Link>
          <div className={styles.header_wrapper}>
            <p className={styles.title}>Mis direcciones</p>
            <Button
              className={styles.add_button}
              onClick={toggleAddAddressModal}
            >
              <span>
                <BiPlus />
              </span>
              Agregar nueva direccion
            </Button>
          </div>

          <div className={styles.addresses_container}>
            {isLoading && (
              <Loader
                wrapperClassName={styles.loader_wrapper}
                noPortal={true}
              />
            )}
            {!isLoading && (
              <>
                {addresses.length === 0 && (
                  <h2 className={styles.no_addresses}>
                    Todavia no agregaste una direccion!
                  </h2>
                )}

                {addresses.length > 0 && (
                  <div className={styles.addresses_list}>
                    {defaultAddress && (
                      <Address
                      key={defaultAddress.idAdd}
                        address={defaultAddress.address}
                        city={defaultAddress.city}
                        province={defaultAddress.province}
                        id={defaultAddress.idAdd}
                        isMain={defaultAddress.isMain}
                        onDelete={deleteAddress}
                      />
                    )}
                    {otherAddresses.map((address,index) => (
                      <Address
                        key={index}
                        address={address.address}
                        city={address.city}
                        province={address.province}
                        id={address.idAdd}
                        isMain={address.isMain}
                        displayOrder={address.displayOrder}
                        onDelete={deleteAddress}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Addresses;
