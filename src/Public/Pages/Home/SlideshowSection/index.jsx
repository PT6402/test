import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

// import Slideshow from "../../../Components/Slideshow";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
// import {
//     BIG_SCREEN_SLIDES as bigScreenSlides,
//     SMALL_SCREEN_SLIDES as smallScreenSlides,
// } from "./data";

import styles from "./index.module.scss";
import Button from "../../../Components/Button";

const SlideshowSection = () => {
  const [showContent, setShowContent] = useState(true);

  const isBigScreen = useMediaQuery({
    query: "(min-width: 900px)",
  });

  // TODO: AGREGAR EFECTO CUANDO APARECE EL CONTENIDO
  useEffect(() => {
    setShowContent(false);

    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [isBigScreen]);
  //
  const slides = [
    {
      url: "http://127.0.0.1:8000/images/f82d3768-1751-4209-8a5c-bec6beabf208.jpg",
    },
    {
      url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80",
    },

    {
      url: "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  return (
    <section className={styles.nav_section}>
      <section className={styles.section}>
        <div className={`${styles.container} main-container`}>
          {/* <p className={styles.section_text}>Comprá lo</p>
                <h1 className={styles.section_title}>Ultimo</h1> */}
          <div className={styles.wrapper}>
            {showContent && (
              <div className={styles.content_wrapper}>
                <p className={styles.content_title}>Capsula #01</p>
                <p className={styles.content_title}>De gira</p>
                <p className={styles.content_subtitle}>
                  Remeras, buzos y gorras
                </p>
                <Button className={styles.button} to="/categorias/productos">
                  Ver productos
                </Button>
              </div>
            )}
            {/*  */}
            {/* {isBigScreen && <Slideshow slides={bigScreenSlides} />}

                    {!isBigScreen && (
                        <Slideshow
                            slides={smallScreenSlides}
                            className={styles.image}
                        />
                    )} */}
            {/*  */}
            <div className="">
              <div className="max-w-[1400px] h-[300px] xl:h-screen w-full m-auto   relative group  ">
                <div
                  style={{
                    backgroundImage: `url(${slides[currentIndex].url})`,
                  }}
                  className="w-full h-full rounded-3xl bg-center bg-cover duration-500"
                ></div>

                <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                  <BsChevronCompactLeft onClick={prevSlide} size={30} />
                </div>

                <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                  <BsChevronCompactRight onClick={nextSlide} size={30} />
                </div>
                <div className="flex top-4 justify-center py-2 ">
                  {slides.map((slide, slideIndex) => (
                    <div
                      key={slideIndex}
                      onClick={() => goToSlide(slideIndex)}
                      className="text-2xl cursor-pointer "
                    >
                      <RxDotFilled />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default SlideshowSection;
