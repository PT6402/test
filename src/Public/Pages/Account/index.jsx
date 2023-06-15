import { useState, useEffect } from "react";

import styles from "./index.module.scss";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useOrder } from "../../Hooks/useOrder";
import { useLogout } from "./../../Hooks/useLogout";
import Toast from "../../Components/Toast";
import ToastMessage from "../../Components/ToastMessage";
import Loader from "../../Components/Loader";
import Button from "../../Components/Button";
import AccountOrders from "./AccountOrders";
import AccountProfile from "./AccountProfile";
import AccountAddresses from "./AccountAddresses";
import instance from "../../../http";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const { name, email, phone, role_as } = useAuthContext();
  const [reloadEffect, setReloadEffect] = useState(false);
  const { createOrderCard } = useOrder();
  const navigate = useNavigate()
  const [navigation, setNavigation] = useState(false);
  useEffect(() => {
    const pathname = location.pathname;
    console.log(pathname);

    // const checkout = async () => {
    if (pathname.includes("success")) {
      console.log("Result: true");
      //  const id =  localStorage.getItem("auth_id")
      instance.get("api/checkout-success").then((res) => {
        if (res.data.status == 200) {
          // console.log(userInput);
          const userInput = localStorage.getItem("order_user");
          const parsedOrder = JSON.parse(userInput);
          createOrderCard(parsedOrder);
          setNavigation(true);
        }
      });
    } else if (pathname.includes("cancel")) {
      console.log("Result: false");
    } else {
      console.log("Result: none");
      setNavigation(true);
      // Xử lý khi không tìm thấy success hoặc cancel
    }
    // };
    // checkout();
  }, [location.pathname]);

  useEffect(() => {
    if (navigation && !error) {
      navigate("/account");
    } else {
      setNavigation(false);
    }
  }, [navigation]);
  const handleReloadEffect = () => {
    setReloadEffect(!reloadEffect);
  };

  const { getOrders, error } = useOrder();
  const { logout } = useLogout();

  const [orders, setOrders] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await getOrders();
      if (fetchedOrders) {
        setOrders(fetchedOrders);
        console.log(fetchedOrders);
      } else {
        setNavigation(true);
        setOrders([]);
      }
    };

    fetchOrders();
  }, [reloadEffect,location.pathname]);

  useEffect(() => {
    if (error) {
      setToastMessage({
        error,
        details: "Orders could not be retrieved.",
      });
    }
  }, [error]);

  const toggleToast = () => {
    setToastMessage(null);
  };

  const handleLogout = async () => {
    await logout();
  };
  const handleAdmin = async () => {
    window.location.href = "http://127.0.0.1:8000";
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
                {role_as == 2 && (
                  <Button
                    className={styles.logout_button}
                    onClick={handleAdmin}
                  >
                    ADMIN
                  </Button>
                )}
                <Button className={styles.logout_button} onClick={handleLogout}>
                  Logout
                </Button>
              </div>
              <div className={styles.content_container}>
                <AccountOrders
                  orders={orders}
                  reloadEffect={handleReloadEffect}
                />
                <aside className={styles.sidebar}>
                  <AccountProfile name={name} email={email} phone={phone} />
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
