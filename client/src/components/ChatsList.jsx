import { Fragment } from 'react';
import { ChatsListItem } from './ChatsListItem.jsx';

const ChatsList = ({ chats, isLoading, loadingElements = 4 }) => {
  if (!chats) chats = [];
  return (
    <ul>
      {!isLoading
        ? chats.map((chat) => (
            <Fragment key={chat.id}>
              <ChatsListItem
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
              {loadingElements > 1 && <ChatsListItem isLoading={true} loadingDelay={0.8} />}
            </Fragment>
          ))}
    </ul>
  );
};

export { ChatsList };
