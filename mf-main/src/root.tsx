import * as React from 'react';

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import { Posts } from './Posts';
import { Post } from './Post';
import { Users } from './Users';

const Root = () => {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Posts</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/posts" exact>
          <Posts />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/posts/:postId">
          <Post />
        </Route>
        <Route path="/">
          <Posts />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export { Root };
