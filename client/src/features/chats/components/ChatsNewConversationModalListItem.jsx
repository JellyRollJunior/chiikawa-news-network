import { Avatar } from '@/shared/components/Avatar.jsx';
import { LoadingElement } from '@/shared/components/LoadingElement.jsx';

import usagiIcon from '@/assets/icons/usagi-icon.png';

const ChatsNewConversationModalListItem = ({
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
        className="hover:yellow-gradient flex h-full w-full gap-2 px-2 pt-1.5 pb-1"
        onClick={onClick}
        type="button"
      >
        <Avatar
          className="size-[40px] border-1 border-yellow-500 md:size-[46px]"
          avatar={avatar}
          secondaryStyling={true}
          background="yellow-50"
        />
        <div className="flex items-center overflow-hidden">
          <h4 className="truncate text-lg font-medium" title={username}>
            {username}
          </h4>
        </div>
        {selected && (
          <div className="mr-2 ml-auto flex shrink-0 items-center text-2xl">
            <img className="w-8" src={usagiIcon} alt="Selected" />
          </div>
        )}
      </button>
    </li>
  ) : (
    /* Loading Display */
    <LoadingElement
      className="flex gap-2 rounded-sm px-2 pt-1.5 pb-1"
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

export { ChatsNewConversationModalListItem };
