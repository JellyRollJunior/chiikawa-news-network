import { Chats } from '../components/Chats.jsx';
import { Notice } from '@/shared/components/Notice.jsx';
import masks from '../assets/images/trio-masks.png';
import chiiLaying from '../assets/images/chiikawa-laying.png';

const ChatsPage = () => {
  return (
    <div className="flex h-full">
      <aside className="flex flex-3 md:max-w-md">
        <Chats />
      </aside>
      <div className="mr-4 hidden flex-2 items-center justify-center md:flex">
        <Notice
          className="relative max-w-lg"
          title="Your Messages"
          footer={
            <p className="px-2 text-lg font-medium text-center text-shadow-wrap">
              <strong>Select</strong> or <strong>Create</strong> a chat to begin
              sending messages!
            </p>
          }
        >
          <div className="pink-block">
            <img className="drop-shadow-pink-outline m-auto" src={masks} alt="Hachiware, Usagi, and Chiikawa playing with japanese masks" />
          </div>
          <img className="drop-shadow-pink-outline absolute -right-[10px] -bottom-[38px] w-[100px]" src={chiiLaying} />
        </Notice>
      </div>
    </div>
  );
};

export { ChatsPage };
