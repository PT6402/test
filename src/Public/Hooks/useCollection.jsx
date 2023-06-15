import { useEffect, useState } from "react";

import CryptoJS from "crypto-js";

export const useCollection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);
  const [product, setProduct] = useState(false);
  //
  const [color, setColor] = useState(null);
  const [price, setPrice] = useState(null);
  const [sub, setSub] = useState(null);
  const [size, setSize] = useState(null);
  const [material, setMaterial] = useState(null);
  const [typeShoes, seTypeShoes] = useState(null);

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
  const getSub = (data) => {
    const encryptedSubCategory = localStorage.getItem("subcategory");
    const decryptedSubCategoryBytes = CryptoJS.AES.decrypt(
      encryptedSubCategory,
      "secret_key"
    );
    if (data) {
      setSub(data);
    }
    if (decryptedSubCategoryBytes.toString()) {
      const decryptedSubCategory = JSON.parse(
        decryptedSubCategoryBytes.toString(CryptoJS.enc.Utf8)
      );
      // Sử dụng dữ liệu category đã giải mã
      const uniqueSubcategories = [
        ...new Set(decryptedSubCategory.map((item) => item.subcategory_name)),
      ];

      const result = uniqueSubcategories.map((name) => ({ name }));
      return result;
    }
  };
  console.log(sub);
  const getColor = (data) => {
    if (product.length > 0) {
      const uniqueColors = [...new Set(product.map((item) => item.color))].map(
        (color) => ({ label: color, value: color })
      );
      return uniqueColors;
    }


    if(data){
      console.log(data)
    }
  };
  const getSize = () => {
    if (product.length > 0) {
      const sizes = [
        ...new Set(
          product.flatMap((item) => item.sizes.map((size) => size.size_name))
        ),
      ];
      const sizeArray = sizes.map((size) => {
        return { label: size, value: size };
      });
      console.log(sizeArray);
      return sizeArray;
    }
  };
  const getMaterial = () => {
    if (product) {
      const uniqueMaterials = [
        ...new Set(product.map((product) => product.material)),
      ].map((material) => ({ label: material, value: material }));
      return uniqueMaterials;
    }
  };
  const getTypeShoes = () => {
    if (product) {
      const uniqueTypeShoes = [
        ...new Set(product.map((product) => product.typeShoes)),
      ].map((typeShoes) => ({ label: typeShoes, value: typeShoes }));
      return uniqueTypeShoes;
    }
  };

  const getProductsByColor = (datas) => {
    const products = [];

    for (const data of datas) {
      for (const item of data) {
        for (const colorSize of item.colorSizes) {
          products.push({
            id: item.id,
            model: item.product_name,
            slug: item.product_slug,
            price: item.product_price,
            rate: item.rating.rate,

            typeShoes: item.product_type,
            material: item.product_material,
            collection: item.category_name,
            type: item.subcategory_name,
            color: colorSize.color_name,
            status: item.product_status,
            sizes: colorSize.sizes,
            images: colorSize.images,
            url: colorSize.url,

            numberOfColorSizes: item.colorSizes.length,
          });
        }
      }
    }

    return products;
  };

  // const filterProducts = () => {
  //   if (!sub && !size && !price) {
  //     return product; // Hiển thị toàn bộ danh sách sản phẩm khi không có bộ lọc nào được áp dụng
  //   }

  //   const filtered = product.filter((product) => {
  //     if (color && product.color !== color) {
  //       return false;
  //     }

  //     if (sub && product.type != sub) {
  //       console.log(sub);
  //       return false;
  //     }

  //     // if (price && product.price > price) {
  //     //   return false;
  //     // }

  //     return true;
  //   });

  //   if (filtered.length == 0) {
  //     return null; // Trả về null nếu không có kết quả tìm thấy
  //   }

  //   return filtered;
  // };
  // useEffect(() => {
  //   if (product) {
  //     const filterProduct = () => {
  //       product.filter((product) => {
  //         return product.type == sub;
  //       });
  //     };
  //     filterProduct();
  //   }
  // }, []);

  const Merproduct = (product) => {
   
    const filteredData = [];
    const ids = [];
    for (let i = 0; i < product.length; i++) {
      if (!ids.includes(product[i].id)) {
        filteredData.push(product[i]);
        ids.push(product[i].id);
      }
    }
    return filteredData;
  };

  const getCollection = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const products = [];
      const datas = await getProduct();
     let dataMer ;
     
      products.push(datas);
      console.log(datas);
      const data = getProductsByColor(products);

      // console.log(colorSizes;
      setProduct(data);
      console.log(data);
      setIsLoading(false);
      // const filter = data.filter((product) => {
      //   return (product.type = sub);
      // });
      // console.log(filter);
    return data
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  const getAll = (data) => {
    console.log(data);
  };
  // useEffect(() => {
  //   getCollection();
  // }, [color, sub, material, price, typeShoes]);
  return {
    getCollection,
    isLoading,
    error,
    getSub,
    getColor,
    getAll,
    getMaterial,
    getSize,
    getTypeShoes,
  };
};
