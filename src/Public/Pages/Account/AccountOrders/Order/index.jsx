import { useEffect, useState } from "react";

import styles from "./index.module.scss";
import CenterModal from "../../../../Components/CenterModal";
import OrderContent from "./OrderContent";
import { formatDate } from "../../../../helpers/format";
import Button from "./../../../../Components/Button/index";
import CheckoutProgression from "./CheckoutProgression";
import { useOrder } from "../../../../Hooks/useOrder";
import Toast from "../../../../Components/Toast";
import ToastMessage from "../../../../Components/ToastMessage";


const Order = ({ id, items, date, order, status, reloadEffect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { cancelOrder, error } = useOrder();
  const toggleOrderModal = () => {
    setIsOpen((prevState) => !prevState);
  };
  const handelCancelOrder = async () => {
    await cancelOrder(id);
    if (!error) {
      console.log("success cancel");
      reloadEffect();
    }
  };

  useEffect(() => {
    if (error) {
      setToastMessage({
        error,
        details: "No se pudieron recuperar las órdenes.",
      });
    }
  }, [error]);
  const [toastMessage, setToastMessage] = useState(null);
  const progressionSteps = [
    // { id: "order", label: "Order" },
    { id: "handle", label: "Handle" },
    { id: "delivery", label: "Delivery" },
    { id: "finish", label: "Finish" },
  ];
  console.log(status);
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
      <CenterModal toggleModal={toggleOrderModal}>
        {isOpen && (
          <OrderContent
            toggleOrderModal={toggleOrderModal}
            id={id}
            items={items}
            date={date}
            order={order}
            status={status}
          />
        )}
      </CenterModal>
      {/* <DialogModal/> */}
  
      <div className={`${styles.card} `}>
        <h3 className="flex flex-row items-center">
          Orden #{id}
          {status === -1 && (
            <div className={`${styles.tags_wrapper} pl-5 items-center`}>
              <span className={`${styles.tag_alt}`}>Order is Cancel</span>
            </div>
          )}
          {status === 2 && (
            <div className={`${styles.tags_wrapper} pl-5 items-center`}>
              <span className={`${styles.tag_alt1}`}>Order is Success</span>
            </div>
          )}
        </h3>
        <p className={styles.date}>{formatDate(date)}</p>
        <div className={`${styles.welcome_wrapper} relative`}>
          {/* {status != -1||status === 2 && (
            <CheckoutProgression steps={progressionSteps} status={status} />
          )} */}
          {status==0 ||status==1?(
            <CheckoutProgression steps={progressionSteps} status={status} />
          ):""}
          <div className={`flex flex-row ${status ==-1||status==2 ?"absolute bottom-0 right-32":""}`}>
            {status != 2 && (
              <Button
                className={`${styles.logout_button} m-2`}
                onClick={toggleOrderModal}
              >
                Item
              </Button>
            )}
            {status == 2 && (
              <Button
                className={`${styles.logout_button1}`}
                onClick={toggleOrderModal}
              >
                Let Review
              </Button>
            )}
            {status === 0 && (
              <Button
                className={`${styles.logout_button} m-2 `}
                onClick={handelCancelOrder}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
