import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AccordionContext } from "./AccordionWrapper";
import styles from "./index.module.scss";
const AccordionItem = (props) => {
  let indexPlus;

  const indexCount = (index) => {
    indexPlus = index + 1;
    return indexPlus;
  };

  const { active, setActive } = useContext(AccordionContext);

  const eventHandler = (e, index) => {
    e.preventDefault();
    setActive(index);
  };

  return (
    <div className={styles.accordion_item}>
      <h3 className={styles.accordion_title}>
        <button
          onClick={(e) => eventHandler(e, props.index)}
          className={active === props.index ? styles.active : styles.inactive}
          aria-expanded={active === props.index ? "true" : "false"}
          aria-controls={"sect_" + indexCount(props.index)}
          aria-disabled={active === props.index ? "true" : "false"}
        >
          <span className={styles.title_wrapper}>{props.title}</span>
          <span className={styles.icon_wrapper}>
            <span
              className={active === props.index ? styles.plus : styles.minus}
            ></span>
          </span>
        </button>
      </h3>
      <div className={styles.accordion_panel}>
        <div
          id={"sect_" + indexCount(props.index)}
          className={
            active === props.index ? styles.panel_open : styles.panel_close
          }
        >
          {props.description}
        </div>
      </div>
    </div>
  );
};

AccordionItem.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default AccordionItem;
