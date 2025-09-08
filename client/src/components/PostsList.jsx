import { Fragment } from 'react';
import { PostsListItem } from './PostsListItem.jsx';

const PostList = ({ posts = [] }) => {
  return (
    <ul className="flex flex-col gap-2">
      {posts.map((post) => (
        <Fragment key={post.id}>
          <PostsListItem post={post} />
        </Fragment>
      ))}
    </ul>
  );
};

export { PostList };
