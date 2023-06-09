import { useState } from "react";

import { FaTrash } from "react-icons/fa";

import styles from "./index.module.scss";
import CenterModal from "../../../Components/CenterModal";
import EditAddress from "./EditAddress";

const Address = ({
  id,
  address,
  city,
  province,
  isMain,
  displayOrder,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleEditAddressModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleDelete = async () => {
    await onDelete(id);
  };

  return (
    <>
      <CenterModal
        modalClassName={styles.modal}
        toggleModal={toggleEditAddressModal}
      >
        {isOpen && (
          <EditAddress
            toggleEditAddressModal={toggleEditAddressModal}
            address={address}
            city={city}
            province={province}
            isMain={isMain}
            id={id}
            displayOrder={displayOrder}
          />
        )}
      </CenterModal>
      <div className={styles.card}>
        {isMain && <h3 className={styles.title}>Default address</h3>}
        {!isMain && <h3 className={styles.title}>Address {displayOrder}</h3>}
        <div className={styles.content}>
          <ul className={styles.info}>
            <li>{address}</li>
            <li>{city},</li>
            <li>{province}</li>
          </ul>
          <div className={styles.controls}>
            <div className={styles.edit} onClick={toggleEditAddressModal}>
              Edit
            </div>
            <div className={styles.delete}>
              <FaTrash className={styles.delete_icon} onClick={handleDelete} />
            </div>
          </div>
        </div>      
      </div>
    </>
  );
};
export default Address;
