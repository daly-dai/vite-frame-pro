import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import LayoutHeader from '../components/LayoutHeader';
import LayoutSider from '../components/LayoutSider';
import './index.less';

export type Props = {
  children: React.ReactNode;
};

const DefaultLayout: FC<Props> = () => {
  return (
    <div className="layout">
      <LayoutHeader></LayoutHeader>
      <div className="layout-content">
        <LayoutSider></LayoutSider>
        <div className="layout-content-container">
          <div className="content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
