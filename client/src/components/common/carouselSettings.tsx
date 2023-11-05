import { LeftArrow, RightArrow } from "./arrows";
const carouselSettings = {
  dots: false,
  className: "center",
  centerMode: true,
  infinite: true,
  speed: 600,
  slidesToShow: 3,
  slidesToScroll: 1,
  nextArrow: <RightArrow />,
  prevArrow: <LeftArrow />,
  swipeToSlide: true,
};

export default carouselSettings;
