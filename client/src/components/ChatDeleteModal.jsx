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
    navigate('/');
  };

  return (
    <ModalDialog closeFunction={closeFunction}>
      <form className="flex flex-col" onSubmit={handleDeleteChat}>
        <h2 className="mb-1 self-center text-lg font-bold">
          Delete Conversation
        </h2>
        <hr />
        <img className="mt-6 w-12 self-center" src={warning} />
        <h2 className="text-center">
          All messages will be deleted <strong>forever</strong>.
          <br />
          <strong>This cannot be undone</strong>.
          <br />
          Are you sure?
        </h2>
        <footer className="mt-6 flex gap-5">
          <button
            className="flex-1 rounded-md bg-blue-400 px-5 py-1.5 text-white hover:bg-blue-500 disabled:bg-gray-500 disabled:text-gray-100"
            type="button"
            onClick={closeFunction}
          >
            Cancel
          </button>
          <button
            className="rounded-md bg-red-400 px-5 py-1.5 text-white hover:bg-blue-500 disabled:bg-gray-500 disabled:text-gray-100"
            disabled={isLoading}
          >
            Delete
          </button>
        </footer>
      </form>
    </ModalDialog>
  );
};

export { ChatDeleteModal };
