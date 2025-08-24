import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { ChatsContext } from '../contexts/ChatsProvider.jsx';
import { useDeleteChat } from '../hooks/useDeleteChat.js';
import { ModalDialog } from './ModalDialog.jsx';
import warning from '../assets/svgs/warning.svg';

const ChatDeleteModal = ({ closeFunction, chatId }) => {
  const navigate = useNavigate();
  const { refetchChats } = useContext(ChatsContext);
  const { deleteChat, isLoading } = useDeleteChat();

  const handleDeleteChat = async (event) => {
    event.preventDefault();
    await deleteChat(chatId);
    closeFunction();
    refetchChats();
    navigate('/chats');
  };

  return (
    <ModalDialog closeFunction={closeFunction} title="Delete Conversation">
      <form className="flex flex-col" onSubmit={handleDeleteChat}>
        <img className="mt-6 w-12 self-center" src={warning} />
        <h2 className="text-center">
          All messages will be deleted <strong>forever</strong>.
          <br />
          <strong>This cannot be undone</strong>.
          <br />
          Are you sure?
        </h2>
        <footer className="mt-6 flex gap-3">
          <button className="yellow-button px-5 py-1.5" disabled={isLoading}>
            Delete
          </button>
          <button
            className="pink-button flex-1 px-5 py-1.5"
            type="button"
            onClick={closeFunction}
          >
            Cancel
          </button>
        </footer>
      </form>
    </ModalDialog>
  );
};

export { ChatDeleteModal };
