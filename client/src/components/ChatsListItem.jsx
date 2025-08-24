import { format } from 'date-fns';
import { Link, useParams } from 'react-router';
import { Avatar } from './Avatar.jsx';
import selected from '../assets/svgs/arrow-forward.svg';

const ChatsListItem = ({ chatId, chatName, avatar, latestMessage }) => {
  const { chatId: browserChatId } = useParams();

  const latestMessageContent = latestMessage
    ? latestMessage.content
    : 'start the conversation';
  const formattedDate = latestMessage
    ? format(new Date(latestMessage.sendTime), 'MMM do • h:mmaaa')
    : '';
  return (
    <li className="mx-3 rounded-xl px-2 py-2 hover:bg-emerald-100 md:mx-1">
      <Link className="flex" to={`/chats/${chatId}`}>
        {chatId == browserChatId && <img src={selected} />}
        <Avatar avatar={avatar} />
        <div className="-mt-0.5 ml-2 flex min-w-0 flex-col self-center leading-[1.2]">
          <h4 className="truncate text-lg font-medium">{chatName}</h4>
          <p className="-mt-1 truncate">{latestMessageContent}</p>
          <p className="text-sm">{formattedDate}</p>
        </div>
      </Link>
    </li>
  );
};

export { ChatsListItem };
