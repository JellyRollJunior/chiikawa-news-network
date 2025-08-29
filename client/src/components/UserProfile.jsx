import { useUser } from '../hooks/useUser.js';
import { Avatar } from './Avatar.jsx';
import { LoadingElement } from './LoadingElement.jsx';

const UserProfile = ({ userId }) => {
  const { user, isLoading } = useUser(userId);

  return !isLoading ? (
    <section className="yellow-block px-2 pb-2 pt-3">
      <header className="ml-2 flex">
        <Avatar avatar={user && user.avatar} size={5} />
        <div className="mt-2 flex w-full flex-col items-center justify-center">
          <h2 className="font-chiikawa border-5 max-w-45 xxs:max-w-55 xs:max-w-64 -mt-2 break-words border-dashed border-pink-300 px-2 py-2 text-sm font-bold">
            {user && user.username}
          </h2>
        </div>
      </header>
      <div className="mt-3 flex w-full justify-around gap-3 text-sm">
        <div>100 Posts</div>
        <div>100 Followers</div>
        <div>100 Following</div>
      </div>
      <button className="blue-button mt-3 w-full px-7 py-0.5">Follow</button>
      <p className="mt-3 text-center">{user && user.bio}</p>
    </section>
  ) : (
    /* Loading Display */
    <section className="yellow-block px-2 pb-2 pt-3">
      <header className="ml-2 flex">
        <LoadingElement className="size-20 shrink-0 rounded-full" />
        <div className="mt-2 flex w-full flex-col items-center justify-center">
          <h2 className="border-5 max-w-45 xxs:max-w-55 xs:max-w-64 -mt-2 shrink self-center border-dashed border-pink-300 px-2 py-2">
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

export { UserProfile };
