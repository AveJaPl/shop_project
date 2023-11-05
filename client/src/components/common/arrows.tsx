import IArrowProps from '@/types/IArrowProps';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const arrowStyles = `absolute top-1/2 transform -translate-y-1/2 z-10 
                     bg-white border border-gray-300 
                     rounded-full shadow-md h-10 w-10 
                     flex items-center justify-center 
                     cursor-pointer hover:bg-gray-50`;

const LeftArrow = (props: IArrowProps) => {
  return (
    <button
    onClick={props.onClick}
      className={`left-4 ${arrowStyles}`}
      aria-label="Previous"
    >
      <FaChevronLeft className="h-5 w-5 text-gray-800" />
    </button>
  );
};

const RightArrow = (props: IArrowProps) => {
  return (
    <button
    onClick={props.onClick}
      className={`right-4 ${arrowStyles}`}
      aria-label="Next"
    >
      <FaChevronRight className="h-5 w-5 text-gray-800" />
    </button>
  );
};

export { LeftArrow, RightArrow };
