import { useContext, useEffect, useState } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { useEditBio } from '../hooks/useEditBio.js';
import { LoadingElement } from './LoadingElement.jsx';
import { ToastContext } from '../contexts/ToastProvider.jsx';

const SettingsEditBio = () => {
  const { toastTemp } = useContext(ToastContext);
  const { bio, setBio, isLoading } = useContext(CurrentContext);
  const { editBio, isLoading: isEditingBio } = useEditBio();
  const [bioTextarea, setBioTextarea] = useState('');

  useEffect(() => {
    setBioTextarea(bio ? bio : '');
  }, [bio]);

  const handleEditBio = async (event) => {
    event.preventDefault();
    const data = await editBio(bioTextarea);
    if (data && data.bio) {
      setBio(data.bio);
      toastTemp('Bio edited successfully');
    }
  };

  return !isLoading ? (
    <div className="duckegg-block px-3 py-3">
      <form className="flex flex-col" onSubmit={handleEditBio}>
        <h3 className="text-shadow-wrap text-lg font-bold">Edit Bio</h3>
        <textarea
          className="mx-1 mt-2 min-h-26 resize-none rounded-lg border-2 border-pink-200 bg-white py-1 pl-2 disabled:bg-gray-200"
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
          className="blue-button mt-2 ml-auto px-3 py-1"
          disabled={isEditingBio}
        >
          {isEditingBio ? 'Editing...' : 'Confirm Edit'}
        </button>
      </form>
    </div>
  ) : (
    /* Loading Display */
    <>
      <div className="duckegg-block px-3 py-3">
        <div className="flex flex-col">
          <h3 className="text-shadow-wrap text-lg font-bold">Edit Bio</h3>
          <LoadingElement className="mx-1 mt-2 h-26 rounded-sm" />
          <button
            className="blue-button mt-2 ml-auto px-3 py-1"
            disabled={true}
          >
            Confirm Edit
          </button>
        </div>
      </div>
    </>
  );
};

export { SettingsEditBio };
