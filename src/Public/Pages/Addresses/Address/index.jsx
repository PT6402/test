/* eslint-disable react/prop-types */
import { useState } from "react";

import { FaTrash } from "react-icons/fa";

import EditAddress from "./EditAddress";

import styles from "./index.module.scss";
import CenterModal from "../../../Components/CenterModal";

const Address = ({
    id,
    address,
    note,
    city_province,
    default_address,
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
                        note={note}
                        city_province={city_province}
                        default_address={default_address}
                        id={id}
                    />
                )}
            </CenterModal>
            <div className={styles.card}>
                {default_address && (
                    <h3 className={styles.title}>Default address</h3>
                )}
                <div className={styles.content}>
                    <ul className={styles.info}>
                        <li>{address}</li>
                        <li>{city_province}</li>
                    </ul>
                    <div className={styles.controls}>
                        <div
                            className={styles.edit}
                            onClick={toggleEditAddressModal}
                        >
                            Edit
                        </div>
                        <div className={styles.delete}>
                            <FaTrash
                                className={styles.delete_icon}
                                onClick={handleDelete}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Address;
