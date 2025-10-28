import { useContext } from 'react';
import arrowBack from '../assets/svgs/arrow-back.svg';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { ChatHeaderMenu } from './ChatHeaderMenu.jsx';
import { Link } from 'react-router';
import { Avatar } from './Avatar.jsx';

const getUsersString = (userId, users) => {
  if (!users) return null;
  const chatters =
    users.length == 1 ? [users[0]] : users.filter((user) => user.id != userId);
  return chatters.map((user) => user.username).join(', ');
};

const ChatHeader = ({
  chat,
  isPublicChat,
  openRenameModal,
  openDeleteModal,
}) => {
  const { id } = useContext(CurrentContext);

  const chatterNames = chat && getUsersString(id, chat.users);

  return (
    <header className="flex gap-1.5">
      <div className="pink-block pt-2 pl-3 md:hidden">
        <Link className="flex h-full items-center" to="/chats">
          <img className="w-[20px]" src={arrowBack} />
        </Link>
      </div>
      <div className="yellow-block grid flex-1 grid-cols-[60px_1fr] grid-rows-5 gap-x-2 rounded-lg px-2 py-2">
        <Avatar
          className="row-span-5 size-[60px] self-center border-3 border-dashed border-pink-300 p-0.5 md:size-[70px]"
          avatar={chat && chat.avatar}
        />
        <h2 className="row-span-3 self-end truncate font-medium lg:text-lg">
          {chat && chat.name}
        </h2>
        {chat && chat.name && (
          <p className="row-span-2 truncate text-sm">{chatterNames}</p>
        )}
      </div>
      {!isPublicChat && (
        <div className="pink-block flex items-center px-1 pt-3 md:px-2 md:pt-2">
          <ChatHeaderMenu
            users={chat && chat.users}
            openRenameModal={openRenameModal}
            openDeleteModal={openDeleteModal}
          />
        </div>
      )}
    </header>
  );
};

export { ChatHeader };
