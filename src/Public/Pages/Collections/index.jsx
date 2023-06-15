import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Components/Loader";
import ProductCard from "./ProductCard";
import styles from "./index.module.scss";
import { useCollection } from "../../Hooks/useCollection";
import Button from "../../Components/Button";
import Filter from "./Filter/index";
import instance from "../../../http";
import { useAuthContext } from "../../Hooks/useAuthContext";

export default function Collections({ collection }) {
  const { isVerified } = useAuthContext();
  const [favorite, setFavorite] = useState([]);

  const [statusFa, setStatusFa] = useState(false);
  const callBack = () => {
    setStatusFa((prev) => !prev);
  };
  const FavoriteChecker = (productId) => {
    const isProductFavorite = favorite.some(
      (favoriteItem) => favoriteItem.product_id == productId
    );
    return isProductFavorite;
  };
  useEffect(() => {
    if (isVerified) {
      instance.post("api/view-favorite").then((res) => {
        if (res.data.status == 200) {
          console.log(res.data.favorite);
          setFavorite(res.data.favorite);
        }
      });
    }
  }, [statusFa]);

  return (
    <>
      {!collection && <Loader />}
      {collection && (
        <>
          {/* <section> */}

          <div className={`${styles.container} main-container`}>
            {collection.map((product, index) => {
              let favoriteCheck = false;
              favoriteCheck = FavoriteChecker(product.id);
              console.log(favoriteCheck, product.id);
              return (
                <ProductCard
                  key={index}
                  id={product.id}
                  model={product.model}
                  color={product.color}
                  price={product.price}
                  type={product.type}
                  url={product.url}
                  slug={product.slug}
                  rate={product.rate}
                  status={product.status}
                  collection={product.collection}
                  _imageTop={product.images[0]}
                  _imageBottom={product.images[0]}
                  numberOfVariants={product.numberOfColorSizes}
                  favorite={favoriteCheck}
                  callBack={callBack}
                />
              );
            })}
          </div>

          {/* </section> */}
        </>
      )}
    </>
  );
}
