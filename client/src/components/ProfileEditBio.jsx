import { useContext, useState } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { useEditBio } from '../hooks/useEditBio.js';

const ProfileEditBio = ({ onSubmit }) => {
  const { editBio, isLoading } = useEditBio();
  const { id, bio, setBio } = useContext(CurrentContext);
  const [bioTextarea, setBioTextarea] = useState(bio);

  const handleEditBio = async (event) => {
    event.preventDefault();
    const data = await editBio(id, bioTextarea);
    if (data && data.bio) {
      setBio(data.bio);
    }
    onSubmit();
  };

  return (
    <form onSubmit={handleEditBio}>
      <textarea
        className="border-3 mt-3 min-h-36 w-full rounded-lg border-gray-500 px-1"
        autoFocus
        name="bio"
        id="bio"
        value={bioTextarea}
        onChange={(event) => setBioTextarea(event.target.value)}
        minLength={1}
        maxLength={350}
        required
      />
      <button
        className="w-full rounded-md bg-blue-400 px-5 py-1.5 text-white hover:bg-blue-500 disabled:bg-gray-500 disabled:text-gray-100"
        disabled={isLoading}
      >
        Edit
      </button>
    </form>
  );
};

export { ProfileEditBio };
