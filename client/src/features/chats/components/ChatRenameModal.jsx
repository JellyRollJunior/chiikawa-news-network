import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ChatsContext } from '@/contexts/ChatsProvider.jsx';
import { ModalDialog } from '@/shared/components/ModalDialog.jsx';
import { useRenameChat } from '@/features/chats/hooks/useRenameChat.js';

const ChatRenameModal = ({ closeFunction, chatName, onSubmit }) => {
  const { chatId } = useParams();
  const { refetchChats } = useContext(ChatsContext);
  const { renameChat, isLoading } = useRenameChat(chatId);
  const [name, setName] = useState('');

  useEffect(() => {
    setName(chatName);
  }, [chatName]);

  const handleRenameChat = async (event) => {
    event.preventDefault();
    const chat = await renameChat(name);
    onSubmit(chat.name);
    refetchChats();
    closeFunction();
  };

  return (
    <ModalDialog closeFunction={closeFunction} title="Rename Conversation">
      <form className="flex flex-col" onSubmit={handleRenameChat}>
        <main className="pink-dotted-block mt-2 px-3 pt-2 pb-2.5">
          <label
            className="text-shadow-wrap ml-1 font-medium text-amber-800"
            htmlFor="chatName"
          >
            New conversation name
          </label>
          <input
            className="block-shadow mt-2 h-10 w-full rounded-lg bg-white pr-1 pl-1.5 text-amber-800"
            type="text"
            name="chatName"
            id="chatName"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={32}
            required={true}
          />
        </main>
        <footer className="mt-2 flex gap-2">
          <button
            type="button"
            className="pink-button px-6 py-1 text-lg font-bold"
            onClick={closeFunction}
          >
            Cancel
          </button>
          <button
            className="blue-button flex-1 px-6 py-1 text-lg font-bold"
            disabled={isLoading}
          >
            Rename
          </button>
        </footer>
      </form>
    </ModalDialog>
  );
};

export { ChatRenameModal };
