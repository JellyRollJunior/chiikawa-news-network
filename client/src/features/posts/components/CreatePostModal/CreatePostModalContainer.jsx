import { CreatePostModalView } from '@/features/posts/components/CreatePostModal/CreatePostModalView.jsx';
import { useCreatePost } from '@/features/posts/hooks/useCreatePost.js';
import { useGiphy } from '@/features/posts/hooks/useGiphy.js';
import { useEffect } from 'react';

const CreatePostModalContainer = ({
  open = false,
  closeModal,
  onSubmitModal,
}) => {
  const { createPost, isLoading: isLoadingCreatePost } = useCreatePost();
  const { gifs, isLoading: isLoadingGifs, error, fetchGifs } = useGiphy();

  // initialize gifs
  useEffect(() => {
    fetchGifs();
  }, [fetchGifs]);

  const onSubmitPost = async (title, content, media) => {
    if (media) {
      await createPost(title, content, media);
    } else {
      await createPost(title, content, null);
    }
    closeModal();
    onSubmitModal();
  };

  const searchGifs = (query) => {
    fetchGifs(query);
  };

  return (
    <CreatePostModalView
      open={open}
      closeFunction={closeModal}
      onSubmitPost={onSubmitPost}
      isLoadingSubmit={isLoadingCreatePost}

      gifs={gifs}
      isLoadingGifs={isLoadingGifs}
      searchGifs={searchGifs}
      gifError={error}
    />
  );
};

export { CreatePostModalContainer };
