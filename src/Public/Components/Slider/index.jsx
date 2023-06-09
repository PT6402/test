/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper';

import 'swiper/css';

const Slider = ({
  slides,
  bp,
  slidesPerView,
  spaceBetween,
  loop,
  centeredSlides,
  grabCursor,
  sliderClassName,
  slideClassName,
  imageClassName,
}) => {
  return (
    <>
      <Swiper
        breakpoints={bp}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        loop={loop}
        centeredSlides={centeredSlides}
        grabCursor={grabCursor}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
        className={sliderClassName}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className={slideClassName}>
            <img
              src={`http://127.0.0.1:8000/${slide.src}`}
              alt=""
              className={imageClassName}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;
