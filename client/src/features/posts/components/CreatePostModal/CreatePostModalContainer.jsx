import { CreatePostModalView } from '@/features/posts/components/CreatePostModal/CreatePostModalView.jsx';
import { useCreatePost } from '@/features/posts/hooks/useCreatePost.js';

const CreatePostModalContainer = ({
  open = false,
  closeModal,
  onSubmitModal,
}) => {
  const { createPost, isLoading } = useCreatePost();

  const onSubmitPost = async (title, content, media) => {
    if (media) {
      await createPost(title, content, media);
    } else {
      await createPost(title, content, null);
    }
    closeModal();
    onSubmitModal();
  };

  return (
    <CreatePostModalView
      open={open}
      closeFunction={closeModal}
      onSubmitPost={onSubmitPost}
      isLoading={isLoading}
    />
  );
};

export { CreatePostModalContainer };
