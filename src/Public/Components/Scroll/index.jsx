import React, { Children, useRef, useState } from "react";
import "./index.module.scss"
const ScrollableDiv = ({ children }) => {
  const containerRef = useRef(null);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(null);

  const handleMouseDown = (event) => {
    setStartX(event.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (event) => {
    if (!startX) return;
    const x = event.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Điều chỉnh tốc độ cuộn

    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setStartX(null);
    setScrollLeft(null);
  };

  return (
    <div
      className="scrollable-container"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {children}
    </div>
  );
};

export default ScrollableDiv;
