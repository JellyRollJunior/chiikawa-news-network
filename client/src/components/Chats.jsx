import { useContext, useState, Fragment } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { ChatsContext } from '../contexts/ChatsProvider.jsx';
import { ChatsListItem } from './ChatsListItem.jsx';
import { ChatsLoading } from './ChatsLoading.jsx';
import { ChatsPublic } from './ChatsPublic.jsx';
import { ChatsSectionTitle } from './ChatsSectionTitle.jsx';
import kurimanju from '../assets/icons/kurimanju-icon.png';

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
    <div className="main-container relative mx-4 mb-2 mt-3 flex flex-1 flex-col">
      <img className="w-13 absolute -right-6 -top-5" src={kurimanju} />
      <header className="yellow-block mx-2 mt-3 flex items-end justify-between pl-5 pr-2">
        <h2 className="text-shadow-wrap mb-1 mt-2 text-3xl font-bold">
          {username}
        </h2>
        <button
          className="pink-button self-center px-6 py-1"
          onClick={openNewChatModal}
        >
          Create Chat
        </button>
      </header>
      <input
        className="block-shadow mx-2 mt-3 h-9 rounded-lg bg-white pl-3"
        type="text"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
        placeholder="Search"
      />
      <section className="yellow-block mx-2 mt-3 pb-1 pt-2 sm:pb-2 md:pb-1">
        <ChatsPublic />
      </section>
      <section className="yellow-block mx-2 mb-3 mt-3 flex flex-1 flex-col overflow-y-hidden pb-1 pt-2 md:pb-2">
        <ChatsSectionTitle title="Chat rooms" refreshOnClick={refetchChats} />
        <main className="scrollbar-thin mt-2 flex-1 overflow-y-scroll">
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
      </section>
    </div>
  );
};

export { Chats };
