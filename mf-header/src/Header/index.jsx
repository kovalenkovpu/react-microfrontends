import * as React from 'react';

import classes from './Header.module.scss';

const Header = ({ isLoggedIn = false }) => {
  const [userData, setUserData] = React.useState(null);
  const [isUserLoggedIn, setLoggedIn] = React.useState(isLoggedIn);

  const onUserLogin = () => {
    if (!isUserLoggedIn) {
      const randomId = Math.ceil(Math.random() * 10); 

      fetch(`https://jsonplaceholder.typicode.com/users?id=${randomId}`)
      .then(r => r.json())
      .then(([user]) => {
        setUserData(user);
        setLoggedIn(true);
      });
    }
  };
  const onUserLogout = () => {
    setUserData(null);
    setLoggedIn(false);
  };

  const UserInformation = React.useMemo(() => {
    if (!isUserLoggedIn) {
      return null;
    }

    return <h3 className={classes.userName}>Logged in as: {userData?.name}</h3>
  }, [isUserLoggedIn, userData]);

  return (
    <section className={classes.header}>
      <img className={classes.logo} src="https://via.placeholder.com/150/92c952" />
      {UserInformation}
      <button className={classes.authButton} onClick={isUserLoggedIn ? onUserLogout : onUserLogin}>
        {isUserLoggedIn ? 'Logout' : 'Login'}
      </button>
    </section>
  );
};

export { Header }