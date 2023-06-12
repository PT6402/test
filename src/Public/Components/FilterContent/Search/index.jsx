import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { CgSearch } from "react-icons/cg";
export default function Search() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      const search = document.querySelector(".search");
      if (search && !search.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearchClick = () => {
    setIsOpen(true);
    setTimeout(() => {
      const input = document.querySelector(".search input");
      if (input) {
        input.focus();
      }
    }, 750);
  };

  return (
    <div className={` search ${styles.search} ${isOpen ? styles.open : ""}`} onClick={handleSearchClick}>
      {/* <svg x="0px" y="0px" viewBox="0 0 24 24" width="20px" height="20px">
        <g strokeLinecap="square" strokeLinejoin="miter" stroke="currentColor">
          <line fill="none" strokeMiterlimit="10" x1="22" y1="22" x2="16.4" y2="16.4" />
          <circle fill="none" stroke="currentColor" strokeMiterlimit="10" cx="10" cy="10" r="9" />
        </g>
      </svg> */}
      <CgSearch/>
      <div>
        <input type="text" placeholder="Search for something..." />
      </div>
    </div>
  );
}
