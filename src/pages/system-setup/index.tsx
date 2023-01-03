import React from 'react';
import { Outlet } from 'react-router-dom';

const SystemSetup = () => {
  return (
    <div>
      系统设置
      <Outlet></Outlet>
    </div>
  );
};

export default SystemSetup;
