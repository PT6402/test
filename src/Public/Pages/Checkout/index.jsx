import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';



// import logo from 'assets/images/checkout-logo-nav.png';

import styles from './index.module.scss';


import useInventory from '../../Hooks/useInventory';
import ShippingInfo from './ShippingInfo';
import ShippingOption from './ShippingOption';
import Payment from './Payment';
import { useCartContext } from '../../Hooks/useCartContext';
import { useCheckoutContext } from './../../Hooks/useCheckoutContext';
import Toast from '../../Components/Toast';
import ToastMessage from '../../Components/ToastMessage';
import Loader from '../../Components/Loader';
import CheckoutProgression from './CheckoutProgression';
import OrderSummary from './OrderSummary';


const progressionSteps = [
  { id: 'cart', label: 'Carrito', url: '/cart' },
  { id: 'info', label: 'Info' },
  { id: 'shipping', label: 'Envío' },
  { id: 'payment', label: 'Pago' },
];

const Checkout = () => {
  const { checkoutIsReady, currentStep } = useCheckoutContext();
  const { items } = useCartContext();
  const {
    checkInventory,
    isLoading: isInventoryLoading,
    error: inventoryError,
  } = useInventory();

  const [toastMessage, setToastMessage] = useState(null);

  let formContent;

  if (progressionSteps[currentStep].id === 'info') {
    formContent = <ShippingInfo />;
  }

  if (progressionSteps[currentStep].id === 'shipping') {
    formContent = <ShippingOption />;
  }

  if (progressionSteps[currentStep].id === 'payment') {
    formContent = <Payment />;
  }

  useEffect(() => {
    checkInventory(items);
  }, []);

  useEffect(() => {
    if (inventoryError) {
      setToastMessage({
        error: inventoryError,
        details: inventoryError.details,
      });
    }
  }, [inventoryError]);

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
      <div className={styles.background}></div>
      <section className={styles.layout}>
        <>
          {!checkoutIsReady && <Loader noPortal={true} />}
          {checkoutIsReady && (
            <>
              <div className={`${styles.header} main-container`}>
                <Link to="/">
                  {/* <img className={styles.logo} src={logo} alt="" /> */}
                  SG12
                </Link>
              </div>
              <div className={`${styles.content_wrapper} main-container`}>
                <div className={styles.info_container}>
                  <div className={styles.info_header}>
                    <Link to="/">
                      {/* <img className={styles.logo} src={logo} alt="" /> */}
                      SG12
                    </Link>
                  </div>
                  <CheckoutProgression steps={progressionSteps} />
                  {formContent}
                </div>
                <div className={styles.order_summary_container}>
                  <OrderSummary />
                </div>
              </div>
            </>
          )}
        </>
      </section>
    </>
  );
};

export default Checkout;
