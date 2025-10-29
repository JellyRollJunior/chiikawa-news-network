import { useContext } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { Link, useNavigate } from 'react-router';
import { Avatar } from './Avatar.jsx';
import { DotsMenu } from './DotsMenu.jsx';
import { DotsMenuItem } from './DotsMenuItem.jsx';
import arrowBack from '../assets/svgs/arrow-back.svg';

const getUsersString = (userId, users) => {
  if (!users) return null;
  const chatters =
    users.length == 1 ? [users[0]] : users.filter((user) => user.id != userId);
  return chatters.map((user) => user.username).join(', ');
};

const ChatHeader = ({
  chat,
  isPublicChat,
  openInfoModal,
  openRenameModal,
  openDeleteModal,
}) => {
  const navigate = useNavigate();
  const { id } = useContext(CurrentContext);
  const chatterNames = chat && getUsersString(id, chat.users);
  const users = chat && chat.users;
  const isTwoPersonChat = users && chat.users.length == 2;

  if (!chat) return;
  return (
    <header className="flex gap-1.5">
      {/* Mobile: Back button */}
      <div className="pink-block pt-2 pl-3 shrink-0 md:hidden">
        <Link className="flex h-full items-center" to="/chats">
          <img className="w-[20px]" src={arrowBack} />
        </Link>
      </div>
      <div className="yellow-block grid flex-1 grid-cols-[60px_1fr] md:grid-cols-[70px_1fr] grid-rows-5 gap-x-2 rounded-lg px-2 py-2">
        <Avatar
          className="row-span-5 size-[60px] self-center border-3 border-dashed border-pink-300 p-0.5 md:size-[70px]"
          avatar={chat && chat.avatar}
        />
        {chat && chatterNames && (
          <>
            <h2 className="relative row-span-3 self-end truncate font-medium lg:text-lg" title={chat.name}>
              {chat.name}
            </h2>
            <p className="relative row-span-2 truncate text-sm" title={chatterNames}>
              {chatterNames}
            </p>
          </>
        )}
      </div>
      {/* Header menu */}
      {!isPublicChat && (
        <div className="pink-block flex shrink-0 items-center px-1 pt-3 md:px-2 md:pt-2">
          <DotsMenu>
            {isTwoPersonChat && <DotsMenuItem label="View profile" onClick={() => navigate(`/users/${users.find((user) => user.id != id).id}`)} />}
            <DotsMenuItem label="Conversation info" onClick={openInfoModal} />
            <DotsMenuItem label="Rename conversation" onClick={openRenameModal} />
            <DotsMenuItem label="Delete converstation" onClick={openDeleteModal} />
          </DotsMenu>
        </div>
      )}
    </header>
  );
};

export { ChatHeader };
