import { Fragment } from 'react';
import { usePublicChats } from '../hooks/usePublicChats.js';
import { ChatsSectionTitle } from './ChatsSectionTitle.jsx';
import { ChatsLoading } from './ChatsLoading.jsx';
import { ChatsListItem } from './ChatsListItem.jsx';

const ChatsPublic = () => {
  const { publicChats, isLoading, refetch } = usePublicChats();
  return (
    <>
      <ChatsSectionTitle title="Public rooms" refreshOnClick={refetch} />
      <ul>
        {isLoading && <ChatsLoading items={1} />}
        {!isLoading &&
          publicChats.map((chat) => (
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
    </>
  );
};

export { ChatsPublic };
