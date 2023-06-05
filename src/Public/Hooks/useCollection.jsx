import axios from "axios";
import { useEffect, useState } from "react";
import instance from "../../http";

// import { collection, getDocs } from 'firebase/firestore';

// import { db } from '../firebase/config';

export const useCollection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const productsRef = collection(db, 'products');

  const getCollection = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const products = [];
      await instance.get("/api/list-product").then((res) => {
        if (res.data.status == 200) {
          products.push(res.data.products);
          console.log(res.data.products);
        }
      });
      setIsLoading(false);

      const colorSizes = [];

      for (const product of products[0]) {
        for (const colorSize of [product.colorSizes]) {
          colorSizes.push({
            model: product.product_name,
            collection: product.category_name,
            type: product.product_type,
            id: colorSize[0].id,
            color: colorSize[0].color_name,
            price: product.product_price,
            url:  colorSize[0].url,
            slug: product.product_slug,
            images: colorSize[0].images,
            numberOfColorSizes: product.colorSizes.length,
          });
        }
      }
      console.log(colorSizes);
      return colorSizes;
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  return { getCollection, isLoading, error };
};
