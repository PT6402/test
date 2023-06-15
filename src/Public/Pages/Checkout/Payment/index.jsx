import { useState, useEffect } from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";

import styles from "./index.module.scss";
import { useCheckout } from "../../../Hooks/useCheckout";
import { useOrder } from "../../../Hooks/useOrder";
import Loader from "../../../Components/Loader";
import CheckoutSummary from "../CheckoutSummary";
import { BiChevronLeft } from "react-icons/bi";
import {
  formatCardNumber,
  formatCvv,
  formatExpiryDate,
} from "../../../helpers/format";
import instance from "../../../../http";
import { useCheckoutContext } from "../../../Hooks/useCheckoutContext";

const Payment = ({ handlePreviousStep }) => {
  const navigate = useNavigate();
  const { check: urlId } = useParams();
  const { selectPreviousStep } = useCheckout();
  const { createOrder, isLoading, error } = useOrder();

  const [paymentOption, setPaymentOption] = useState("credit-card");
  const [navigation, setNavigation] = useState(false);
  const { shippingAddress, shippingOption } = useCheckoutContext();
  const [userInput, setUserInput] = useState({
    cardNumber: "",
    name: "",
    expiryDate: "",
    securityCode: "",
  });

  const handleCardNumberInput = (e) => {
    setUserInput((prevState) => ({
      ...prevState,
      cardNumber: e.target.value,
    }));
  };

  const handleNameInput = (e) => {
    setUserInput((prevState) => ({ ...prevState, name: e.target.value }));
  };

  const handleExpiryDateInput = (e) => {
    setUserInput((prevState) => ({ ...prevState, expiryDate: e.target.value }));
  };

  const handleSecurityCodeInput = (e) => {
    setUserInput((prevState) => ({
      ...prevState,
      securityCode: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await instance
      .post("api/store-payment", { payment_method: paymentOption })
      .then((res) => {
        if (res.data.status == 200 && paymentOption == "COD") {
         createOrder(userInput);
          setNavigation(true);
        } else if (res.data.status == 200 && paymentOption == "credit-card") {
          window.location.replace(res.data.url);
          const order = {
            shippingAddress,
            shippingOption,
            paymentOption,
          };

          localStorage.setItem("order_user", JSON.stringify(order));
        }
      });
  };

  useEffect(() => {
    if (navigation && !error) {
      navigate("/account");
    } else {
      setNavigation(false);
    }
  }, [navigation]);

  // const cardNumberStyles = {
  //   label:
  //     userInput.cardNumber.length > 0
  //       ? styles.label_focus
  //       : styles.label_no_focus,
  //   input:
  //     userInput.cardNumber.length > 0
  //       ? styles.input_focus
  //       : styles.input_no_focus,
  // };

  // const nameStyles = {
  //   label:
  //     userInput.name.length > 0 ? styles.label_focus : styles.label_no_focus,
  //   input:
  //     userInput.name.length > 0 ? styles.input_focus : styles.input_no_focus,
  // };

  // const expiryDateStyles = {
  //   label:
  //     userInput.expiryDate.length > 0
  //       ? styles.label_focus
  //       : styles.label_no_focus,
  //   input:
  //     userInput.expiryDate.length > 0
  //       ? styles.input_focus
  //       : styles.input_no_focus,
  // };

  // const securityCodeStyles = {
  //   label:
  //     userInput.securityCode.length > 0
  //       ? styles.label_focus
  //       : styles.label_no_focus,
  //   input:
  //     userInput.securityCode.length > 0
  //       ? styles.input_focus
  //       : styles.input_no_focus,
  // };

  return (
    <div>
      {isLoading && (
        <Loader wrapperClassName={styles.loader_wrapper} noPortal={true} />
      )}
      {!isLoading && (
        <>
          <CheckoutSummary />
          <form id="form" onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.title}>Payment method</h2>
            <div className={styles.payment_options_wrapper}>
              <div>
                <div className={styles.payment_option}>
                  <input
                    type="radio"
                    value="COD"
                    checked={paymentOption === "COD"}
                    onChange={() => setPaymentOption("COD")}
                    className={
                      paymentOption == "COD"
                        ? styles.radio_selected
                        : styles.radio_unselected
                    }
                  />
                  <label>COD</label>
                  |
                  <input
                    type="radio"
                    value="creditCard"
                    checked={paymentOption === "credit-card"}
                    onChange={() => setPaymentOption("creditCard")}
                    className={
                      paymentOption == "credit-card"
                        ? styles.radio_selected
                        : styles.radio_unselected
                    }
                  />
                  <label>Credit card</label>
                </div>
              </div>
              {/* {paymentOption === 'credit-card' && (
                <div className={styles.inputs_wrapper}>
                  <div className={styles.float_container}>
                    <label
                      htmlFor="cardNumber"
                      className={cardNumberStyles.label}
                    >
                      card number
                    </label>
                    <input
                      id="cardNumber"
                      onChange={handleCardNumberInput}
                      onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      value={formatCardNumber(userInput.cardNumber)}
                      type="text"
                      inputMode="numeric"
                      placeholder="card number"
                      className={cardNumberStyles.input}
                      required
                    />
                  </div>
                  <div className={styles.float_container}>
                    <label htmlFor="name" className={nameStyles.label}>
                    Name on the card
                    </label>
                    <input
                      id="name"
                      onChange={handleNameInput}
                      value={userInput.name}
                      type="text"
                      placeholder="Name on the card"
                      className={nameStyles.input}
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div className={styles.card_security}>
                    <div className={styles.float_container}>
                      <label
                        htmlFor="expiryDate"
                        className={expiryDateStyles.label}
                        autoComplete="off"
                      >
                       Expiration (MM/YY)
                      </label>
                      <input
                        id="expiryDate"
                        onChange={handleExpiryDateInput}
                        onKeyPress={(e) => {
                          if (!/[0-9]/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        value={formatExpiryDate(userInput.expiryDate)}
                        type="text"
                        placeholder="Expiration (MM/YY)"
                        className={expiryDateStyles.input}
                        autoComplete="off"
                        required
                      />
                    </div>
                    <div className={styles.float_container}>
                      <label
                        htmlFor="securityCode"
                        className={securityCodeStyles.label}
                      >
                      Security code
                      </label>
                      <input
                        id="securityCode"
                        onChange={handleSecurityCodeInput}
                        onKeyPress={(e) => {
                          if (!/[0-9]/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        value={formatCvv(userInput.securityCode)}
                        type="password"
                        placeholder="Security code"
                        className={securityCodeStyles.input}
                        autoComplete="off"
                        required
                      />
                    </div>
                  </div>
                </div>
              )} */}
            </div>
            {/* TODO: BILLING ADDRESS */}
          </form>
          <div className={styles.form_controls}>
            <p onClick={selectPreviousStep} className={styles.back}>
              <span>
                <BiChevronLeft />
              </span>
              back to shipping
            </p>
            <button form="form" type="submit" className={styles.button}>
              Pay now
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Payment;
