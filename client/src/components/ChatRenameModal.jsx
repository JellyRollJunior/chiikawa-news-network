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
        <main className="mb-2 mt-4 px-2">
          <LabelledInput
            id="New conversation name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={32}
            isRequired={false}
          />
        </main>
        <footer className="mt-2 flex gap-3">
          <button
            type="button"
            className="pink-button px-6 py-1 text-lg font-bold"
            onClick={closeFunction}
          >
            Cancel
          </button>
          <button
            className="yellow-button flex-1 px-6 py-1 text-lg font-bold"
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
