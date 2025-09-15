import { Avatar } from './Avatar.jsx';
import { LoadingElement } from './LoadingElement.jsx';
import usagiIcon from '../assets/icons/usagi-icon.png';

const ChatsCreateListItem = ({
  userId,
  avatar,
  username,
  onClick,
  selected = false,
  isLoading = false,
  loadingDelay = 0,
}) => {
  return !isLoading ? (
    <li key={userId}>
      <button
        className="flex h-full w-full gap-2 rounded-xl px-2 py-1 hover:bg-emerald-100"
        onClick={onClick}
        type="button"
      >
        <Avatar
          className="size-[40px] md:size-[46px]"
          avatar={avatar}
          secondaryStyling={true}
        />
        <div className="flex items-center">
          <h4 className="text-lg font-medium">{username}</h4>
        </div>
        {selected && (
          <div className="mr-2 ml-auto flex items-center text-2xl">
            <img className="w-8" src={usagiIcon} alt="Selected" />
          </div>
        )}
      </button>
    </li>
  ) : (
    /* Loading Display */
    <LoadingElement
      className="flex gap-2 rounded-sm px-4 py-2"
      initialColor="#fef9c3"
      transitionColor="#fce7f3"
      delay={loadingDelay}
    >
      <button
        className="flex h-full w-full gap-2 rounded-xl px-2 py-1"
        type="button"
      >
        <div className="size-10 shrink-0 rounded-full bg-gray-300"></div>
        <div className="flex items-center">
          <h4 className="h-4 w-32 rounded-sm bg-gray-300 text-lg"></h4>
        </div>
      </button>
    </LoadingElement>
  );
};

export { ChatsCreateListItem };
