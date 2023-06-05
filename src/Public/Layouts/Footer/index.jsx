
import { FaInstagram, FaTiktok, FaFacebook } from "react-icons/fa";
import classNames from "classnames/bind";
import style from "./index.module.scss";
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);
export default function Footer() {
  return (
    <footer className={cx("footer")}>
    <div className={cx("container")}>
      <div className={cx("sitemap")}>
        <div className={cx("nav_wrapper")}>
          <h4 className={cx("nav_title")}>support</h4>
          <ul>
            <li>
              <Link to="/">Contact</Link>
            </li>
            <li>
              <Link to="/">Payments & shipments</Link>
            </li>
            <li>
              <Link to="/">Orders</Link>
            </li>
            <li>
              <Link to="/">Retornos</Link>
            </li>
          </ul>
        </div>
        <div className={cx("nav_wrapper")}>
          <h4 className={cx("nav_title")}>Info</h4>
          <ul>
            <li>
              <Link to="">About us</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={cx("socials")}>
        <a
          href="https://www.instagram.com/hit.hot.ar/"
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <FaTiktok />
        </a>
        <a href="https://spotify.com" target="_blank" rel="noreferrer">
          <FaFacebook />
        </a>
      </div>
    </div>
  </footer>
  )
}
