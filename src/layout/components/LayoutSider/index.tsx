import { Menu, MenuProps } from 'antd';
import React, { useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { filter } from 'lodash-es';

import './index.less';
import appStore from '@/store/appStore';
import { useSnapshot } from 'valtio';

const rootSubmenuKeys: string[] = [];

const LayoutSider = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = appStore;
  const appState = useSnapshot(state);

  const [openKeys, setOpenKeys] = useState<string[]>(['sub1']);
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const clickAsideMenu = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    item,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    key,
    keyPath
  }: {
    item: any;
    key: string;
    keyPath: string[];
    domEvent: any;
  }) => {
    if (!keyPath?.length) return '';

    if (keyPath.length === 1) {
      navigate(`/${keyPath[0]}`);
      return;
    }

    const routerPath = keyPath.reverse().join('/');

    navigate(`/${routerPath}`);
  };

  const defaultSelectedKeys: any = useMemo(() => {
    const { pathname } = location;
    const pathList = filter(pathname.split('/'), (item) => {
      return item && item.trim();
    });

    return pathList;
  }, [location]);

  useMemo(() => {
    const { pathname } = location;
    const pathList = filter(pathname.split('/'), (item) => {
      return item && item.trim();
    });

    if (pathList?.length === 1) return;

    const openKeysList = pathList.splice(0, pathList.length - 1) as string[];

    setOpenKeys(openKeysList);
  }, [location]);

  const asideMenu = useMemo(() => {
    if (appState?.asideMenu && appState?.asideMenu.length) {
      return appState?.asideMenu;
    }

    return [];
  }, [appState?.asideMenu]);

  return (
    <div className="sider">
      <Menu
        defaultSelectedKeys={defaultSelectedKeys}
        onClick={clickAsideMenu}
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{ width: 220 }}
        items={asideMenu}
      />
    </div>
  );
};

export default LayoutSider;
