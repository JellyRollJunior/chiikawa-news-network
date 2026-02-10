import { useEffect } from 'react';
import { useCreatePost } from '@/features/posts/hooks/useCreatePost.js';
import { useGiphy } from '@/features/posts/hooks/useGiphy.js';
import { CreatePostModalView } from '@/features/posts/components/CreatePostModal/CreatePostModalView.jsx';

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
      closeModal={closeModal}
      onSubmitPost={onSubmitPost}
      isSubmittingPost={isLoadingCreatePost}
      gifs={gifs}
      isLoadingGifs={isLoadingGifs}
      searchGifs={searchGifs}
      gifError={error}
    />
  );
};

export { CreatePostModalContainer };
