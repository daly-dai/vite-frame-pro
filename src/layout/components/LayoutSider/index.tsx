import { AppstoreOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import ShuIcon from '@/components/ShuIcon';
import './index.less';

type MenuItem = Required<MenuProps>['items'][number];

// interface MenuItemTypes {
//   id: '';
//   name: '';
//   label: '';
//   iconName: '';
//   children: MenuItemTypes[];
// }

// function getItem(
//   label: React.ReactNode,
//   key: React.Key,
//   icon?: React.ReactNode,
//   children?: MenuItem[],
//   type?: 'group'
// ): MenuItem {
//   return {
//     key,
//     icon,
//     children,
//     label,
//     type
//   } as MenuItem;
// }

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
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

const LayoutSider = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openKeys, setOpenKeys] = useState(['sub1']);
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

    console.log(keyPath, 'keyPath');
    const routerPath = keyPath.reverse().join('/');

    navigate(`/${routerPath}`);
  };

  // 菜单回显
  useEffect(() => {
    console.log(location, 'location');
  }, [location]);

  return (
    <div className="sider">
      <Menu
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
