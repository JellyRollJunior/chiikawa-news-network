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
      className={`flex h-fit items-center shrink-0 disabled:bg-gray-100 ${className}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      <motion.img
        key={src}
        className="w-4.5 md:w-6"
        src={src}
        whileTap={{ scale: 0.7 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 17,
          duration: 0.1,
        }}
      />{' '}
      <div className="text-sm">{count}</div>
    </button>
  );
};

export { IncrementButton };
