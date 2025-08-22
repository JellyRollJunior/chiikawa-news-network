import { useContext, useEffect, useState } from 'react';
import { ModalDialog } from './ModalDialog.jsx';
import { LabelledInput } from './LabelledInput.jsx';
import { useRenameChat } from '../hooks/useRenameChat.js';
import { useParams } from 'react-router';
import { ChatsContext } from '../contexts/ChatsProvider.jsx';

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
        <main className="mt-4 mb-2 px-2 ">
          <LabelledInput
            id="New conversation name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={32}
            isRequired={false}
          />
        </main>
        <footer className="mt-2">
          {/* hover and disabled styling */}
          <button
            className="blue-block text-shadow-wrap w-full rounded-md px-5 py-1.5 text-lg font-bold hover:blue-block-hover disabled:bg-gray-500 disabled:text-gray-100"
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
