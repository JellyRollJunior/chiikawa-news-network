import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const ImageCarousel = ({ className, imageArray }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const showNextImage = (length = 1) => {
    setImageIndex((prev) => (prev + 1) % length);
  };
  const showPrevImage = (length = 1) => {
    // This is (prev - 1) % length
    setImageIndex((prev) => (((prev - 1) % length) + length) % length);
  };

  if (!imageArray || !Array.isArray(imageArray)) return;
  return (
    <div className={`${className}`}>
      <div className="block-shadow h-9/10 flex-1 overflow-clip rounded-lg border-3 border-pink-300 bg-pink-200">
        <motion.div
          initial={{ translateX: 0 }}
          animate={{ translateX: `${imageIndex * -100}%` }}
          transition={{
            type: 'spring',
            visualDuration: 0.35,
            bounce: 0.3,
          }}
          className="relative flex h-full"
        >
          {imageArray.map((src, index) => (
            <img
              style={{ left: `${100 * index}%` }}
              key={index}
              className="absolute h-full w-full object-contain"
              src={src}
            />
          ))}
        </motion.div>
      </div>
      <div className="mt-3 flex items-center justify-center gap-8">
        <button
          className="yellow-button px-5"
          onClick={() => showPrevImage(imageArray.length)}
        >
          Prev
        </button>
        <div className="flex items-center gap-3">
          {imageArray.map((src, index) => (
            <button
              className={`block-shadow size-4 rounded-full ${imageIndex == index ? 'yellow-gradient' : 'duckegg-gradient'}`}
              onClick={() => setImageIndex(index)}
            ></button>
          ))}
        </div>
        <button
          className="yellow-button px-5"
          onClick={() => showNextImage(imageArray.length)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export { ImageCarousel };
