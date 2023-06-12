import axios from "axios";
import { useEffect, useState } from "react";
import instance from "../../http";

// import { collection, getDocs } from 'firebase/firestore';

// import { db } from '../firebase/config';
import CryptoJS from "crypto-js";
export const useCollection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);

  // const productsRef = collection(db, 'products');
  //

  const [product, setProduct] = useState([]);
  // useEffect(() => {
  //   const encryptedProduct = localStorage.getItem("product");
  //   const decryptedProductBytes = CryptoJS.AES.decrypt(
  //     encryptedProduct,
  //     "secret_key"
  //   );

  //   if (decryptedProductBytes.toString()) {
  //     const decryptedProduct = JSON.parse(
  //       decryptedProductBytes.toString(CryptoJS.enc.Utf8)
  //     );
  //     setProduct(decryptedProduct);
  //     // Sử dụng dữ liệu category đã giải mã
  //   }
  // }, [product]);
  // console.log(product);
  //
  const getProduct = () => {
    const encryptedProduct = localStorage.getItem("product");
    const decryptedProductBytes = CryptoJS.AES.decrypt(
      encryptedProduct,
      "secret_key"
    );

    if (decryptedProductBytes.toString()) {
      const decryptedProduct = JSON.parse(
        decryptedProductBytes.toString(CryptoJS.enc.Utf8)
      );
      // setProduct(decryptedProduct);
      return decryptedProduct;
      // Sử dụng dữ liệu category đã giải mã
    }
  };
  const getCollection = async () => {   
    setError(null);
    setIsLoading(true);
    try {
      const products = [];
      const datas = await getProduct();

      if (product) {
        products.push(datas);
        console.log(datas);
      }

      setIsLoading(false);

      const getProductsByColor = (datas) => {
        const products = [];

        for (const data of datas) {
          for (const item of data) {
            for (const colorSize of item.colorSizes) {
              products.push({
                model: item.product_name,
                slug: item.product_slug,
                price: item.product_price,
                // product_description: item.product_description,
                // product_type: item.product_type,
                // product_material: item.product_material,
                collection: item.category_name,
                type: item.subcategory_name,
                color: colorSize.color_name,
                // sizes: [colorSize].sizes,
                images: colorSize.images,
                url: colorSize.url,
                // total_price: [colorSize].total_price,
                numberOfColorSizes: item.colorSizes.length,
              });
            }
          }
        }

        return products;
      };

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
            url: colorSize[0].url,
            slug: product.product_slug,
            images: colorSize[0].images,
            numberOfColorSizes: product.colorSizes.length,
          });
        }
      }
      const data = getProductsByColor(products);

      console.log(colorSizes);
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  return { getCollection, isLoading, error };
};
