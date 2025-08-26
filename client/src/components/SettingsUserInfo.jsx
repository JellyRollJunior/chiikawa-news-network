import { useContext, useEffect, useState } from 'react';
import { Avatar } from './Avatar.jsx';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { useEditBio } from '../hooks/useEditBio.js';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const LoadingElement = () => {
  return (
    <>
      <section className="yellow-block mt-2 flex items-center px-3 py-2">
        <motion.div
          className="size-12 rounded-full"
          style={{ backgroundColor: '#fff7ed' }}
          animate={{ backgroundColor: '#ccfbf1' }}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 0.8,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="ml-3 h-5 w-16 rounded-full"
          style={{ backgroundColor: '#fff7ed' }}
          animate={{ backgroundColor: '#ccfbf1' }}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 0.8,
            ease: 'easeInOut',
          }}
        />
        <button className="blue-button ml-auto px-3 py-1" disabled={true}>
          Change Photo
        </button>
      </section>
      <section className="yellow-block mt-2 px-3 py-2">
        <form className="flex flex-col">
          <h3 className="mt-2 font-medium">Bio</h3>
          <motion.p
            className="mt-2 h-32 w-full rounded-sm text-xl font-bold"
            style={{ backgroundColor: '#fff7ed' }}
            animate={{ backgroundColor: '#ccfbf1' }}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 0.8,
              ease: 'easeInOut',
            }}
          />
          <button
            className="blue-button ml-auto mt-2 px-3 py-1"
            disabled={true}
          >
            Confirm Edit
          </button>
        </form>
      </section>
    </>
  );
};

const SettingsUserInfo = () => {
  const { editBio, isLoading: isEditingBio } = useEditBio();
  const { id, bio, setBio, username, avatar, isLoading } =
    useContext(CurrentContext);
  const [bioTextarea, setBioTextarea] = useState('');

  useEffect(() => {
    setBioTextarea(bio ? bio : '');
  }, [bio]);

  const handleEditBio = async (event) => {
    event.preventDefault();
    const data = await editBio(id, bioTextarea);
    if (data && data.bio) {
      setBio(data.bio);
    }
  };

  return (
    <>
      <header className="yellow-block">
        <h2 className="font-chiikawa py-2 text-center text-lg">Edit Profile</h2>
      </header>
      {isLoading ? (
        <LoadingElement />
      ) : (
        <>
          <section className="yellow-block mt-2 flex items-center px-3 py-2">
            <Avatar avatar={avatar ? avatar : null} size={3} />
            <h3 className="ml-3">{username}</h3>
            <button className="blue-button ml-auto px-3 py-1">
              Change Photo
            </button>
          </section>
          <section className="yellow-block mt-2 px-3 py-2">
            <form className="flex flex-col" onSubmit={handleEditBio}>
              <h3 className="mt-2 font-medium">Bio</h3>
              <textarea
                className="border-3 mt-2 min-h-32 w-full rounded-md border-pink-200 px-1 focus:outline-2 focus:outline-green-300"
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
                className="blue-button ml-auto mt-2 px-3 py-1"
                disabled={isEditingBio}
              >
                Confirm Edit
              </button>
            </form>
          </section>
        </>
      )}
    </>
  );
};

export { SettingsUserInfo };
