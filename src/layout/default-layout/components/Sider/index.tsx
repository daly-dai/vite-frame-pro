import { Menu, MenuProps } from 'antd';
import React, { useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cloneDeep, filter } from 'lodash-es';

import './index.less';
import appStore, { CurrentPath } from '@/store/appStore';
import { useSnapshot } from 'valtio';
import { getTreeMap } from '@/utils/tree';

const rootSubmenuKeys: string[] = [];

const LayoutSider = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, setCurrentPath } = appStore;
  const appState = useSnapshot(state);

  const [openKeys, setOpenKeys] = useState<string[]>(['sub1']);

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
    console.log(appState?.asideMenu, 'appState?.asideMenu');
    if (appState?.asideMenu && appState?.asideMenu.length) {
      return appState?.asideMenu;
    }

    return [];
  }, [appState?.asideMenu]);

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const setKeyPath = (keyArr: string[]) => {
    if (!asideMenu.length) return;

    const result: CurrentPath[] = [];

    const pathArr = getTreeMap(cloneDeep(asideMenu));

    keyArr.forEach((item: string) => {
      const keyItem = filter(pathArr, {
        key: item
      }) as unknown as CurrentPath as any;

      if (!keyItem) return;

      Reflect.deleteProperty(keyItem[0], 'icon');
      Reflect.deleteProperty(keyItem[0], 'children');

      result.unshift(keyItem[0]);
    });

    setCurrentPath(result);
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

    setKeyPath(keyPath);

    if (keyPath.length === 1) {
      navigate(`/${keyPath[0]}`);
      return;
    }

    const routerPath = keyPath.reverse().join('/');

    navigate(`/${routerPath}`);
  };

  return (
    <div className="sider">
      {JSON.stringify(asideMenu)}
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
