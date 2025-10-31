// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const IncrementButton = ({
  className,
  src,
  count,
  onClick,
  isDisabled = false,
}) => {
  return (
    <button
      className={`flex h-fit shrink-0 items-center ${className}`}
      onClick={onClick}
    >
      <motion.img
        key={src}
        className="w-4.5 disabled:bg-gray-100 md:w-6"
        src={src}
        whileTap={{ scale: 0.7 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 17,
          duration: 0.1,
        }}
        disabled={isDisabled}
      />{' '}
      <div className="text-sm">{count}</div>
    </button>
  );
};

export { IncrementButton };
