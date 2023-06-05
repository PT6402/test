import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
import style from "./index.module.scss";
import { useLogin } from "../../Hooks/useLogin";
import Toast from "../../Components/Toast";
import ToastMessage from "../../Components/ToastMessage";
import Loader from "../../Components/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function ForgetPassword() {
  const { login, isLoading, error } = useLogin();
const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState(null);

  const emailInput = useRef();
  const passwordInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // await login({
    //   email: emailInput.current.value,
    //   password: passwordInput.current.value,
    // });
    axios.post('api/forgetPassword',{email:emailInput.current.value}).then((res) => {
      console.log(res);
    });
    console.log(emailInput.current.value);
    // navigate("/account/login/reset-password")

  };

  useEffect(() => {
    if (error) {
      setToastMessage({ error, details: error.details });
    }
    // console.log(error);
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
                  <h2 className={cx("title")}>
                    Send Mail To Reset Password -&gt;
                  </h2>
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

                  <button className={cx("button")} type="submit">
                    Send
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
