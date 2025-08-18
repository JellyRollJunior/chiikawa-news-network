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
    <ModalDialog closeFunction={closeFunction}>
      <form className="flex flex-col" onSubmit={handleRenameChat}>
        <h2 className="mb-1 self-center text-lg font-bold">
          Rename Conversation
        </h2>
        <hr className="mb-4" />
        <LabelledInput
          id="New conversation name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={32}
          isRequired={false}
        />
        <footer className="mt-6">
          <button
            className="w-full rounded-md bg-blue-400 px-5 py-1.5 text-white hover:bg-blue-500 disabled:bg-gray-500 disabled:text-gray-100"
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
