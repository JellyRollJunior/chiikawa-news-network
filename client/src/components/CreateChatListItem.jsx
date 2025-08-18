import { Avatar } from './Avatar.jsx';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const CreateChatListItem = ({
  userId,
  avatar,
  username,
  onClick,
  selected = false,
  isLoading,
  delay,
}) => {
  if (isLoading) {
    return (
      <motion.li
        style={{ backgroundColor: '#FFFFFF' }}
        className="flex gap-2 rounded-sm px-4 py-2"
        animate={{ backgroundColor: '#E5E7EB' }}
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 0.8,
          delay: delay,
          ease: 'easeInOut',
        }}
      >
        <button
          className="flex h-full w-full gap-2 rounded-sm px-2 py-1"
          type="button"
        >
          <div className="size-10 shrink-0 rounded-full bg-gray-200"></div>
          <div className="flex items-center">
            <h4 className="h-4 w-32 rounded-sm bg-gray-200 text-lg"></h4>
          </div>
        </button>
      </motion.li>
    );
  }

  return (
    <li key={userId}>
      <button
        className={`flex h-full w-full gap-2 rounded-sm px-2 py-1 hover:bg-gray-200`}
        onClick={onClick}
        type="button"
      >
        <Avatar avatar={avatar} size={2.5} />
        <div className="flex items-center">
          <h4 className="text-lg font-medium">{username}</h4>
        </div>
        {selected && (
          <div className="ml-auto mr-2 flex items-center text-2xl">☑</div>
        )}
      </button>
    </li>
  );
};

export { CreateChatListItem };
