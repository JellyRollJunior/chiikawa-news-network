import { Avatar } from './Avatar.jsx';
import usagiIcon from '../assets/icons/usagi-icon.png';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const ChatsCreateListItem = ({
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
        style={{ backgroundColor: '#fef9c3' }}
        className="flex gap-2 rounded-sm px-4 py-2"
        animate={{ backgroundColor: '#fce7f3' }}
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 0.8,
          delay: delay,
          ease: 'easeInOut',
        }}
      >
        <button
          className="flex h-full w-full gap-2 rounded-xl px-2 py-1"
          type="button"
        >
          <div className="size-10 shrink-0 rounded-full bg-stone-300"></div>
          <div className="flex items-center">
            <h4 className="h-4 w-32 rounded-sm bg-stone-300 text-lg"></h4>
          </div>
        </button>
      </motion.li>
    );
  }

  return (
    <li key={userId}>
      <button
        className="flex h-full w-full gap-2 rounded-xl px-2 py-1 hover:bg-emerald-100"
        onClick={onClick}
        type="button"
      >
        <Avatar avatar={avatar} size={2.5} chatStyling={true} />
        <div className="flex items-center">
          <h4 className="text-lg font-medium">{username}</h4>
        </div>
        {selected && (
          <div className="ml-auto mr-2 flex items-center text-2xl">
            <img className="w-8" src={usagiIcon} alt="Selected" />
          </div>
        )}
      </button>
    </li>
  );
};

export { ChatsCreateListItem };
