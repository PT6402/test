import { Link } from "react-router-dom";
import Button from "./../../Public/Components/Button/index";

import styles from "./index.module.scss";
export default function Layouts() {
  return (
    <div className={`${styles.welcome_wrapper} relative top-[50px]`}>
      Hello ADMIN
      <Button className={`${styles.logout_button}`}>
        <Link to={"/"}>Home</Link>
      </Button>
    </div>
  );
}
