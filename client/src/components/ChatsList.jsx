import { Fragment } from 'react';
import { ChatsListItem } from './ChatsListItem.jsx';
import logo from '../assets/nav/chiikawa-glasses.png';

const ChatsList = ({
  chats,
  isLoading,
  loadingElements = 4,
  hoverColor = 'duckegg-dark',
  isNoChatsPromptShown = false,
}) => {
  if (!chats) chats = [];
  return (
    <ul>
      {!isLoading
        ? chats.map((chat) => (
            <Fragment key={chat.id}>
              <ChatsListItem
                className={`hover:bg-${hoverColor}`}
                chatId={chat.id}
                chatName={chat.name}
                avatar={chat.avatar}
                latestMessage={chat.latestMessage}
              />
            </Fragment>
          ))
        : /* Loading Display */
          [...Array(loadingElements)].map((item, index) => (
            <Fragment key={index}>
              <ChatsListItem isLoading={true} />
              {loadingElements > 1 && (
                <ChatsListItem isLoading={true} loadingDelay={0.8} />
              )}
            </Fragment>
          ))}
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
