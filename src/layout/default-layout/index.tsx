import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

export type Props = {
  children: React.ReactNode;
};

const DefaultLayout: FC<Props> = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
