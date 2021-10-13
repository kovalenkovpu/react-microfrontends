import * as React from "react";
import { useParams } from "react-router-dom";

import { Page } from "../Page";

import classes from "./Post.module.scss";

const Post = () => {
  const { postId } = useParams();
  const [postData, setPostData] = React.useState(null);

  React.useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((r) => r.json())
      .then((post) => {
        setPostData(post);
      });
  }, [postId]);

  if (!postData) {
    return <h3>No post data is loaded.</h3>;
  }

  return (
    <Page>
      <section className={classes.post}>
        <h3>{postData.title}</h3>
        <article>{postData.body}</article>
      </section>
    </Page>
  );
};

export { Post };
