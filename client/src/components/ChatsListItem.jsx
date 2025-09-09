import { format } from 'date-fns';
import { Link, useParams } from 'react-router';
import { Avatar } from './Avatar.jsx';
import { LoadingElement } from './LoadingElement.jsx';
import selected from '../assets/svgs/arrow-forward.svg';

const ChatsListItem = ({
  chatId,
  chatName,
  avatar,
  latestMessage,
  isLoading = false,
  loadingDelay = 0,
}) => {
  const { chatId: browserChatId } = useParams();

  const latestMessageContent = latestMessage
    ? latestMessage.content
    : 'start the conversation';
  const formattedDate = latestMessage
    ? format(new Date(latestMessage.sendTime), 'MMM do • h:mmaaa')
    : '';
  return !isLoading ? (
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
  ) : (
    /* Loading Display */
    <LoadingElement
      className="mx-1 flex gap-2 rounded-md px-2 py-2"
      delay={loadingDelay}
    >
      <div className="size-14 shrink-0 rounded-full bg-stone-300"></div>
      <div className="flex flex-col justify-center">
        <h4 className="h-4 w-18 rounded-sm bg-stone-300"></h4>
        <p className="mt-1 h-4 w-30 items-start justify-self-start rounded-sm bg-stone-300"></p>
      </div>
    </LoadingElement>
  );
};

export { ChatsListItem };
