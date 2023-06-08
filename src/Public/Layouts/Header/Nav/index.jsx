/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./index.module.scss";
import { Link, NavLink, useLocation } from "react-router-dom";

import { RiMenuLine } from "react-icons/ri";
import { LuFilter } from "react-icons/lu";
import { CgSearch } from "react-icons/cg";
import Button from "../../../Components/Button";
const cx = classNames.bind(style);
import { useAuthContext } from "../../../Hooks/useAuthContext";
import CartIcon from "./CartIcon";

export default function Nav({
  toggleSideNav,
  toggleCartModal,
  toggleFilterModal,
}) {
  const { pathname } = useLocation();
  const { isVerified } = useAuthContext();
  const [hasScrolled, setHasSrolled] = useState(false);

  const resizeHeaderOnScroll = () => {
    setHasSrolled((hasScrolled) => {
      if (
        !hasScrolled &&
        (document.body.scrollTop > 20 ||
          document.documentElement.scrollTop > 20)
      ) {
        return true;
      }

      if (
        hasScrolled &&
        document.body.scrollTop < 4 &&
        document.documentElement.scrollTop < 4
      ) {
        return false;
      }

      return hasScrolled;
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", resizeHeaderOnScroll);

    return () => window.removeEventListener("scroll", resizeHeaderOnScroll);
  }, []);

  const handleToggleCartModal = () => {
    if (pathname !== "/cart") {
      toggleCartModal();
    }
  };
  const handleToggleFilterModal = () => {
    toggleFilterModal();
  };
  const navStyles = hasScrolled
    ? `${cx("nav")}
      ${cx("hasScrolled")}
      `
    : cx("nav");
  return (
    <nav className={navStyles}>
      <div className={cx("container_top")}>
        <Button className={`${cx("link")} ${cx("info_link")}`} type="button">
          Info
        </Button>
        <ul className={cx("info_list")}>
          <li>
            <Link className={cx("link")} to="/">
              Info
            </Link>
          </li>
          <li>
            <Link className={cx("link")} to="/">
              shipping
            </Link>
          </li>
          <li>
            <Link className={cx("link")} to="/">
              About us
            </Link>
          </li>
        </ul>
        {!isVerified && (
          <Link
            to="/account/login"
            className={`${cx("link")} ${cx("login_link")}`}
          >
            Login
          </Link>
        )}
        {isVerified && (
          <Link to="/account" className={`${cx("link")} ${cx("login_link")}`}>
            {localStorage.getItem("auth_name")}
          </Link>
        )}
      </div>
      <div className={cx("container_bottom")}>
        <Link to="/">
          {/* <img className={cx(logo} src={LogoNav} alt="Logo Nav" /> */}
          <span className={cx("logo")}>SG12s</span>
        </Link>
        <ul className={cx("links")}>
          <li>
            <NavLink className={cx("link")} to="/category/product">
              Products
            </NavLink>
          </li>
          <li>
            <NavLink className={cx("link")} to="/category/men">
              Men
            </NavLink>
          </li>
          <li>
            <NavLink className={cx("link")} to="/category/women">
              Women
            </NavLink>
          </li>
        </ul>
        <ul className={cx("icons_menu")}>
        

          {pathname == "/category/product" ||
          pathname == "/category/men" ||
          pathname == "/category/women" ? (
            <li
              className={`${cx("search_icon")} disabled-link`}
              onClick={handleToggleFilterModal}
            >
              <LuFilter />
            </li>
          ) : (
            <li className={`${cx("search_icon")} disabled-link`}>
              <CgSearch />
            </li>
          )}
          {pathname !== "/cart" && (
            <li className={cx("cart_icon")} onClick={handleToggleCartModal}>
              <CartIcon />
            </li>
          )}
          <li className={cx("mobile_icon")}>
            <RiMenuLine onClick={toggleSideNav} />
          </li>
        </ul>
      </div>
    </nav>
  );
}
