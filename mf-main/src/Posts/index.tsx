import * as React from 'react';
import { Link } from 'react-router-dom';

import { PostData } from 'src/Post';

import { Page } from '../Page';

import classes from './Posts.module.scss';

const POSTS_PER_PAGE = 20;

const Posts: React.VFC = () => {
  const [postsData, setPostsData] = React.useState<PostData[]>([]);
  const [postsNumber, setPostsNumber] = React.useState(POSTS_PER_PAGE);

  const displayMorePostsRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then<PostData[]>(r => r.json())
      .then(posts => {
        setPostsData(posts);
      });
  }, []);

  const onDisplayMorePosts = () => {
    setPostsNumber(currentPostsNumber => currentPostsNumber + POSTS_PER_PAGE);

    displayMorePostsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Page>
      <h2>Posts:</h2>
      <ul>
        {postsData.slice(0, postsNumber).map(post => {
          const { id, title } = post;

          return (
            <li key={id}>
              <Link className={classes.post} to={`posts/${id}`}>
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
      <button
        className={classes.displayMorePosts}
        onClick={onDisplayMorePosts}
        ref={displayMorePostsRef}
      >
        Display more posts
      </button>
    </Page>
  );
};

export { Posts };
