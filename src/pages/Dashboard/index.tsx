import React from 'react';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  // const { token } = useAuth();

  return (
    <>
      <h2>Dashboard (Protected)</h2>

      {/* <div>Authenticated as {token}</div> */}
      <Outlet />
    </>
  );
};

export default Dashboard;
