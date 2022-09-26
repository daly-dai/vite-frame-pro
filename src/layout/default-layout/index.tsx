import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

export type Props = {
  children: React.ReactNode;
};

const DefaultLayout: FC<Props> = () => {
  // return <Navigate to="/login" replace={true} />;

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
