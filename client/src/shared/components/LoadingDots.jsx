import { Fragment } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const LoadingDots = ({ dotTravelDistance = 12, color = 'bg-amber-950' }) => {
  return (
    <>
      {[...Array(3)].map((item, index) => (
        <Fragment key={index}>
          <motion.span
            className="inline-block"
            animate={{ translateY: dotTravelDistance * -1 }}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 0.8,
              delay: 0.2 * index,
              ease: 'easeInOut',
            }}
          >
            <div className={`size-1 rounded-full ${color}`}></div>
          </motion.span>{' '}
        </Fragment>
      ))}
    </>
  );
};

export { LoadingDots };
