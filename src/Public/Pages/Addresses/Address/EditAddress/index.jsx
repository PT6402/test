/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";

// import { useAddress } from "../../../../../../hooks/useAddress";
// import { useKeyDown } from "../../../../../../hooks/useKeyDown";

// import Loader from "../../../../../../components/Loader";

import styles from "./index.module.scss";
import { useAddress } from "../../../../Hooks/useAddress";
import { useKeyDown } from "../../../../Hooks/useKeyDown";
import Loader from "../../../../Components/Loader";

const EditAddress = ({
    toggleEditAddressModal,
    address,
    note,
    default_address,
    city_province,
    id
}) => {
    const { editAddress, isLoading, error } = useAddress();
    // const { editAddress, isLoading, error } = [];

    const [isChecked, setIsChecked] = useState(default_address);
    const [toggle, setToggle] = useState(false);

    const handleCheckboxInput = () => {
        setIsChecked((prevState) => !prevState);
    };

    const addressInput = useRef();
    const noteInput = useRef();
    const city_provinceInput = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await editAddress({
            address: addressInput.current.value,
            note: noteInput.current.value,
            city_province: city_provinceInput.current.value,
            default_address: isChecked,
            id
        });

        setToggle(true);
    };

    useEffect(() => {
        if (toggle && !error) {
            toggleEditAddressModal();
        } else {
            setToggle(false);
        }
    }, [error, toggle, toggleEditAddressModal]);

    useKeyDown(() => {
        toggleEditAddressModal();
    }, ["Escape"]);

    return (
        <>
            {isLoading && (
                <Loader
                    noPortal={true}
                    wrapperClassName={styles.loader_wrapper}
                />
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
                            <span>City/Province:</span>
                            <input
                                className={styles.input}
                                type="text"
                                required
                                ref={city_provinceInput}
                                defaultValue={city_province}
                            />
                        </label>
                        <label className={styles.label}>
                            <span>Note:</span>
                            <input
                                className={styles.input}
                                type="text"
                                inputMode="numeric"
                                required
                                ref={noteInput}
                                defaultValue={note}
                            />
                        </label>
                        <label className={styles.checkbox}>
                            <input
                                className={styles.input}
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxInput}
                                disabled={default_address}
                            />
                            <div>Default address</div>
                        </label>
                    </div>
                    <div className={styles.button_wrapper}>
                        <button
                            form="form"
                            className={styles.button}
                            type="submit"
                        >
                            Edit
                        </button>
                    </div>
                </form>
            )}
        </>
    );
};

export default EditAddress;
