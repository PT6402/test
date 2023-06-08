/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";

import styles from "./index.module.scss";
import { useProfile } from "../../../../Hooks/useProfile";
import { useKeyDown } from "../../../../Hooks/useKeyDown";
import Toast from "../../../../Components/Toast";
import ToastMessage from "../../../../Components/ToastMessage";
import Loader from "../../../../Components/Loader";

const ChangePassword= ({ toggleChangePassword, OldPassword }) => {
    //hook
    const {  ChangePassword, isLoading, error } = useProfile();
    //
    const [notification, setNotification] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);
    //
    const oldPassInput = useRef();
    const newPassInput = useRef();
    const cfmPassInput = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await ChangePassword({
            oldPass: oldPassInput.current.value,
            newPass: newPassInput.current.value,
            password_confirmation: cfmPassInput.current.value,
        });
        setNotification(true);
    };

    useEffect(() => {
        if (notification) {
            if (error) {
                setToastMessage({ error, details: error.details });
                setNotification(false);
            } else {
                toggleChangePassword();
            }
        }
    }, [error, notification, toggleChangePassword]);

    const toggleToast = () => {
        setToastMessage(null);
    };

    useKeyDown(() => {
        toggleChangePassword();
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
                    <h2 className={styles.title}>Change Password</h2>
                    <div className={styles.form_inputs_wrapper}>
                        {/* Name */}
                        <label className={styles.label}>
                            <span>Old Password:</span>
                            <input
                                className={styles.input}
                                type="password"
                                placeholder="old password"
                                required
                                ref={oldPassInput}
                                defaultValue={OldPassword}
                            />
                        </label>
                        {/* phone */}
                        <label className={styles.label}>
                            <span>New Password:</span>
                            <input
                                className={styles.input}
                                placeholder="new password"
                                type="password"
                                ref={newPassInput}
                              
                            />
                        </label>
                        <label className={styles.label}>
                            <span>Confirm Password:</span>
                            <input
                                className={styles.input}
                                placeholder="confirm password"
                                type="password"
                                ref={cfmPassInput}
                              
                            />
                        </label>
                    </div>
                    <div className={styles.button_wrapper}>
                        <button
                            form="form"
                            className={styles.button}
                            type="submit"
                        >
                            Change
                        </button>
                    </div>
                </form>
            )}
        </>
    );
};

export default ChangePassword;
