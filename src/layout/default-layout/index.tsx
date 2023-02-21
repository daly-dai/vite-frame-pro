import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import './index.less';
import LayoutHeader from './components/Header';
import LayoutSider from './components/Sider';
import LayoutBreadcrumb from './components/Breadcrumb';

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
            <LayoutBreadcrumb></LayoutBreadcrumb>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
