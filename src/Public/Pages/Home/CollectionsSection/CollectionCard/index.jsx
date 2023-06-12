import Button from "../../../../Components/Button";
import Card from "../../../../components/Card";

import styles from "./index.module.scss";
import { Link } from "react-router-dom";

const CollectionCard = ({
  category_slug,
  category_name,
  image,
  subcategory,
}) => {
  return (
    <Card className={styles.card}>
      <div className={styles.content_wrapper}>
        {/* <p className={styles.content_title}>{category_name}</p> */}
        {subcategory
          ? subcategory.map((sub) => (
              <Link key={sub.id} to={sub.subcategory_slug}>
                <p className={styles.content_subtitle}>
                  {sub.subcategory_name}
                </p>
              </Link>
            ))
          : ""}
        <Button
          className={styles.button}
          to={`category/${category_slug ? category_slug : "product"}`}
        >
          {category_name}
        </Button>
      </div>
      <img
        className={styles.image}
        src={`http://127.0.0.1:8000${image}`}
        alt=""
      />
    </Card>
  );
};

export default CollectionCard;
