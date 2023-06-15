import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useSignUp } from '../../Hooks/useSignUp';
import Toast from '../../Components/Toast';
import ToastMessage from '../../Components/ToastMessage';
import Loader from '../../Components/Loader';
import classNames from "classnames/bind";
const cx = classNames.bind(style);
import style from './index.module.scss';
export default function Signup() {
    const { state: routerState } = useLocation();

    const { signUp, isLoading, error, defaultValue } = useSignUp();
  
    const [toastMessage, setToastMessage] = useState(null);
  
    const nameInput = useRef();
    const phoneInput = useRef();
    const emailInput = useRef();
    const passwordInput = useRef();
    const confirmationInput = useRef();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      await signUp({
        name: nameInput.current.value,
        phone:phoneInput.current.value,
        email: emailInput.current.value,
        password: passwordInput.current.value,
        password_confirmation: confirmationInput.current.value,
      });
    };
  
    useEffect(() => {
      if (error) {
        setToastMessage({ error, details: error.details });
      }
    }, [error]);
  
    const toggleToast = () => {
      setToastMessage(null);
    };
  
    return (
      <>
        <Toast>
          {toastMessage && (
            <ToastMessage toggleToast={toggleToast} content={toastMessage} />
          )}
        </Toast>
        {isLoading && <Loader />}
        {!isLoading && (
          <>
            <section className={cx("nav_section")}></section>
            <section className={cx("section")}>
              <div className={cx("container")}>
                <div className={`${cx("wrapper")} main-container`}>
                  <form onSubmit={handleSubmit} className={cx("form")}>
                    {/* <h2 className={cx("title}>Sign Up</h2> */}
                    <label className={cx("label")}>
                      <span>Name</span>
                      <input
                        defaultValue={defaultValue ? defaultValue.name : ""}
                        className={cx("input")}
                        type="text"
                        placeholder="Name"
                        required
                        ref={nameInput}
                      />
                    </label>
  
                    <label className={cx("label")}>
                      <span>Email:</span>
                      <input
                        className={cx("input")}
                        type="email"
                        placeholder="example@email.com"
                        required
                        ref={emailInput}
                      />
                    </label>
                    <label className={cx("label")}>
                      <span>Phone:</span>
                      <input
                        className={cx("input")}
                        type="tel"
                        placeholder="phone..."
                        required
                        ref={phoneInput}
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
                        ref={confirmationInput}
                      />
                    </label>
                    <button className={cx("button")} type="submit">
                      Sign Up
                    </button>
                  </form>
                  <p className={cx("login")}>
                    Do you already have an account?
                    <Link to="/account/login" state={routerState}>
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </section>
          </>
        )}
      </>
    );
}
