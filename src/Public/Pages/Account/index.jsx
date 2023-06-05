import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useEffect, useState } from "react";
import Toast from "../../Components/Toast";
import ToastMessage from "../../Components/ToastMessage";
import Loader from "../../Components/Loader";
import Button from "../../Components/Button";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
import style from "./index.module.scss";
import { useLogout } from "../../Hooks/useLogout";
import AccountProfile from "./AccountProfile";
import AccountAddresses from "./AccountAddresses";
import AccountOrders from "./AccountOrders";
// import { useOrder } from "../../Hooks/useOrder";

export default function Account() {
    const navigate = useNavigate()
    const { name,role_as,email, phone} = useAuthContext();

    // const { getOrders, error } = useOrder();
    const { logout } = useLogout();
const {error} = {}
    // const [orders, setOrders] = useState(null);
    const [toastMessage, setToastMessage] = useState(null);

    // useEffect(() => {
    //   const fetchOrders = async () => {
    //     const fetchedOrders = await getOrders();
    //     if (fetchedOrders) {
    //       setOrders(fetchedOrders);
    //     } else {
    //       setOrders([]);
    //     }
    //   };

    //   fetchOrders();
    // }, []);
const orders= []
    useEffect(() => {
      if (error) {
        setToastMessage({
          error,
          details: 'No se pudieron recuperar las órdenes.',
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
      navigate('/admin/dashboard/home')
    };

    return (
      <>
        <Toast>
          {toastMessage && (
            <ToastMessage toggleToast={toggleToast} content={toastMessage} />
          )}
        </Toast>
        {/* {!orders && <Loader />}
        {orders && ( */}
          <>
            <section>
              <div className={`${cx("container")} main-container`}>
                <div className={cx("welcome_wrapper")}>
                  <p className={cx("greeting")}>Hi!, {name}</p>
                 { role_as==2 && <Button className={cx("admin_button")} onClick={handleAdmin}>
                    ADMIN
                  </Button>}
                  <Button className={cx("logout_button")} onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
                <div className={cx("content_container")}>
                  <AccountOrders orders={orders} />
                  <aside className={cx("sidebar")}>
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
        {/* )} */}
      </>
    );
}
