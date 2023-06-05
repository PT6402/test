/* eslint-disable react/prop-types */
import { useReducer, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ProductContext from "./product-context";
import instance from "../../../http";

const initialState = {
  productIsReady: false,
  selectedProduct: null,
  selectedColor: null,
  selectedSku: "",
  selectedSize: "",
  selectedStock: 0,
};

const productReducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_PRODUCT": {
      return {
        ...initialState,
      };
    }
    case "SET_PRODUCT": {
      return {
        ...state,
        productIsReady: true,
        selectedProduct: action.payload.product,
        selectedVariant: action.payload.colorSize,
      };
    }
    case "SELECT_VARIANT": {
      return {
        ...state,
        selectedVariant: action.payload,
        selectedSku: "",
        selectedSize: "",
        // selectedStock: 0,
      };
    }
    case "SELECT_SIZE": {
      return {
        ...state,
        selectedSku: action.payload.id,
        selectedSize: action.payload.value,
        // selectedStock: action.payload.stock,
      };
    }
    default: {
      return state;
    }
  }
};

const ProductProvider = ({ children }) => {
  const { slug: slug } = useParams();
  const { url: urlId } = useParams();
  const { state: locationState } = useLocation();
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(productReducer, initialState);
  const findMatchingURL = (selectedProduct) => {
    const { colorSizes } = selectedProduct;

    // Kiểm tra xem colorSizes có phải là mảng và không rỗng
    if (Array.isArray(colorSizes) && colorSizes.length > 0) {
      // Lặp qua từng mục trong mảng colorSizes
      for (const colorSize of colorSizes) {
        const { url } = colorSize;

        // Kiểm tra điều kiện khớp URL của colorSize
        if (url === urlId) {
          return colorSize;
        }
      }
    }

    return null; // Trả về null nếu không tìm thấy URL khớp
  };

  const getProduct = async () => {
    if (state.productIsReady) {
      dispatch({ type: "CLEAR_PRODUCT" });
    }

    let product = [];
    // let inventory =[]
    await instance.get(`/api/list-product/${slug}`).then((res) => {
      if (res.data.status == 200) {
        product = res.data.products;

        // inventory = inventory.push(res.data.products.colorSizes);
        console.log(res.data.products);
        // console.log(res.data.products.colorSizes);
      }
    });
    const colorSize = await findMatchingURL(product);
    return { product, colorSize };
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const { product, colorSize } = await getProduct();
      if (product) {
        dispatch({
          type: "SET_PRODUCT",
          payload: {
            product,
             colorSize,
          },
        });
        console.log({ product, colorSize });
      }
    };

    fetchProduct();
  }, [slug]);

  useEffect(() => {
    if (locationState == "/product") {
      const fetchProduct = () => {
        const { product, colorSize } = getProduct();

        dispatch({
            type: "SET_PRODUCT",
            payload: {
              product,
                colorSize,
            },
          });
        console.log({ product, colorSize });
        navigate(".");
      };

      fetchProduct();
    }
  }, [locationState]);

  console.log("product-context", state);

  return (
    <ProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
