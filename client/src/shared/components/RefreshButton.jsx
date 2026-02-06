import refreshIcon from '@/assets/svgs/refresh.svg';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const RefreshButton = ({ className = 'hover:bg-pink-200', onclick, isDisabled = false }) => {
  return (
    <motion.button
      initial={{ rotate: 0 }}
      transition={{
        duration: 0.8,
        ease: 'easeInOut',
      }}
      whileHover={{
        rotate: 360,
        transition: {
          duration: 1,
          ease: 'easeInOut',
        },
      }}
      className={`rounded-2xl px-1 py-1 ${className} disabled:bg-gray-200`}
      onClick={onclick}
      disabled={isDisabled}
    >
      <img src={refreshIcon} alt="Refresh icon" />
    </motion.button>
  );
};

export { RefreshButton };
