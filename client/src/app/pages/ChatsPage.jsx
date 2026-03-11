import { Chats } from '@/features/chats/components/Chats/';
import { Notice } from '@/shared/components/Notice.jsx';

import masks from '@/assets/images/trio-masks.png';
import chiiLaying from '@/assets/images/chiikawa-laying.png';

const ChatsPage = () => {
  return (
    <div className="flex h-full">
      <main className="flex-3 px-4 pt-3 pb-2 md:max-w-md">
        <div className="main-container h-full w-full">
          <Chats />
        </div>
      </main>
      <aside className="mr-4 hidden flex-2 items-center justify-center md:flex">
        <Notice
          className="relative max-w-lg"
          title="Your Messages"
          footer={
            <p className="text-shadow-wrap px-2 text-center text-lg font-medium">
              <strong>Select</strong> or <strong>Create</strong> a chat to begin
              sending messages!
            </p>
          }
        >
          <div className="pink-block">
            <img
              className="drop-shadow-pink-outline m-auto"
              src={masks}
              alt="Hachiware, Usagi, and Chiikawa playing with japanese masks"
            />
          </div>
          <img
            className="drop-shadow-pink-outline absolute -right-[10px] -bottom-[38px] w-[100px]"
            src={chiiLaying}
          />
        </Notice>
      </aside>
    </div>
  );
};

export { ChatsPage };
