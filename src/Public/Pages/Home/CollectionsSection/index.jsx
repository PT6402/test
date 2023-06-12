import { useEffect, useState } from "react";
import CollectionCard from "./CollectionCard";

import styles from "./index.module.scss";
import CryptoJS from "crypto-js";
const CollectionsSection = () => {
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  useEffect(() => {
    const encryptedCategory = localStorage.getItem("category");
    const decryptedCategoryBytes = CryptoJS.AES.decrypt(
      encryptedCategory,
      "secret_key"
    );

    if (decryptedCategoryBytes.toString()) {
      const decryptedCategory = JSON.parse(
        decryptedCategoryBytes.toString(CryptoJS.enc.Utf8)
      );
      setCategory(decryptedCategory);
      // Sử dụng dữ liệu category đã giải mã
    }
    const encryptedSubCategory = localStorage.getItem("subcategory");
    const decryptedSubCategoryBytes = CryptoJS.AES.decrypt(
      encryptedSubCategory,
      "secret_key"
    );

    if (decryptedSubCategoryBytes.toString()) {
      const decryptedSubCategory = JSON.parse(
        decryptedSubCategoryBytes.toString(CryptoJS.enc.Utf8)
      );
      setSubCategory(decryptedSubCategory);
      // Sử dụng dữ liệu category đã giải mã
    }
  }, []);
  function filterSubcategoriesByCategoryId(categoryId) {
    return subcategory.filter(
      (subcategory) => subcategory.category_id == categoryId
    );
  }
  return (
    <>
      {category && (
        <section className={styles.section}>
          <div className={`${styles.container} main-container`}>
            <h2 className={`${styles.title} text-center`}>COLLECTION</h2>
            <div className={styles.grid_container}>
              {category.map((collection, index) => {
                const subcategoryOfCategory = filterSubcategoriesByCategoryId(
                  collection.id
                );
                console.log(collection);
                return (
                  <CollectionCard
                    key={index}
                    subcategory={subcategoryOfCategory}
                    image={collection.image}
                    category_name={collection.category_name}
                    category_slug={collection.category_slug}
                  />
                );
              })}
              <CollectionCard
                category_name={"Product"}
                image={"/images/catalogy-3.jpg"}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CollectionsSection;
