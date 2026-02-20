import { useContext, useState } from 'react';
import { CurrentContext } from '@/features/auth/providers/CurrentProvider.jsx';
import { useComments } from '@/features/posts/hooks/useComments.js';
import { Comments } from '@/features/posts/components/Comments.jsx';
import { CommentInput } from '@/features/posts/components/CommentInput.jsx';
import { DeleteCommentModal } from '@/features/posts/components/DeleteCommentModal.jsx';

const CommentSection = ({ postId }) => {
  const { id } = useContext(CurrentContext);
  const {
    comments,
    isLoading: isLoadingComments,
    toggleLike,
    isLoadingLike,
    refetch: refetchComments,
  } = useComments(postId);

  // Delete Comment Modal
  const [commentToDeleteId, setCommentToDeleteId] = useState(null);
  const openDeleteModal = (commentId) => setCommentToDeleteId(commentId);
  const closeDeleteModal = () => setCommentToDeleteId(null);

  return (
    <>
      <Comments
        currentUserId={id}
        comments={comments}
        isLoadingComments={isLoadingComments}
        toggleLike={toggleLike}
        isLoadingLike={isLoadingLike}
        openDeleteModal={openDeleteModal}
      />
      <CommentInput
        className="mt-3"
        postId={postId}
        onSubmit={refetchComments}
      />
      <DeleteCommentModal
        open={commentToDeleteId != null}
        closeModal={closeDeleteModal}
        onDeleteComment={refetchComments}
        commentId={commentToDeleteId}
      />
    </>
  );
};

export { CommentSection };
