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
    <div className="main-container mx-4 mb-2 mt-3 flex flex-1 flex-col">
      <header className="yellow-block mx-2 mt-3 flex justify-between pb-1 pl-5 pr-7 pt-2">
        <h2 className="text-shadow-wrap text-3xl font-bold">{username}</h2>
        <button className="self-end pb-1" onClick={openNewChatModal}>
          <img className="w-7" src={newChatIcon} alt="Create new chat button" />
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
        <ChatsSectionTitle
          title="Conversations"
          refreshOnClick={refetchChats}
        />
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
