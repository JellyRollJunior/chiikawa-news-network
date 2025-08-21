import { format } from 'date-fns';
import { Link, useParams } from 'react-router';
import { Avatar } from './Avatar.jsx';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const ChatsListItem = ({
  chatId,
  chatName,
  avatar,
  latestMessage,
  isLoading = false,
  delay = 0,
}) => {
  const { chatId: browserChatId } = useParams();

  if (isLoading) {
    return (
      <motion.li
        style={{ backgroundColor: '#fff7ed' }}
        className="mx-1 flex gap-2 rounded-md px-2 py-2"
        animate={{ backgroundColor: '#dbeafe' }}
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
  }

  const latestMessageContent = latestMessage
    ? latestMessage.content
    : 'start the conversation';
  const formattedDate = latestMessage
    ? format(new Date(latestMessage.sendTime), 'MMM do • h:mmaaa')
    : '';
  return (
    <li
      className={`mx-3 rounded-md px-2 py-2 hover:bg-blue-100 md:mx-1 ${chatId == browserChatId ? 'bg-blue-100' : 'inherit'}`}
    >
      <Link className="flex gap-2" to={`/chats/${chatId}`}>
        <Avatar avatar={avatar} />
        <div className="-mt-0.5 flex min-w-0 flex-col self-center leading-[1.2]">
          <h4 className="truncate text-lg font-medium">{chatName}</h4>
          <p className="-mt-1 truncate">{latestMessageContent}</p>
          <p className="text-sm">{formattedDate}</p>
        </div>
      </Link>
    </li>
  );
};

export { ChatsListItem };
