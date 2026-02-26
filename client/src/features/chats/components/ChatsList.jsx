import { Fragment } from 'react';
import { Link, useParams } from 'react-router';
import { format } from 'date-fns';
import { Avatar } from '@/shared/components/Avatar.jsx';
import { LoadingElement } from '@/shared/components/LoadingElement.jsx';

import logo from '@/assets/nav/chiikawa-glasses.png';
import selected from '@/assets/svgs/arrow-forward.svg';

const ChatsListItemLoadingElement = ({ animationDelay = 0 }) => {
  return (
    <div className="flex gap-2 px-2 py-2">
      <LoadingElement
        className="ml-1 size-[60px] shrink-0 rounded-full bg-gray-300"
        delay={animationDelay}
      />
      <div className="flex w-full flex-col justify-center">
        <LoadingElement
          className="h-4 w-5/10 rounded-sm bg-gray-300"
          delay={animationDelay}
        />
        <LoadingElement
          className="mt-1 h-4 w-7/10 items-start justify-self-start rounded-sm bg-gray-300"
          delay={animationDelay}
        />
      </div>
    </div>
  );
};

const ChatsList = ({
  chats,
  isLoadingChats,
  hoverColor = 'duckegg-dark',
  isNoChatsPromptShown = false,
}) => {
  if (!chats) chats = [];

  const { chatId: browserChatId } = useParams();

  // format latestMessage & date
  for (const chat of chats) {
    if (!chat.latestMessage) {
      chat.latestMessage = { content: 'start the conversation' };
    }

    chat.formattedDate = chat.latestMessage
      ? format(new Date(chat.latestMessage.sendTime), 'MMM do • h:mmaaa')
      : '';
  }

  if (isLoadingChats) {
    return (
      <ul>
        {[...Array(4)].map((item, index) => (
          <Fragment key={index}>
            <ChatsListItemLoadingElement animationDelay={0} />
            <ChatsListItemLoadingElement animationDelay={0.8} />
          </Fragment>
        ))}
      </ul>
    );
  }

  return (
    <ul>
      {/* Chats */}
      {chats.map((chat) => (
        <li key={chat.id} className={`hover:bg-${hoverColor} px-2 py-2`}>
          <Link className="flex" to={`/chats/${chat.id}`}>
            {chat.id == browserChatId && <img src={selected} />}
            <Avatar
              className="size-[70px] border-3 border-dashed border-white p-0.5"
              avatar={chat.avatar}
              background="yellow-50"
            />
            <div className="-mt-0.5 ml-2 flex min-w-0 flex-col self-center leading-[1.2]">
              <h4 className="truncate text-lg font-medium" title={chat.name}>
                {chat.name}
              </h4>
              <p className="-mt-1 truncate">{chat.latestMessage.content}</p>
              <p className="text-sm">{chat.formattedDate}</p>
            </div>
          </Link>
        </li>
      ))}

      {/* No chats available message */}
      {chats && chats.length == 0 && isNoChatsPromptShown && (
        <li className="mx-3 mb-2 flex gap-2 py-2">
          <img className="w-[70px] shrink-0 self-center" src={logo} alt="" />
          <p className="flex-1 self-center text-center font-semibold">
            Create a conversation to begin chatting!
          </p>
        </li>
      )}
    </ul>
  );
};

export { ChatsList };
