

import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "react-responsive";

import styles from "./index.module.scss";

const CenterReview = ({ children, modalClassName }) => {
  const isBigScreen = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const variants = isBigScreen
    ? {
        initial: { x: "50%", y: "100vh" },
        visible: { x: "50%", y: "-50%" },
        exit: { x: "50%", y: "100vh" },
      }
    : {
        initial: { x: "50%", y: "100vh" },
        visible: { x: "50%", y: 0 },
        exit: { x: "50%", y: "100vh" },
      };

  return (
    <AnimatePresence>
      {children && (
        <>
          <motion.div
            className={`${styles.modal} ${modalClassName}`}
            key="centermodal"
            // variants={variants}
            // initial="initial"
            // animate="visible"
            transition={{ duration: 0.2 }}
            // exit="exit"
          >
            {children}
          </motion.div>
          
        </>
      )}
    </AnimatePresence>
  );
};

export default CenterReview;
