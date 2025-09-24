import { useContext, useEffect, useState } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { useEditBio } from '../hooks/useEditBio.js';
import { LoadingElement } from './LoadingElement.jsx';

const SettingsEditBio = () => {
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
    }
  };

  return !isLoading ? (
    <>
      <section className="yellow-block mt-2 px-3 py-2">
        <form className="flex flex-col" onSubmit={handleEditBio}>
          <h3 className="mt-2 font-medium">Bio</h3>
          <textarea
            className="mt-2 min-h-26 w-full resize-none rounded-md border-3 border-pink-200 px-1 focus:outline-2 focus:outline-green-300"
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
            Confirm Edit
          </button>
        </form>
      </section>
    </>
  ) : (
    /* Loading Display */
    <>
      <section className="yellow-block mt-2 px-3 py-2">
        <form className="flex flex-col">
          <h3 className="mt-2 font-medium">Bio</h3>
          <LoadingElement className="mt-2 h-32 w-full rounded-sm" />
          <button
            className="blue-button mt-2 ml-auto px-3 py-1"
            disabled={true}
          >
            Confirm Edit
          </button>
        </form>
      </section>
    </>
  );
};

export { SettingsEditBio };
