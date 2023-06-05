import { useEffect, useState } from 'react';

import { CgShoppingBag } from 'react-icons/cg';

import { useCartContext } from '../../../../Hooks/useCartContext';
import classNames from "classnames/bind";
const cx = classNames.bind(style);
import style from './index.module.scss';

const CartIcon = () => {
  let { totalAmount } = useCartContext();
  const [bump, setBump] = useState(false);

  let iconStyles = bump
    ? `${cx("bump")} ${cx("cart_icon")}`
    : cx("cart_icon");
  let amountStyles = totalAmount === 0 ? cx("no_items"): cx("cart_amount");

  useEffect(() => {
    if (totalAmount === 0) {
      return;
    } else {
      setBump(true);
    }

    const timer = setTimeout(() => {
      setBump(false);
    }, 150);

    return () => {
      clearTimeout(timer);
    };
  }, [totalAmount]);

  return (
    <span className={iconStyles}>
      <CgShoppingBag />
      <div className={amountStyles}>
        <div>{totalAmount}</div>
      </div>
    </span>
  );
};

export default CartIcon;
