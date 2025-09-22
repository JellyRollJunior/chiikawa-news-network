// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const LoadingElement = ({
  className,
  initialColor = '#FFFDED',
  transitionColor = '#cce6e3',
  delay = 0,
  children,
}) => {
  return (
    <motion.div
      className={className}
      style={{ backgroundColor: initialColor }}
      animate={{ backgroundColor: transitionColor }}
      transition={{
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 0.8,
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export { LoadingElement };
