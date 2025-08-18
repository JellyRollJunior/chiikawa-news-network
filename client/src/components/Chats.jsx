import { useContext, useState, Fragment } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { ChatsContext } from '../contexts/ChatsProvider.jsx';
import { ChatsListItem } from './ChatsListItem.jsx';
import { ChatsLoading } from './ChatsLoading.jsx';
import { ChatsPublic } from './ChatsPublic.jsx';
import { ChatsSectionTitle } from './ChatsSectionTitle.jsx';
import newChatIcon from '../assets/svgs/edit-square.svg';

const Chats = ({ chats, isLoading, openNewChatModal }) => {
  const { username } = useContext(CurrentContext);
  const { refetchChats } = useContext(ChatsContext);
  const [filter, setFilter] = useState('');

  // search filter
  const normalizedFilter = filter.trim().toLowerCase();
  const filteredChats = chats
    ? chats.filter((chat) => chat.name.toLowerCase().includes(normalizedFilter))
    : [];

  return (
    <div className="flex h-full flex-col pt-9">
      <header className="flex justify-between pl-5 pr-7">
        <h2 className="text-3xl font-bold">{username}</h2>
        <button className="mt-auto" onClick={openNewChatModal}>
          <img className="w-7" src={newChatIcon} alt="Create new chat button" />
        </button>
      </header>
      <div className="px-3">
        <input
          className="mt-3 h-11 w-full rounded-lg bg-gray-200 pl-3"
          type="text"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          placeholder="Search"
        />
      </div>
      <section className='mt-5'>
        <ChatsPublic />
      </section>
      <section className='mt-2'>
        <ChatsSectionTitle title="Conversations" refreshOnClick={refetchChats} />
      </section>
      <main className="scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full mt-1 flex-1 overflow-y-scroll">
        <ul>
          {isLoading ? (
            <ChatsLoading />
          ) : (
            filteredChats.map((chat) => (
              <Fragment key={chat.id}>
                <ChatsListItem
                  chatId={chat.id}
                  chatName={chat.name}
                  avatar={chat.avatar}
                  latestMessage={chat.latestMessage}
                />
              </Fragment>
            ))
          )}
        </ul>
      </main>
    </div>
  );
};

export { Chats };
