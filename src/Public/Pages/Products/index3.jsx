/* eslint-disable no-undef */
import { useState, useEffect, useReducer } from "react";
import { useMediaQuery } from "react-responsive";
import styles from "./index.module.scss";
import Toast from "../../Components/Toast";
import ToastMessage from "../../Components/ToastMessage";
import Loader from "../../Components/Loader";
import Slider from "../../Components/Slider";
import ProductVariant from "./ProductVariant";
import ProductSize from "./ProductSize";
import Button from "../../Components/Button";
import { useProductContext } from "../../Hooks/useProductContext";
import { useCart } from "../../Hooks/useCart";
import { useAuthContext } from "../../Hooks/useAuthContext";
// import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Rating from "react-rating";
import { IconFull, IconEmpty } from "./icon";

import CenterReview from "./CenterReview";
import ReviewProduct from "./Review/index";
import AsNavFor from "./SlickImageProduct";
import ImageDetail from "./ImageDetail";
import Accordion from "./Accordion";
import instance from "../../../http";

const Products = () => {
  const {
    productIsReady,
    selectedProduct,
    selectedVariant,
    selectedSize,
    selectedSku,
    // selectedStock,
  } = useProductContext();

  console.log({
    productIsReady,
    selectedProduct,
    selectedVariant,
    selectedSize,
    selectedSku,
  });
  const { isVerified } = useAuthContext();

  const { addItem, isLoading, error } = useCart();

  const [notification, setNotification] = useState(false);
  const [toastMessage, setToastMessage] = useState(0);
  const navigate = useNavigate();
  const initialState = {
    flag: 1,
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "DES":
        return { ...state, flag: 2 };
      case "REVIEW":
        return { ...state, flag: 3 };
      case "THUMBNAILS":
        return { ...state, flag: 1 };
      default:
        return state;
    }
  };
  const handleDes = () => {
    dispatch({ type: "DES" });
  };

  const handleReview = () => {
    dispatch({ type: "REVIEW" });
  };

  const handleThumbnails = () => {
    dispatch({ type: "THUMBNAILS" });
  };
  // useEffect(()=>{
  //   if(state.flag==1){
  //     dispatch({ type: 'THUMBNAILS' });
  //   }
  // },[state])
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleAddToCart = () => {
    console.log(selectedVariant);

    if (isVerified) {
      addItem({
        productId: selectedProduct.id,
        id: selectedSku,
        size: selectedSize,
        model: selectedProduct.product_name,
        type: selectedProduct.subcategory_name,
        description: selectedProduct.description,
        color: selectedVariant.color_name,
        price: selectedProduct.product_price,
        url: selectedVariant.url,
        thumbnail: selectedVariant.images[0].url,
        stock: selectedVariant.sizes[0].quantity,
      });
      setNotification(2);
    } else {
      navigate("/account/login");
    }
  };

  useEffect(() => {
    if (notification == 2) {
      if (!error) {
        setToastMessage({
          addToCartSuccess: true,
          thumbnail: selectedVariant.images[0].url,
          details: `${selectedProduct.category_name} ${selectedProduct.product_name} - ${selectedVariant.color_name} - ${selectedSize}`,
        });
      } else if (error) {
        setToastMessage({ error, details: error.details });
      }

      console.log(selectedVariant.images[0].url);
      setNotification(false);
    }
    if (notification == 1) {
      setToastMessage({
        addToCartNotSize: true,

        details: `chon size`,
      });
      setNotification(false);
    }
  }, [notification]);

  const toggleToast = () => {
    setToastMessage(null);
  };

  let addEventHandler = false;
  if (selectedSize.length > 0) {
    addEventHandler = true;
  }
  const handleMessageSize = () => {
    setNotification(1);
  };
  const buttonContent =
    selectedSize.length === 0 ? "SELECT SIZE" : `ADD ${selectedSize} TO CART`;

  const buttonStyles = `
    ${selectedSize.length === 0 ? styles.button_disabled : styles.button}
  `;

  const isButtonDisabled = selectedSize.length === 0 ? true : false;

  // const isBigScreen = useMediaQuery({
  //   query: "(min-width: 1024px)",
  // });

  // TODO: HACER QUE EL TEXT EN LOS COSTADOS SE DESPLACE APENAS HAY EVENTO DE SCROLL
  {
    console.log(state);
  }
  //

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

  //

  const addFa = (id) => {
    if (isVerified) {
      instance.post("api/store-favorite", { id }).then((res) => {
        if (res.data.status == 200) {
          callBack();
          console.log(res.data.favorite);
        }
      });
    } else {
      navigate("/account/login");
    }
  };
  const deleteFa = (id) => {
    instance.post("api/delete-favorite", { id }).then((res) => {
      if (res.data.status == 200) {
        callBack();
        console.log(res.data.favorite);
      }
    });
  };
  let favoriteCheck = false;
  if (selectedProduct) {
    favoriteCheck = FavoriteChecker(selectedProduct.id);
    console.log(favoriteCheck, selectedProduct.id);
  }
  return (
    <>
      <Toast>
        {toastMessage && (
          <ToastMessage toggleToast={toggleToast} content={toastMessage} />
        )}
      </Toast>
      {!productIsReady && <Loader />}
      {productIsReady && (
        <>
          <>
            <section className="main-container">
              <div className={styles.container_b}>
                <div
                  className={`${styles.details_wrapper} 
${
  selectedProduct.product_status == 2
    ? styles.sale
    : selectedProduct.product_status == 3
    ? styles.new
    : ""
}
    
      
      
      `}
                  onClick={handleThumbnails}
                >
                  <div className={styles.details}>
                    <div className={styles.rateName_wrapper}>
                      <h1 className={styles.name}>
                        {selectedProduct.product_name}
                      </h1>
                      {selectedProduct.product_status == 2 && (
                        <div
                          className={`${styles.tags_wrapper} pl-5 items-center`}
                        >
                          <span className={`${styles.tag_alt}`}>Sale</span>
                        </div>
                      )}
                      {selectedProduct.product_status == 3 && (
                        <div
                          className={`${styles.tags_wrapper} pl-5 items-center`}
                        >
                          <span className={`${styles.tag_alt1}`}>New</span>
                        </div>
                      )}
                    </div>

                    <div className={styles.rate}>
                      <Rating
                        initialRating={selectedProduct.rating.rate}
                        readonly
                        emptySymbol={
                          <IconEmpty href="#icon-star-empty" className="icon" />
                        }
                        fullSymbol={
                          <IconFull href="#icon-star-full" className="icon" />
                        }
                      />
                      <span>({selectedProduct.rating.rate})</span>
                    </div>

                    <p className={styles.price}>
                      ${selectedProduct.product_price}
                    </p>
                  </div>
                </div>

                <div className={styles.images_wrapper}>
                  <div className={`${styles.images}  `}>
                    {state.flag != 1 && (
                      <div
                        onClick={handleThumbnails}
                        className={`${styles.icon} `}
                      ></div>
                    )}
                    {state.flag == 1 && (
                      <div className={styles.favorite}>
                        {favoriteCheck ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            onClick={() => deleteFa(selectedProduct.id)}
                          >
                            <path
                              stroke="#464455"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 11.286L10.8 13 15 9m-3-2.409l-.154-.164c-1.978-2.096-5.249-1.85-6.927.522-1.489 2.106-1.132 5.085.806 6.729L12 19l6.275-5.322c1.938-1.645 2.295-4.623.806-6.729-1.678-2.372-4.949-2.618-6.927-.522L12 6.591z"
                            ></path>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            onClick={() => addFa(selectedProduct.id)}
                          >
                            <path
                              stroke="#464455"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.846 6.427l.154.164.154-.164c1.978-2.096 5.249-1.85 6.927.522 1.489 2.106 1.132 5.085-.806 6.729L12 19l-6.275-5.322c-1.938-1.645-2.295-4.623-.806-6.729 1.678-2.372 4.949-2.618 6.927-.522z"
                            ></path>
                          </svg>
                        )}
                      </div>
                    )}
                    <CenterReview>
                      {state.flag == 1 && (
                        <ImageDetail selectedVariant={selectedVariant} />
                      )}

                      {state.flag === 2 && <Accordion />}
                      {state.flag == 3 && (
                        <ReviewProduct review={selectedProduct.review} />
                      )}
                    </CenterReview>
                  </div>
                </div>
                <div className={styles.controls_wrapper}>
                  <div className={`${styles.welcome_wrapper} relative `}>
                    <Button
                      className={`${styles.logout_button} border-r border-gray-400`}
                      onClick={handleDes}
                    >
                      Description
                    </Button>
                    <Button
                      className={`${styles.logout_button} border-l border-gray-400`}
                      onClick={handleReview}
                    >
                      Review({(selectedProduct.rating.count )>-1?(selectedProduct.rating.count):(0)})
                    </Button>
                  </div>
                  <div className={styles.variants_container}>
                    <p className={styles.number_of_colors}>
                      {selectedProduct.colorSizes.length}{" "}
                      {selectedProduct.colorSizes.length > 1
                        ? "Colores"
                        : "Color"}{" "}
                      <span>| {selectedVariant.color_name}</span>
                    </p>
                    <div className={styles.variants_wrapper}>
                      {selectedProduct.colorSizes.map((variant) => (
                        <ProductVariant
                          key={variant.id}
                          id={variant.id}
                          thumbnail={variant.images[0].url}
                          selectedVariantId={selectedVariant.id}
                          handleThumbnails={handleThumbnails}
                        />
                      ))}
                    </div>
                  </div>

                  <div className={styles.sizes_container}>
                    <p className={styles.pick_size}>Select your size</p>

                    <div className={styles.sizes_wrapper}>
                      {selectedVariant.sizes.map((size) => (
                        <ProductSize
                          key={size.id}
                          id={size.id}
                          value={size.size_name}
                          stock={size.quantity}
                          selectedSize={selectedSize}
                          handleThumbnails={handleThumbnails}
                        />
                      ))}
                    </div>
                  </div>

                  {!isLoading && (
                    <Button
                      className={buttonStyles}
                      disabled={isButtonDisabled}
                      onClick={
                        addEventHandler ? handleAddToCart : handleMessageSize
                      }
                    >
                      {/* {buttonContent} */}ADD TO CARTs
                    </Button>
                  )}
                  {isLoading && (
                    <Button
                      className={buttonStyles}
                      disabled={true}
                      onClick={handleMessageSize}
                    >
                      {/* {buttonContent} */}ADD TO CARTs
                    </Button>
                  )}
                </div>
              </div>
            </section>
          </>
          {/* )} */}
        </>
      )}
    </>
  );
};

export default Products;
