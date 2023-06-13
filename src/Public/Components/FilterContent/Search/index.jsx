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
    <div
      className={` search ${styles.search} ${isOpen ? styles.open : ""}`}
      onClick={handleSearchClick}
    >
      
      <CgSearch />
      <div>
        <input type="text" placeholder="Search..." />
      </div>
    </div>
  );
}
