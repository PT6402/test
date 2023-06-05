/* eslint-disable react/prop-types */
import { createPortal } from "react-dom";

import styles from "./index.module.scss";
import Backdrop from "../Backdrop";

const Loader = ({
  noPortal,
  backdropClassName,
  wrapperClassName,
  loaderClassName,
}) => {
  const backdropElement = document.getElementById("backdrop");
  const overlaysElement = document.getElementById("overlays");

  if (noPortal) {
    return (
      <>
        <div className={`${styles.loader_wrapper} ${wrapperClassName}`}>
          <div className={`${styles.loader} ${loaderClassName}`}>Loading...</div>
        </div>
      </>
    );
  }

  return (
    <>
      {createPortal(
        <Backdrop className={backdropClassName} />,
        backdropElement
      )}
      {createPortal(
        <div className={`${styles.loader_wrapper} ${wrapperClassName}`}>
        <div className={`${styles.loader} ${loaderClassName} text-center`}></div>
        </div>,
        overlaysElement
      )}
    </>
  );
};

export default Loader;
