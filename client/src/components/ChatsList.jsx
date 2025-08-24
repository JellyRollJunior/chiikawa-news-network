import { Fragment } from 'react';
import { ChatsLoading } from './ChatsLoading.jsx';
import { ChatsListItem } from './ChatsListItem.jsx';

const ChatsList = ({ chats, isLoading, loadingElements = 4 }) => {
  if (!chats) chats = [];
  return (
    <ul>
      {isLoading && <ChatsLoading items={loadingElements} />}
      {!isLoading &&
        chats.map((chat) => (
          <Fragment key={chat.id}>
            <ChatsListItem
              chatId={chat.id}
              chatName={chat.name}
              avatar={chat.avatar}
              latestMessage={chat.latestMessage}
            />
          </Fragment>
        ))}
    </ul>
  );
};

export { ChatsList };
