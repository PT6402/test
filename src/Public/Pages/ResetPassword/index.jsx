import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
import style from "./index.module.scss";
import { useLogin } from "../../Hooks/useLogin";
import Toast from "../../Components/Toast";
import ToastMessage from "../../Components/ToastMessage";
import Loader from "../../Components/Loader";
import queryString from "query-string";
import axios from "axios";

export default function ResetPassword() {
    // const { state: routerState } = useLocation();
    const [tokenMail, SetTokenMail] = useState("");
    const { login, isLoading, error } = useLogin();
    useEffect(() => {
        const url = window.location.href;
        const parsed = queryString.parseUrl(url);
        const token = parsed.query.token;

        // Thực hiện xử lý với token ở đây
        console.log(token);
        SetTokenMail(token);
    }, []);
    const [toastMessage, setToastMessage] = useState(null);

    const passwordInput = useRef();
    const emailInput = useRef();
    const confirmPasswordInput = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: emailInput.current.value,
            password: passwordInput.current.value,
            password_confirmation: confirmPasswordInput.current.value,
            token: tokenMail,
        };
        axios.post("/api/mailResetPassword", data).then((res) => {
            console.log(res.data.message);
        });
           await login({
            email: emailInput.current.value,
            password: passwordInput.current.value,
        });
    };

    useEffect(() => {
        if (error) {
            setToastMessage({ error, details: error.details });
        }
        console.log(error);
    }, [error]);

    const toggleToast = () => {
        setToastMessage(null);
    };

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
            {isLoading && <Loader />}
            {!isLoading && (
            <>
                <section className={cx("nav_section")}></section>
                <section className={cx("section")}>
                    <div className={cx("container")}>
                        <div className={`${cx("wrapper")} main-container`}>
                            <form
                                onSubmit={handleSubmit}
                                className={cx("form")}
                            >
                                <h2 className={cx("title")}>Reset Password</h2>

                                <label className={cx("label")}>
                                    <span>Email:</span>
                                    <input
                                        className={cx("input")}
                                        type="email"
                                        placeholder="email"
                                        required
                                        ref={emailInput}
                                    />
                                </label>
                                <label className={cx("label")}>
                                    <span>Password:</span>
                                    <input
                                        className={cx("input")}
                                        type="password"
                                        placeholder="password"
                                        required
                                        ref={passwordInput}
                                    />
                                </label>
                                <label className={cx("label")}>
                                    <span>Confirm Password:</span>
                                    <input
                                        className={cx("input")}
                                        type="password"
                                        placeholder="confirm password"
                                        required
                                        ref={confirmPasswordInput}
                                    />
                                </label>
                                <button className={cx("button")} type="submit">
                                    Go To Website -&gt;
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </>
            )}
        </>
    );
}
