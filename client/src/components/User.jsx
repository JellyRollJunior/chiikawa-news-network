import { useUser } from '../hooks/useUser.js';
import { Avatar } from './Avatar.jsx';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const User = ({ userId }) => {
  const { user, isLoading } = useUser(userId);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <motion.div
          style={{ backgroundColor: '#f3f4f6' }}
          animate={{ backgroundColor: '#d1d5db' }}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="size-32 shrink-0 rounded-full bg-gray-200"
        ></motion.div>
        <motion.h2
          style={{ backgroundColor: '#f3f4f6' }}
          animate={{ backgroundColor: '#d1d5db' }}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="mt-2 h-4 w-36 self-center rounded-sm bg-gray-200 text-xl font-bold"
        ></motion.h2>
        <div className="mt-2 self-start font-medium text-gray-500">Bio</div>
        <motion.p
          style={{ backgroundColor: '#f3f4f6' }}
          animate={{ backgroundColor: '#d1d5db' }}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="mt-2 h-14 w-full self-center rounded-sm bg-gray-200 text-xl font-bold"
        ></motion.p>
      </div>
    );
  }

  return (
    <div className="main-container mx-4 mb-2 mt-3 flex w-full max-w-md flex-col items-center">
      <Avatar avatar={user && user.avatar} size={8} />
      <h2 className="mt-1 self-center text-xl font-bold">{user && user.username}</h2>
      <div className="mt-2 flex w-full items-center self-start font-medium">
        <h3>Bio</h3>
      </div>
      <section className="w-full px-7">
        <p className="px-1.5 py-0.5">{user && user.bio}</p>
      </section>
    </div>
  );
};

export { User };
