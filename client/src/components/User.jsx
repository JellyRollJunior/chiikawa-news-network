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
    <div className="main-container mx-4 mb-2 mt-3 w-full max-w-md px-2 pb-3 pt-3">
      <section className="yellow-block px-2 pb-2 pt-3">
        <header className="ml-2 flex">
          <Avatar avatar={user && user.avatar} size={5} />
          <div className="mt-2 flex w-full flex-col items-center justify-center">
            <h2 className="font-chiikawa border-5 max-w-45 xxs:max-w-55 xs:max-w-64 -mt-2 shrink self-center break-words border-dashed border-pink-300 px-2 py-2 text-sm font-bold">
              {user && user.username}
            </h2>
          </div>
        </header>
        <button className="blue-button mt-3 w-full px-7 py-0.5">Follow</button>
        <div className="mt-3 flex w-full justify-around gap-3 text-sm">
          <div>100 Posts</div>
          <div>100 Followers</div>
          <div>100 Following</div>
        </div>
        <p className="mt-3 px-2">{user && user.bio}</p>
      </section>
    </div>
  );
};

export { User };
