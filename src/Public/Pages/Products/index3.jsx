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
  const [toastMessage, setToastMessage] = useState(null);
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
      setNotification(true);
    } else {
      navigate("/account/login");
    }
  };

  useEffect(() => {
    if (notification) {
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
  }, [notification]);

  const toggleToast = () => {
    setToastMessage(null);
  };

  let addEventHandler = false;
  if (selectedSize.length > 0) {
    addEventHandler = true;
  }

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
          {/* {!isBigScreen && (
            <>
              <section>
                <div className={styles.container_s}>
                  <div className={styles.swiper_container}>
                    <div className={styles.swiper_wrapper}>
                      <Slider
                        slides={selectedVariant.images}
                        bp={{
                          500: {
                            slidesPerView: 1.5,
                          },
                          600: {
                            slidesPerView: 1.7,
                          },
                          800: {
                            slidesPerView: 2,
                          },
                        }}
                        slidesPerView={1.3}
                        spaceBetween={30}
                        loop={true}
                        centeredSlides={true}
                        grabCursor={true}
                        sliderClassName={styles.slider}
                        slideClassName={styles.slide}
                        imageClassName={styles.image}
                      />
                    </div>
                  </div>
                  <div className={styles.grid_footer}>
                    <div className={styles.details_wrapper}>
                      <div className={styles.details}>
                        <div className={styles.name_wrapper}>
                          <h1 className={styles.name}>
                            {selectedProduct.product_name}
                          </h1>
                          <p className={styles.price}>
                            ${selectedProduct.product_price}
                          </p>
                        </div>
                        <p className={styles.description}>
                          {selectedProduct.product_description}
                        </p>
                        <p className={styles.color}>
                          {selectedVariant.color_name}
                        </p>
                        {selectedProduct.tags && (
                          <div className={styles.tags_wrapper}>
                            {selectedProduct.tags.map((tag) => (
                              <span
                                key={tag.id}
                                className={
                                  tag.content === 'nuevo'
                                    ? styles.tag_alt
                                    : styles.tag
                                }
                              >
                                {tag.content}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className={styles.controls_wrapper}>
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
                              thumbnail={variant.images.url}
                              selectedVariantId={selectedVariant.variantId}
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
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className={styles.button_wrapper}>
                      {!isLoading && (
                        <Button
                          className={buttonStyles}
                          disabled={isButtonDisabled}
                          onClick={
                            addEventHandler ? handleAddToCart : undefined
                          }
                        >
                          {buttonContent}
                        </Button>
                      )}
                      {isLoading && (
                        <Button className={buttonStyles} disabled={true}>
                          {buttonContent}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </>
          )} */}

          <>
            <section className="main-container">
              <div className={styles.container_b}>
                <div className={styles.details_wrapper}  onClick={handleThumbnails}>
                  <div className={styles.details}>
                    <h1 className={styles.name}>
                      {selectedProduct.product_name}
                    </h1>

                    <Rating
                      initialRating={2}
                      readonly
                      emptySymbol={
                        <IconEmpty href="#icon-star-empty" className="icon" />
                      }
                      fullSymbol={
                        <IconFull href="#icon-star-full" className="icon" />
                      }
                    />

                    <p className={styles.description}>
                      {selectedProduct.product_description}
                    </p>
                    <p className={styles.color}>{selectedVariant.color_name}</p>

                    <p className={styles.price}>
                      ${selectedProduct.product_price}
                    </p>
                  </div>
                </div>

                <div className={styles.images_wrapper}>
                  <div className={`${styles.images} ${state.flag == 1?"before:invisible":" "} `} onClick={handleThumbnails}>
                    <CenterReview>
                      {state.flag == 1 && (
                        <ImageDetail selectedVariant={selectedVariant} />
                      )}

                      {state.flag === 2 && (
                        <div className="w-full border">Description</div>
                      )}
                      {state.flag == 3 && <ReviewProduct />}
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
                      Review
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
                      onClick={addEventHandler ? handleAddToCart : undefined}
                    >
                      {buttonContent}
                    </Button>
                  )}
                  {isLoading && (
                    <Button className={buttonStyles} disabled={true}>
                      {buttonContent}
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
