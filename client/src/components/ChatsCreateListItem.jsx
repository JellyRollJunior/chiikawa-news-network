import { Avatar } from './Avatar.jsx';
import usagiIcon from '../assets/icons/usagi-icon.png';

const ChatsCreateListItem = ({
  userId,
  avatar,
  username,
  onClick,
  selected = false,
}) => {
  return (
    <li key={userId}>
      <button
        className="flex h-full w-full gap-2 rounded-xl px-2 py-1 hover:bg-emerald-100"
        onClick={onClick}
        type="button"
      >
        <Avatar avatar={avatar} size={2.5} chatStyling={true} />
        <div className="flex items-center">
          <h4 className="text-lg font-medium">{username}</h4>
        </div>
        {selected && (
          <div className="ml-auto mr-2 flex items-center text-2xl">
            <img className="w-8" src={usagiIcon} alt="Selected" />
          </div>
        )}
      </button>
    </li>
  );
};

export { ChatsCreateListItem };
