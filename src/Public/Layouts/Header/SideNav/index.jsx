/* eslint-disable react/prop-types */

import classNames from "classnames/bind";
import style from "./index.module.scss";
const cx = classNames.bind(style);
import {
  FaUserCircle,
  FaShippingFast,
  FaQuestionCircle,
  FaSyncAlt,
  FaInfoCircle,
  FaInstagram,
  FaTwitterSquare,
  FaSpotify,
} from "react-icons/fa";
import { useAuthContext } from '../../../Hooks/useAuthContext';
import { useKeyDown } from "../../../Hooks/useKeyDown";
import { Link } from "react-router-dom";
export default function SideNav({ toggleSideNav }) {
  const { isVerified, name } = useAuthContext();
  console.log(isVerified);
  useKeyDown(() => {
    toggleSideNav();
  }, ["Escape"]);

  return (
    <div className={cx("container")}>
      <div className={cx("links_container")}>
        <ul className={cx("links_list")}>
          <h2>Productos</h2>
          <li>
            <Link
              to="/category/product"
              onClick={toggleSideNav}
              className={cx("link")}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/category/men"
              onClick={toggleSideNav}
              className={cx("link")}
            >
              Men
            </Link>
          </li>
          <li>
            <Link
              to="/category/women"
              onClick={toggleSideNav}
              className={cx("link")}
            >
              Women
            </Link>
          </li>
        </ul>
        <ul className={cx("links_list")}>
          <h2>Colecciones</h2>
          <li>
            <Link
              to="/category/product"
              onClick={toggleSideNav}
              className={cx("link")}
            >
              Capsula #001
            </Link>
          </li>
        </ul>
      </div>
      {/* <div className={cx("products_container}>
          <Slideshow slides={slides} />
        </div> */}
      <div className={cx("info_container")}>
        {isVerified && (
          <h2 className={cx("title")}>Bienvenido devuelta, {name}!</h2>
        )}
        <ul className={cx("links_list")}>
          <li>
            <Link
              to={isVerified ? "/account" : "/login"}
              onClick={toggleSideNav}
              className={cx("link")}
            >
              <i>
                <FaUserCircle />
              </i>
              {isVerified ? "Account" : "Login"}
            </Link>
          </li>
          <li>
            <Link to="/" onClick={toggleSideNav} className={cx("link")}>
              <i>
                <FaQuestionCircle />
              </i>
              Info
            </Link>
          </li>
          <li>
            <Link to="/" onClick={toggleSideNav} className={cx("link")}>
              <i>
                <FaShippingFast />
              </i>
              Shipments
            </Link>
          </li>
          <li>
            <Link to="/" onClick={toggleSideNav} className={cx("link")}>
              <i>
                <FaSyncAlt />
              </i>
              Devoluciones
            </Link>
          </li>
          <li>
            <Link to="/" onClick={toggleSideNav} className={cx("link")}>
              <i>
                <FaInfoCircle />
              </i>
              About us
            </Link>
          </li>
        </ul>
      </div>
      <div className={cx("socials_container")}>
        <a
          href="https://www.instagram.com/hit.hot.ar/"
          target="_blank"
          rel="noreferrer"
        >
          <i>
            <FaInstagram />
          </i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <i>
            <FaTwitterSquare />
          </i>
        </a>
        <a href="https://spotify.com" target="_blank" rel="noreferrer">
          <i>
            <FaSpotify />
          </i>
        </a>
      </div>
    </div>
  );
}
