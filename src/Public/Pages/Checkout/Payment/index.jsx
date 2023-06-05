import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { BiChevronLeft } from "react-icons/bi";


import CheckoutSummary from "../CheckoutSummary";





import styles from "./index.module.scss";
import { useCheckout } from "../../../Hooks/useCheckout";
import { useOrder } from './../../../Hooks/useOrder';
import Loader from "../../../Components/Loader";
import { formatCardNumber, formatCvv, formatExpiryDate } from "../../../helpers/format";

const Payment = ({ handlePreviousStep }) => {
  const [paymentOption, setPaymentOption] = useState("creditCard");
  const navigate = useNavigate();

  const { selectPreviousStep } = useCheckout();
  const { createOrder, isLoading, error } = useOrder();
  // const { selectPreviousStep } = [];
  // const { createOrder, isLoading, error } = [];

  const [navigation, setNavigation] = useState(false);

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
    await createOrder(userInput);

    setNavigation(true);
  };

  useEffect(() => {
    if (navigation && !error) {
      navigate("/cuenta");
    } else {
      setNavigation(false);
    }
  }, [navigation]);

  const cardNumberStyles = {
    label:
      userInput.cardNumber.length > 0
        ? styles.label_focus
        : styles.label_no_focus,
    input:
      userInput.cardNumber.length > 0
        ? styles.input_focus
        : styles.input_no_focus,
  };

  const nameStyles = {
    label:
      userInput.name.length > 0 ? styles.label_focus : styles.label_no_focus,
    input:
      userInput.name.length > 0 ? styles.input_focus : styles.input_no_focus,
  };

  const expiryDateStyles = {
    label:
      userInput.expiryDate.length > 0
        ? styles.label_focus
        : styles.label_no_focus,
    input:
      userInput.expiryDate.length > 0
        ? styles.input_focus
        : styles.input_no_focus,
  };

  const securityCodeStyles = {
    label:
      userInput.securityCode.length > 0
        ? styles.label_focus
        : styles.label_no_focus,
    input:
      userInput.securityCode.length > 0
        ? styles.input_focus
        : styles.input_no_focus,
  };
  const handleInputPayment = (e) => setPaymentOption(e.target.value);
  console.log(paymentOption);
  return (
    <div>
      {isLoading && (
        <Loader wrapperClassName={styles.loader_wrapper} noPortal={true} />
      )}
      {!isLoading && (
        <>
          <CheckoutSummary />
          <form id="form" onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.title}>Way to pay</h2>
            <div className={styles.payment_options_wrapper}>
              <div>
                <div className={styles.payment_option}>
                  <input
                    type="radio"
                    
                    value="COD"
                    checked={paymentOption ==="COD"}
                    onChange={()=>setPaymentOption("COD")}
                    className={
                      paymentOption =="COD"
                        ? styles.radio_selected
                        : styles.radio_unselected
                    }
                  />
                  <span>COD</span>
                  |
                  <input
                    type="radio"
                    
                    value="creditCard"
                    checked={paymentOption ==="creditCard"}
                    onChange={ ()=>setPaymentOption("creditCard")}
                    className={
                      paymentOption == "creditCard"
                        ? styles.radio_selected
                        : styles.radio_unselected
                    }
                  />
                  <span>Credit card</span>
                </div>
              </div>

              {paymentOption == "creditCard" && (
                <div className={styles.inputs_wrapper}>
                  <div className={styles.float_container}>
                    <label
                      htmlFor="cardNumber"
                      className={cardNumberStyles.label}
                    >
                      Card number
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
                      placeholder="Card number"
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
                        Expiration (MM/AA)
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
                        placeholder="Expiration (MM/AA)"
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
              )}
            </div>
            {/* TODO: BILLING ADDRESS */}
          </form>
          <div className={styles.form_controls}>
            <p onClick={selectPreviousStep} className={styles.back}>
              <span>
                <BiChevronLeft />
              </span>
              Back to shipping
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