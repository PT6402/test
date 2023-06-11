/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { CgShoppingBag, CgCheckO } from "react-icons/cg";
import styles from "./index.module.scss";
import { useCartContext } from "../../Hooks/useCartContext";
import { useCart } from "../../Hooks/useCart";
import { useKeyDown } from "../../Hooks/useKeyDown";
import Toast from "../Toast";
import ToastMessage from "../ToastMessage";
import Button from "../Button";
import CartItem from "../../Pages/Cart/CartItem";
import {
  addAllItemsPrice,
  addAllItemsPriceDiscount,
  addAllItemsPriceNumber,
} from "./../../helpers/item";

const CartContent = ({ toggleCartModal }) => {
  const { items, totalAmount, discount } = useCartContext();
  const { addItem, removeItem, deleteItem, isLoading, error } = useCart();

  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (error) {
      setToastMessage({ error, details: error.details });
    }
  }, [error]);

  const toggleToast = () => {
    setToastMessage(null);
  };

  useKeyDown(() => {
    toggleCartModal();
  }, ["Escape"]);

  if (items.length === 0) {
    return (
      <>
        <Toast>
          {toastMessage && (
            <ToastMessage toggleToast={toggleToast} content={toastMessage} />
          )}
        </Toast>
        <div className={styles.empty}>
          <p className={styles.no_products}>
            THERE ARE NO PRODUCTS IN THE CART
          </p>
          <Button
            className={`${styles.button} ${styles.empty_button}`}
            to="/category/product"
            onClick={toggleCartModal}
          >
            Add products
          </Button>
        </div>
      </>
    );
  }
  console.log();
  return (
    <>
      <Toast>
        {toastMessage && (
          <ToastMessage toggleToast={toggleToast} content={toastMessage} />
        )}
      </Toast>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.list_wrapper}>
            <div className={styles.list}>
              {items.map((item) => {
                console.log(item);
                return (
                  <CartItem
                    toggleCartModal={toggleCartModal}
                    key={item.id}
                    item={item}
                    model={item.model}
                    type={item.type}
                    color={item.color}
                    size={item.size}
                    price={item.price}
                    url={item.url}
                    amount={item.amount}
                    _thumbnail={item.thumbnail || item.images[0].url}
                    addItem={addItem}
                    removeItem={removeItem}
                    deleteItem={deleteItem}
                    isLoading={isLoading}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.footer_container}>
          <div className={styles.footer_wrapper}>
            <div>
              <span>
                Total: $
               { `${discount.length === 0
                  ? addAllItemsPrice(items)
                  : addAllItemsPriceDiscount(items, discount)} | `}
              </span> {` ${totalAmount}
              ${totalAmount > 1 ? "items" : "item"}`}
              {discount.length != 0 && (
                <div className={` ${styles.tags_wrapper} pl-5 items-center`}>
                  <span className={`${styles.tag_alt}`}>
                    Discount: {discount.value}%{" "}
                  </span>
                </div>
              )}
            </div>
            <div className={styles.buttons_wrapper}>
              <Button
                className={`${styles.button} ${styles.cart_button}`}
                to="/cart"
                onClick={toggleCartModal}
              >
                Carts
                <span>
                  <CgShoppingBag />
                </span>
              </Button>
              <Button
                className={`${styles.button} ${styles.checkout_button}`}
                to="/checkout"
                onClick={toggleCartModal}
              >
                Checkout
                <span>
                  <CgCheckO />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartContent;
