import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const ImageCarousel = ({ className, imageArray }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const showNextImage = (length = 1) => {
    setImageIndex((prev) => (prev + 1) % length);
  };
  const showPrevImage = (length = 1) => {
    setImageIndex((prev) => (prev - 1) % length);
  };

  if (!imageArray || !Array.isArray(imageArray)) return;
  return (
    <div className={`${className}`}>
      <div className="h-9/10 flex-1 overflow-clip rounded-lg border-3 border-pink-300 bg-pink-200">
        <motion.div
          initial={{ translateX: 0 }}
          animate={{ translateX: `${imageIndex * -100}%` }}
          transition={{}}
          className="relative flex h-full"
        >
          {imageArray.map((src, index) => (
            <img
              style={{ left: `${100 * index}%` }}
              key={index}
              className="absolute h-full w-full border-5 border-black object-contain"
              src={src}
            />
          ))}
        </motion.div>
      </div>
      <div className="flex">
        <button onClick={() => showPrevImage(imageArray.length)}>Prev</button>
        <button onClick={() => showNextImage(imageArray.length)}>Next</button>
      </div>
    </div>
  );
};

export { ImageCarousel}