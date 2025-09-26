import { Chats } from '../components/Chats.jsx';
import { Notice } from '../components/Notice.jsx';
import masks from '../assets/images/trio-masks.png';

const ChatsPage = () => {
  return (
    <div className="flex h-full">
      <aside className="flex flex-3 md:max-w-md">
        <Chats />
      </aside>
      <div className="mr-4 hidden flex-4 items-center justify-center md:flex">
        <Notice
          title="Your Messages"
          src={masks}
          alt="Hachiware, Usagi, and Chiikawa playing with japanese masks"
          footer={
            <>
              <strong>Select</strong> or <strong>Create</strong> a chat to begin
              sending messages!
            </>
          }
        />
      </div>
    </div>
  );
};

export { ChatsPage };
