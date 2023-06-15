import CollectionCard from "./CollectionCard";

import styles from "./index.module.scss";

const CollectionsSectionNav = ({ subcategory, category }) => {
  if (subcategory) {
    console.log(subcategory);
  }
  return (
    <>
      {subcategory && (
        <section className={styles.section1}>
          <div className={`${styles.container}`}>
            {/* <h2 className={`${styles.title} text-center`}>CATEGORY</h2> */}
            <div className={styles.grid_container}>
              {subcategory.map((collection, index) => {
                console.log(collection);
                return (
                  <CollectionCard
                    key={index}
                    // id={collection.id}
                    // image={collection.image}
                    category_slug={collection.category_slug}
                    subcategory_name={collection.subcategory_name}
                    subcategory_slug={collection.subcategory_slug}
                    image={collection.image}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}
      {category && (
        <section className={styles.section1}>
          <div className={`${styles.container}`}>
            {/* <h2 className={`${styles.title} text-center`}>CATEGORY</h2> */}
            <div className={styles.grid_container}>
              {category.map((collection, index) => {
                console.log(collection);
                return (
                  <CollectionCard
                    key={index}
                    // id={collection.id}
                    // image={collection.image}
                    category_slug={collection.category_slug}
                    category_name={collection.category_name}
                    image={collection.image}
                  />
                );
              })}
              <CollectionCard
                category_name={"Sale-off"}
                image={"/images/Menu_Sale-off.jpg"}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CollectionsSectionNav;
