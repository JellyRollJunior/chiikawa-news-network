import { useContext } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { useUser } from '../hooks/useUser.js';
import { Avatar } from './Avatar.jsx';
import { LoadingElement } from './LoadingElement.jsx';

const UserInfo = ({ userId }) => {
  const { id } = useContext(CurrentContext);
  const { user, isLoading } = useUser(userId);

  return !isLoading ? (
    <>
      <section className="yellow-block mx-2 mt-3 flex-0 px-2 pt-3 pb-2 md:mx-auto md:mt-6 md:w-md">
        <header className="ml-2 flex md:text-lg">
          <Avatar
            className="size-[80px] md:size-[90px]"
            avatar={user && user.avatar}
          />
          <div className="mt-2 flex w-full flex-col items-center justify-center">
            <h2 className="font-chiikawa xxs:max-w-55 xs:max-w-64 -mt-2 max-w-45 border-5 border-dashed border-pink-300 px-2 py-2 text-sm font-bold break-words md:text-base">
              {user && user.username}
            </h2>
          </div>
        </header>
        <div className="mt-3 grid w-full grid-cols-3 text-center text-sm md:text-base">
          <div>
            {user && user.followingCount ? user.followingCount : 0} Following
          </div>
          <div>{user && user.postCount ? user.postCount : 0} Posts</div>
          <div>
            {user && user.followersCount ? user.followersCount : 0} Followers
          </div>
        </div>
        {userId != id ? (
          <button className="blue-button mt-3 w-full px-7 py-0.5">
            Follow
          </button>
        ) : (
          <hr className="mt-3 w-full border-1 border-yellow-300" />
        )}
        <p className="mt-3 text-center">{user && user.bio}</p>
      </section>
    </>
  ) : (
    /* Loading Display */
    <section className="yellow-block px-2 pt-3 pb-2">
      <header className="ml-2 flex">
        <LoadingElement className="size-20 shrink-0 rounded-full" />
        <div className="mt-2 flex w-full flex-col items-center justify-center">
          <h2 className="xxs:max-w-55 xs:max-w-64 -mt-2 max-w-45 shrink self-center border-5 border-dashed border-pink-300 px-2 py-2">
            <LoadingElement className="h-6 w-32 rounded-full" />
          </h2>
        </div>
      </header>
      <div className="mt-3 flex w-full justify-around gap-3">
        <div className="flex items-center gap-2">
          <LoadingElement className="h-4 w-7 rounded-full" /> Posts
        </div>
        <div className="flex items-center gap-2">
          <LoadingElement className="h-4 w-7 rounded-full" /> Followers
        </div>
        <div className="flex items-center gap-2">
          <LoadingElement className="h-4 w-7 rounded-full" /> Following
        </div>
      </div>
      <button className="blue-button mt-3 w-full px-7 py-0.5" disabled={true}>
        Follow
      </button>
      <LoadingElement className="mt-3 h-12 w-full rounded-sm" />
    </section>
  );
};

export { UserInfo };
