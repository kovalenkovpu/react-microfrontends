import * as React from 'react';

import classes from './Page.module.scss';

const Page: React.FC = ({ children }) => (
  <section className={classes.page}>{children}</section>
);

export { Page };
