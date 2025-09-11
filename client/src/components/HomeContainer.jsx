import { useState } from 'react';
import { Home } from './Home.jsx';
import { PostCreateModal } from './PostsCreateModal.jsx';

const HomeContainer = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const openCreatePostModal = () => setIsCreateModalOpen(true);
  const closeCreatePostModal = () => setIsCreateModalOpen(false);
  
  return (
    <>
      <Home openCreatePostModal={openCreatePostModal} />
      {isCreateModalOpen && (
        <PostCreateModal closeFunction={closeCreatePostModal} />
      )}
    </>
  );
};

export { HomeContainer };
