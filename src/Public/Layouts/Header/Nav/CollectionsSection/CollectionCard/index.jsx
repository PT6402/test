import Button from "../../../../../Components/Button";
import Card from "../../../../../components/Card";
import styles from "./index.module.scss";

const CollectionCard = ({
  subcategory_name,
  subcategory_slug,
  category_name,
  category_slug,
  image,
}) => {
  return (
    <>
      {subcategory_name && subcategory_slug ? (
        <Card className={`${styles.card}`}>
          <div className={styles.content_wrapper}>
            {/* <p className={styles.content_title}>{title}</p>
        <p className={styles.content_subtitle}>{text}</p> */}
            <Button className={styles.button} to={subcategory_slug}>
              {subcategory_name}
            </Button>
          </div>
          <img
            className={styles.image}
            src={`http://127.0.0.1:8000${image}`}
            alt=""
          />
        </Card>
      ) : (
        <Card className={`${styles.card}`}>
          <div className={styles.content_wrapper}>
            {/* <p className={styles.content_title}>{title}</p>
        <p className={styles.content_subtitle}>{text}</p> */}
            <Button className={styles.button} to={category_slug}>
              {category_name}
            </Button>
          </div>
          <img
            className={styles.image}
            src={`http://127.0.0.1:8000${image}`}
            alt=""
          />
        </Card>
      )}
    </>
  );
};

export default CollectionCard;
