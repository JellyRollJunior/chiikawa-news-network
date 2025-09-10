

const PostListComments = ({ comments = [] }) => {
  return (
    <>
      {comments &&
        comments.map((comment) => (
          <div>hi</div>
        ))}
    </>
  );
};

export { PostListComments };
