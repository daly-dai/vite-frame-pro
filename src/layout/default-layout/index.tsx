import React, { FC } from 'react';

export type Props = {
  children: React.ReactNode;
};

const DefaultLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default DefaultLayout;
