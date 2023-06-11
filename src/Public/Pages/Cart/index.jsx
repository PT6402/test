import { useState, useEffect, useRef } from "react";

import styles from "./index.module.scss";
import { useCartContext } from "../../Hooks/useCartContext";
import { useCart } from "../../Hooks/useCart";
import Button from "../../Components/Button";
import CartItem from "./CartItem";
import Loader from "../../Components/Loader";
import Toast from "../../Components/Toast";
import ToastMessage from "../../Components/ToastMessage";
import Card from "../../components/Card";
import { addAllItemsPrice, addAllItemsPriceDiscount } from "../../helpers/item";
import useInventory from "../../Hooks/useInventory";
import instance from "../../../http";

const Cart = () => {
  const { items, discount, dispatch  } = useCartContext();
  const { addItem, removeItem, deleteItem, isLoading, error } = useCart();
  const {
    checkInventory,
    isLoading: isInventoryLoading,
    error: inventoryError,
  } = useInventory();

  const [toastMessage, setToastMessage] = useState(null);
  const [isDiscount, setDiscount] = useState(discount);
  // const [isTotalPrice, setTotalPrice] = useState(totalPrice);
  const discountRef = useRef();
  useEffect(() => {
    checkInventory(items);
  }, []);

  useEffect(() => {
    if (error) {
      setToastMessage({ error, details: error.details });
    }
  }, [error]);

  useEffect(() => {
    if (inventoryError) {
      setToastMessage({
        error: inventoryError,
        details: inventoryError.details,
      });
    }
  }, [inventoryError]);
  // useEffect(() => {
  //   if (check==1) {
  //     setToastMessage({
  //       error: "discount exist",
  //       details: inventoryError.details,
  //     });
  //   }
  // }, [check]);

  const toggleToast = () => {
    setToastMessage(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDiscount.length == 0) {
      await instance
        .post("api/code-discount", {
          code: discountRef.current.value,
        })
        .then((res) => {
          if (res.data.check == 1) {
            setDiscount(discount);
          } else if (res.data.check == 2) {
            setDiscount(res.data.discount);
            // setTotalPrice(res.data.totalPrice)
            dispatch({
              type: "UPDATE_DISCOUNT",
              payload: { discount: res.data.discount },
            });
          }
        });
    } else {
      const totalPrice =addAllItemsPrice(items); 
      await instance.post("api/remove-discount",{totalPrice}).then((res) => {
        if (res.data.check == 0) {
          setDiscount(res.data.discount);
          // setTotalPrice(res.data.totalPrice)
          dispatch({
            type: "UPDATE_DISCOUNT",
            payload: { discount: res.data.discount },
          });
          discountRef.current.value = "";
        }
      });
    }
  };

  console.log(addAllItemsPrice(items));
  let content =
    items.length > 0 ? (
      <>
        <Card className={styles.checkout_wrapper}>
          <div className={styles.total}>
            Total:{" "}
            <span>
              $
              {isDiscount.length == 0
                ? addAllItemsPrice(items)
                : addAllItemsPriceDiscount(items, isDiscount)}
            </span>
            {discount.length !== 0 && (
              <div className={`${styles.tags_wrapper} pl-5 items-center`}>
                <span className={`${styles.tag_alt}`}>
                  Discount: {discount.value}%{" "}
                </span>
              </div>
            )}
          </div>
          <Button to="/checkout" className={styles.checkout_button}>
            Checkout
          </Button>
        </Card>
        <div className={styles.content_wrapper}>
          <div className={styles.list_wrapper}>
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                model={item.model}
                type={item.type}
                color={item.color}
                size={item.size}
                price={item.price}
                url={item.url}
                amount={item.amount}
                _thumbnail={item.thumbnail}
                addItem={addItem}
                removeItem={removeItem}
                deleteItem={deleteItem}
                isLoading={isLoading}
              />
            ))}
          </div>
          <aside className={styles.sidebar}>
            <form id="form" className={styles.support} onSubmit={handleSubmit}>
              <p className={styles.support_title}>Discount code</p>
              <input
                className={styles.support_input}
                type="text"
                placeholder="enter your code"
                ref={discountRef}
              
                defaultValue={isDiscount.length!=0 ? isDiscount.code : ""}
                readOnly={isDiscount.length != 0}
              />

              <button
                className={`${styles.support_button} `}
                type="submit"
                form="form"
              >
                {isDiscount.length === 0 ? "ADD" : "REMOVE"}
              </button>
            </form>
          </aside>
        </div>
      </>
    ) : (
      <div className={styles.no_products_wrapper}>
        <p className={styles.no_products}>There are no products in the cart</p>
        <Button className={styles.products_button} to="/category/product">
          Add products
        </Button>
      </div>
    );

  return (
    <>
      {isInventoryLoading && <Loader />}
      {!isInventoryLoading && (
        <>
          <Toast>
            {toastMessage && (
              <ToastMessage toggleToast={toggleToast} content={toastMessage} />
            )}
          </Toast>
          <section>
            <div className={`${styles.container} main-container`}>
              <h1 className={styles.title}>Your cart</h1>
              {content}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Cart;
