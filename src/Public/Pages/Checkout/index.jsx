import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';





import logo from '../../assets/images/checkout-logo-nav.png';

import styles from './index.module.scss';
import Loader from '../../Components/Loader';
import ToastMessage from '../../Components/ToastMessage';
import Toast from '../../Components/Toast';
import CheckoutProgression from './CheckoutProgression';
import OrderSummary from './OrderSummary';
import ShippingInfo from './ShippingInfo';
import ShippingOption from './ShippingOption';
import Payment from './Payment';
import { useCheckoutContext } from '../../Hooks/useCheckoutContext';
import { useCartContext } from '../../Hooks/useCartContext';
import useInventory from '../../Hooks/useInventory';

const progressionSteps = [
  { id: 'cart', label: 'carts', url: '/cart' },
  { id: 'info', label: 'Info' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
];

const Checkout = () => {
  // const { checkoutIsReady, currentStep } = [];
  // const { items } = [];
  // const {
  //   checkInventory,
  //   isLoading: isInventoryLoading,
  //   error: inventoryError,
  // } = [];
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
                  <img className={styles.logo} src={logo} alt="" />
                </Link>
              </div>
              <div className={`${styles.content_wrapper} main-container`}>
                <div className={styles.info_container}>
                  <div className={styles.info_header}>
                    <Link to="/">
                      <img className={styles.logo} src={logo} alt="" />
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