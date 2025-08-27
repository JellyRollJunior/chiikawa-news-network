import { useUser } from '../hooks/useUser.js';
import { Avatar } from './Avatar.jsx';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const UserProfile = ({ userId }) => {
  const { user, isLoading } = useUser(userId);

  if (isLoading) {
    return (
      <section className="yellow-block px-2 pb-2 pt-3">
        <header className="ml-2 flex">
          <motion.div
            className="size-20 shrink-0 rounded-full bg-gray-200"
            style={{ backgroundColor: '#fff7ed' }}
            animate={{ backgroundColor: '#ccfbf1' }}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 0.8,
              ease: 'easeInOut',
            }}
          />
          <div className="mt-2 flex w-full flex-col items-center justify-center">
            <h2 className="font-chiikawa border-5 max-w-45 xxs:max-w-55 xs:max-w-64 -mt-2 shrink self-center border-dashed border-pink-300 px-2 py-2 text-sm font-bold">
              <motion.div
                className="h-6 w-32 rounded-full"
                style={{ backgroundColor: '#fff7ed' }}
                animate={{ backgroundColor: '#ccfbf1' }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 0.8,
                  ease: 'easeInOut',
                }}
              />
            </h2>
          </div>
        </header>
        <div className="mt-3 flex w-full justify-around gap-3 text-sm">
          <div className="flex items-center gap-2">
            <motion.div
              className="h-4 w-7 rounded-full"
              style={{ backgroundColor: '#fff7ed' }}
              animate={{ backgroundColor: '#ccfbf1' }}
              transition={{
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 0.8,
                ease: 'easeInOut',
              }}
            />{' '}
            Posts
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className="h-4 w-7 rounded-full"
              style={{ backgroundColor: '#fff7ed' }}
              animate={{ backgroundColor: '#ccfbf1' }}
              transition={{
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 0.8,
                ease: 'easeInOut',
              }}
            />{' '}
            Followers
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className="h-4 w-7 rounded-full"
              style={{ backgroundColor: '#fff7ed' }}
              animate={{ backgroundColor: '#ccfbf1' }}
              transition={{
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 0.8,
                ease: 'easeInOut',
              }}
            />{' '}
            Following
          </div>
        </div>
        <button className="blue-button mt-3 w-full px-7 py-0.5" disabled={true}>
          Follow
        </button>
        <motion.p
          className="mt-3 h-12 w-full rounded-sm text-xl font-bold"
          style={{ backgroundColor: '#fff7ed' }}
          animate={{ backgroundColor: '#ccfbf1' }}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 0.8,
            ease: 'easeInOut',
          }}
        />
      </section>
    );
  }

  return (
    <section className="yellow-block px-2 pb-2 pt-3">
      <header className="ml-2 flex">
        <Avatar avatar={user && user.avatar} size={5} />
        <div className="mt-2 flex w-full flex-col items-center justify-center">
          <h2 className="font-chiikawa border-5 max-w-45 xxs:max-w-55 xs:max-w-64 -mt-2 break-words border-dashed border-pink-300 px-2 py-2 text-sm font-bold">
            {user && user.username}
          </h2>
        </div>
      </header>
      <div className="mt-3 flex w-full justify-around gap-3 text-sm">
        <div>100 Posts</div>
        <div>100 Followers</div>
        <div>100 Following</div>
      </div>
      <button className="blue-button mt-3 w-full px-7 py-0.5">Follow</button>
      <p className="mt-3 text-center">{user && user.bio}</p>
    </section>
  );
};

export { UserProfile };
