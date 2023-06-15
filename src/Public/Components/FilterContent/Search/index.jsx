import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { CgSearch } from "react-icons/cg";
import { useCollection } from "../../../Hooks/useCollection";
import Card from "../../Card";
import { Link } from "react-router-dom";
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
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    // our api to fetch the search result
    console.log("search ", searchTerm);
  };

  const { getCollection } = useCollection();

  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getCollection();
      if (fetchedProducts) {
        const filteredData = [];
        const ids = [];
        for (let i = 0; i < fetchedProducts.length; i++) {
          if (!ids.includes(fetchedProducts[i].id)) {
            filteredData.push(fetchedProducts[i]);
            ids.push(fetchedProducts[i].id);
          }
        }
        if (filteredData.length > 0) setProducts(filteredData);
      }
    };
    console.log(products);

    fetchProducts();
  }, [value]);
  console.log(products);
  return (
    <div className={styles.wrapper_container}>
      <div
        className={` search ${styles.search} ${isOpen ? styles.open : ""}`}
        onClick={handleSearchClick}
      >
        <CgSearch />
        <div>
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Search..."
          />
        </div>
      </div>
      {isOpen && value && (
        <Card className={`${styles.card_wrapper} empty:hidden`}>
          <div className={`${styles.dropdown} empty:hidden`}>
            {products &&
              products
                .filter((item) => {
                  const searchTerm = value.toLowerCase();
                  const fullName = item.model.toLowerCase();

                  return (
                    searchTerm &&
                    fullName.startsWith(searchTerm) &&
                    fullName !== searchTerm
                  );
                })
                .slice(0, 10)
                .map((item) => {
                  console.log({ item: item });

                  if (item === null) {
                    return <div key={item.id}>null</div>;
                  }

                  return (
                    <Link
                      key={item.id}
                      to={`/product/${item.slug}/${item.url}`}
                    >
                      <div className={styles.item_container}>
                        <div className={styles.image_wrapper}>
                          <img
                            className={styles.image}
                            src={`http://127.0.0.1:8000${item.images[0].url}`}
                            alt=""
                          />
                        </div>
                        <div className={styles.info_wrapper}>
                          <p className={styles.name}>
                            {`${item.type} ${item.model} - ${item.collection}`}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
          </div>
        </Card>
      )}
    </div>
  );
}
