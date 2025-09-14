import { useUser } from '../hooks/useUser.js';
import { Avatar } from './Avatar.jsx';
import { LoadingElement } from './LoadingElement.jsx';

const UserInfo = ({ userId }) => {
  const { user, isLoading } = useUser(userId);

  return !isLoading ? (
    <>
      <section className="yellow-block mx-2 mt-3 max-w-md flex-0 px-2 pt-3 pb-2 md:mx-auto md:mt-6">
        <header className="ml-2 flex">
          <Avatar avatar={user && user.avatar} size={5} />
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
            {user && user.followerCount ? user.followerCount : 0} Followers
          </div>
        </div>
        <button className="blue-button mt-3 w-full px-7 py-0.5">Follow</button>
        <p className="mt-3 text-center md:text-lg">{user && user.bio}</p>
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
      <div className="mt-3 flex w-full justify-around gap-3 text-sm">
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
      <LoadingElement className="mt-3 h-12 w-full rounded-sm text-xl font-bold" />
    </section>
  );
};

export { UserInfo };
