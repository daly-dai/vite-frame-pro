import { Breadcrumb } from 'antd';
import React, { useMemo } from 'react';

import './index.less';
import appStore, { CurrentPath } from '@/store/appStore';
import { useSnapshot } from 'valtio';

const LayoutBreadcrumb = () => {
  const appState = useSnapshot(appStore.state);

  const breadcrumbList = useMemo(() => {
    if (!appState?.currentPath?.length) return [];

    return appState?.currentPath;
  }, [appState?.currentPath]);

  return (
    <div className="breadcrumb">
      <Breadcrumb>
        {breadcrumbList.map((item: CurrentPath) => (
          <Breadcrumb.Item key={item.key}>{item.label}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default LayoutBreadcrumb;
