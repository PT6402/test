/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";

import styles from "./index.module.scss";
import { useProfile } from "../../../../Hooks/useProfile";
import { useKeyDown } from "../../../../Hooks/useKeyDown";
import Toast from "../../../../Components/Toast";
import ToastMessage from "../../../../Components/ToastMessage";
import Loader from "../../../../Components/Loader";

const EditProfile = ({ toggleEditProfile, name, phone }) => {
    //hook
    const { editProfile, isLoading, error } = useProfile();
    //
    const [notification, setNotification] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);
    //
    const nameInput = useRef();
    const phoneNumberInput = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await editProfile({
            name: nameInput.current.value,
            phone: phoneNumberInput.current.value,
        });
        setNotification(true);
    };

    useEffect(() => {
        if (notification) {
            if (error) {
                setToastMessage({ error, details: error.details });
                setNotification(false);
            } else {
                toggleEditProfile();
            }
        }
    }, [error, notification, toggleEditProfile]);

    const toggleToast = () => {
        setToastMessage(null);
    };

    useKeyDown(() => {
        toggleEditProfile();
    }, ["Escape"]);

    return (
        <>
            <Toast>
                {toastMessage && (
                    <ToastMessage
                        toggleToast={toggleToast}
                        content={toastMessage}
                    />
                )}
            </Toast>
            {isLoading && (
                <Loader
                    noPortal={true}
                    wrapperClassName={styles.loader_wrapper}
                />
            )}
            {!isLoading && (
                <form id="form" className={styles.form} onSubmit={handleSubmit}>
                    <h2 className={styles.title}>Edit profile</h2>
                    <div className={styles.form_inputs_wrapper}>
                        {/* Name */}
                        <label className={styles.label}>
                            <span>Name:</span>
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="name"
                                required
                                ref={nameInput}
                                defaultValue={name}
                            />
                        </label>
                        {/* phone */}
                        <label className={styles.label}>
                            <span>Phone:</span>
                            <input
                                className={styles.input}
                                placeholder="phone"
                                type="tel"
                                ref={phoneNumberInput}
                                defaultValue={phone ? phone : ""}
                            />
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

export default EditProfile;
