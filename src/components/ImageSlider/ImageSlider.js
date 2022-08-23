import classNames from "classnames";
import React, { useEffect, useState } from "react";
import "./_ImageSlider.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const slides = [
  {
    id: 1,
    title: "Lorem ipsum dolor",
    subtitle:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
  },
  {
    id: 2,
    title: "Duis aute irure dolor",
    subtitle:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
  },
  {
    id: 3,
    title: "Excepteur sint occaecat",
    subtitle:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
  },
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentIndex(prevState => {
          return prevState === slides.length - 1 ? 0 : prevState + 1;
        })
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex])

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="slider_container">
      <ArrowBackIosIcon
        fontSize="large"
        className="arrow"
        style={{ left: "2rem" }}
        onClick={goToPrevious}
      />
      <ArrowForwardIosIcon
        fontSize="large"
        className="arrow"
        style={{ right: "2rem" }}
        onClick={goToNext}
      />
      <div className="slide_text">
        <h1 className="slide_title">{slides[currentIndex].title}</h1>
        <p className="slide_subtitle">{slides[currentIndex].subtitle}</p>
      </div>
      <div className="dots">
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={classNames('dot', {dot_active: slideIndex === currentIndex})}
            ></div>
          ))}
        </div>
      <div className={classNames(`slide_${currentIndex + 1}`, "slide")}></div>
    </div>
  );
};

export default ImageSlider;
