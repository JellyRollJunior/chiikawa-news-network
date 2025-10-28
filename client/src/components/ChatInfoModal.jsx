import { Avatar } from './Avatar.jsx';
import { ModalDialog } from './ModalDialog.jsx';

const ChatInfoModal = ({ closeFunction, chat }) => {
  if (!chat || !chat.users || !chat.name) return;
  return (
    <ModalDialog title="Conversation Info" closeFunction={closeFunction}>
      <div className="mt-2 flex flex-col gap-2">
        <div className="duckegg-block h-4 shrink-0" />
        <div className="pink-dotted-block px-3 pt-2 pb-2.5">
          <div className="text-shadow-wrap ml-1 font-medium text-amber-800">
            Name
          </div>
          <h2 className="mt-2 px-3 text-center font-bold">{chat.name}</h2>
        </div>
        <div className="pink-dotted-block px-3 pt-2 pb-2.5">
          <div className="text-shadow-wrap ml-1 font-medium text-amber-800">
            Users
          </div>
          <ul className="mt-2 flex flex-col gap-2 px-3">
            {chat.users.map((user) => (
              <li className="flex gap-2">
                <Avatar
                  className="size-[56px] border-1 border-yellow-500"
                  avatar={user.avatar}
                />
                <h3 className="self-center font-medium">{user.username}</h3>
              </li>
            ))}
          </ul>
        </div>
        <div className="duckegg-block h-4 shrink-0" />
        <footer className="flex">
          <button
            type="button"
            className="pink-button flex-1 px-6 py-1 text-lg font-bold"
            onClick={closeFunction}
          >
            Close
          </button>
        </footer>
      </div>
    </ModalDialog>
  );
};

export { ChatInfoModal };
