import { useNavigate } from 'react-router';
import { DotsMenu } from './DotsMenu.jsx';
import { DotsMenuItem } from './DotsMenuItem.jsx';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { useContext } from 'react';

const ChatHeaderMenu = ({ users = [], openRenameModal, openDeleteModal }) => {
  const navigate = useNavigate();
  const { id } = useContext(CurrentContext);
  const isTwoPersonChat = users && users.length == 2;

  return (
    <DotsMenu>
      {isTwoPersonChat && (
        <DotsMenuItem
          label="View profile"
          onClick={() =>
            navigate(`/users/${users.find((user) => user.id != id).id}`)
          }
        />
      )}
      <DotsMenuItem label="Rename conversation" onClick={openRenameModal} />
      <DotsMenuItem label="Delete converstation" onClick={openDeleteModal} />
    </DotsMenu>
  );
};

export { ChatHeaderMenu };
