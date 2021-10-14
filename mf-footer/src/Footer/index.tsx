import * as React from 'react';

import classes from './Footer.module.scss';

const Footer = () => {
  const [postsData, setPostsData] = React.useState([]);

  React.useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(r => r.json())
      .then(posts => {
        setPostsData(posts);
      });
  }, []);

  return (
    <section className={classes.footer}>
      <h2>All posts</h2>
      <ul>
        {postsData.slice(0, 10).map(post => {
          const { id, title } = post;

          return (
            <li className={classes.post} key={id}>
              {title}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export { Footer };
