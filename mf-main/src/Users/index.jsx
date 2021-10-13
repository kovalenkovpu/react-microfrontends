import * as React from "react";

import { Page } from "../Page";

import classes from "./Users.module.scss";

const Users = () => {
  const [usersData, setUsersData] = React.useState([]);

  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((r) => r.json())
      .then((users) => {
        setUsersData(users);
      });
  }, []);

  return (
    <Page>
      <h2>Users:</h2>
      <ul>
        {usersData.map((user) => {
          const { id, name } = user;

          return (
            <li className={classes.user} key={id}>
              {name}
            </li>
          );
        })}
      </ul>
    </Page>
  );
};

export { Users };
