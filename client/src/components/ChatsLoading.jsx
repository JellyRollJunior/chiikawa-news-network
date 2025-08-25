import { Fragment } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const ChatsLoadingItem = ({ delay }) => {
  return (
    <motion.li
      className="mx-1 flex gap-2 rounded-md px-2 py-2"
      style={{ backgroundColor: '#fff7ed' }}
      animate={{ backgroundColor: '#ccfbf1' }}
      transition={{
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 0.8,
        delay: delay,
        ease: 'easeInOut',
      }}
    >
      <div className="size-14 shrink-0 rounded-full bg-stone-300"></div>
      <div className="flex flex-col justify-center">
        <h4 className="w-18 h-4 rounded-sm bg-stone-300"></h4>
        <p className="w-30 mt-1 h-4 items-start justify-self-start rounded-sm bg-stone-300"></p>
      </div>
    </motion.li>
  );
};

const ChatsLoading = ({ items = 4 }) => {
  if (items == 1) {
    return <ChatsLoadingItem />;
  }

  return [...Array(items)].map((item, index) => (
    <Fragment key={index}>
      <ChatsLoadingItem />
      <ChatsLoadingItem delay={0.8} />
    </Fragment>
  ));
};

export { ChatsLoading };
