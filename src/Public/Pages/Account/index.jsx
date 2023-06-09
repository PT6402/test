import { useState, useEffect } from 'react';


import styles from './index.module.scss';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { useOrder } from '../../Hooks/useOrder';
import { useLogout } from './../../Hooks/useLogout';
import Toast from '../../Components/Toast';
import ToastMessage from '../../Components/ToastMessage';
import Loader from '../../Components/Loader';
import Button from '../../Components/Button';
import AccountOrders from './AccountOrders';
import AccountProfile from './AccountProfile';
import AccountAddresses from './AccountAddresses';

const Account = () => {
  const { name, email, phone } = useAuthContext();
  const [reloadEffect, setReloadEffect] = useState(false);

  const handleReloadEffect = () => {
    setReloadEffect(!reloadEffect);
  };

  const { getOrders ,error } = useOrder();
  const { logout } = useLogout();

  const [orders, setOrders] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);





  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await getOrders();
      if (fetchedOrders) {
        setOrders(fetchedOrders); 
        console.log(fetchedOrders)
      } else {
        setOrders([]);
      }
    };

    fetchOrders();
  }, [reloadEffect]);

  useEffect(() => {
    if (error) {
      setToastMessage({
        error,
        details: 'Orders could not be retrieved.',
      });
    }
  }, [error]);

  const toggleToast = () => {
    setToastMessage(null);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <Toast>
        {toastMessage && (
          <ToastMessage toggleToast={toggleToast} content={toastMessage} />
        )}
      </Toast>
      {!orders && <Loader />}
      {orders && (
        <>
          <section>
            <div className={`${styles.container} main-container`}>
              <div className={styles.welcome_wrapper}>
                <p className={styles.greeting}>Hi, {name}!</p>
                <Button className={styles.logout_button} onClick={handleLogout}>
                  Logout
                </Button>
              </div>
              <div className={styles.content_container}>
                <AccountOrders orders={orders} reloadEffect={handleReloadEffect} />
                <aside className={styles.sidebar}>
                  <AccountProfile
                    name={name}
                    
                    email={email}
                    phone={phone}
                  />
                  <AccountAddresses />
                </aside>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Account;
