import { Fragment } from 'react';
import { PostsListItem } from './PostsListItem.jsx';
import kuriPeace from '../assets/images/kuri-beer.png';

const PostList = ({ posts = [], hasNextPage }) => {
  return (
    <ul className="flex flex-col gap-2">
      {posts.map((post) => (
        <Fragment key={post.id}>
          <PostsListItem post={post} />
        </Fragment>
      ))}
      {!hasNextPage && posts.length > 0 && (
        <li className="blue-block flex flex-col px-3 py-2">
          <div className="mt-2 flex items-center justify-center">
            <img className="w-1/2" src={kuriPeace} alt="" />
          </div>
          <h2 className="mt-2 text-center font-semibold">
            You scrolled to the end!
          </h2>
        </li>
      )}
    </ul>
  );
};

export { PostList };
