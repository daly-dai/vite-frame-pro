import { AppstoreOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import React, { useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import ShuIcon from '@/components/ShuIcon';
import './index.less';
import { filter } from 'lodash-es';

const asideMenu = [
  {
    icon: <ShuIcon icon="MailOutlined" />,
    key: 'home',
    label: '首页'
  },
  {
    icon: <ShuIcon icon="AppstoreOutlined" />,
    key: 'dashboard',
    label: '驾驶舱'
  },
  {
    icon: <ShuIcon icon="AppstoreOutlined" />,
    key: 'systemSetup',
    label: '系统设置',
    children: [
      {
        icon: <AppstoreOutlined />,
        key: 'permission-mange',
        label: '权限设置'
      },
      {
        icon: <AppstoreOutlined />,
        key: 'role-mange',
        label: '角色设置'
      },
      {
        icon: <AppstoreOutlined />,
        key: 'user-mange',
        label: '用户设置'
      }
    ]
  }
];

// submenu keys of first level
const rootSubmenuKeys: string[] = [];

const LayoutSider = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
