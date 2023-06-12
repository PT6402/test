import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Components/Loader";
import ProductCard from "./ProductCard";
import styles from "./index.module.scss";
import { useCollection } from "../../Hooks/useCollection";
import Button from "../../Components/Button";
import Filter from "./Filter/index";

export default function Collections() {
  const navigate = useNavigate();
  const { id: urlId } = useParams();

  const { getCollection } = useCollection();

  const [products, setProducts] = useState(null);
  const [collection, setCollection] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getCollection();
      setProducts(fetchedProducts);
    };
    console.log(products);

    fetchProducts();
  }, [urlId]);

  useEffect(() => {
    if (products) {
      let selectedProducts;
      if (urlId === "product") {
        selectedProducts = products;
      } else if (urlId === "men" || urlId === "women") {
        selectedProducts = products.filter(
          (product) => product.collection === urlId
        );
      } else {
        selectedProducts = null;
      }
      console.log(selectedProducts);

      if (selectedProducts) {
        setCollection(selectedProducts);
        console.log(selectedProducts);
      } else {
        navigate("/");
      }
    }
  }, [navigate, products, urlId]);

  return (
    <>
      {!collection && <Loader />}
      {collection && (
        <>
        {/* <section> */}
            {/* <Filter> */}
          <div className={`${styles.container} main-container`}>
              {collection.map((product, index) => (
                <ProductCard
                  key={index}
                  model={product.model}
                  color={product.color}
                  price={product.price}
                  type={product.type}
                  url={product.url}
                  slug={product.slug}
                  collection={product.collection}
                  _imageTop={product.images[0]}
                  _imageBottom={product.images[0]}
                  numberOfVariants={product.numberOfColorSizes}
                />
              ))}
          </div>
            {/* </Filter> */}
        {/* </section> */}
        </>
      )}
    </>
  );
}
