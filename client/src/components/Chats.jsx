import { useContext, useState, Fragment } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { ChatsContext } from '../contexts/ChatsProvider.jsx';
import { ChatsListItem } from './ChatsListItem.jsx';
import { ChatsLoading } from './ChatsLoading.jsx';
import { ChatsPublic } from './ChatsPublic.jsx';
import { ChatsSectionTitle } from './ChatsSectionTitle.jsx';
import chiiPeace from '../assets/images/chii-peace.png';
import hachiCamera from '../assets/images/hachi-camera-back.png';

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
      <header className="yellow-block mx-2 mt-3 flex items-end justify-between pl-5 pr-2">
        <h2 className="text-shadow-wrap mb-1 mt-2 text-3xl font-bold">
          {username}
        </h2>
      </header>
      <input
        className="block-shadow mx-2 mt-3 h-9 rounded-lg bg-white pl-3"
        type="text"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
        placeholder="Search"
      />
      <div className="relative mt-3 flex w-full justify-center">
        <button
          className="blue-button relative px-6 py-1 font-medium"
          onClick={openNewChatModal}
        >
          New Conversation
          <img className="w-13 absolute -left-12 top-0" src={hachiCamera} />
          <img className="w-13 absolute -right-12 bottom-1" src={chiiPeace} />
        </button>
      </div>
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
