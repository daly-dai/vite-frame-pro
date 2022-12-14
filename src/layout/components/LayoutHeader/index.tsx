import React from 'react';
import { BellOutlined, CodeOutlined, UserOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Menu, Popover } from 'antd';
import './index.less';

const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            1st menu item
          </a>
        )
      },
      {
        key: '3',
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.luohanacademy.com"
          >
            3rd menu item (disabled)
          </a>
        ),
        disabled: true
      },
      {
        key: '4',
        danger: true,
        label: 'a danger item'
      }
    ]}
  />
);

const LayoutHeader = () => {
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );

  return (
    <div className="header">
      <div className="header-left">
        <CodeOutlined />
      </div>
      <div className="header-right">
        {/* <div className="header-right-search">
          <Search
            addonBefore="https://"
            placeholder="input search text"
            allowClear
            style={{ width: 304 }}
          />
        </div> */}
        <div className="header-right-notice">
          <Popover content={content} title={null} placement="bottom">
            <Badge dot={true}>
              <BellOutlined />
            </Badge>
          </Popover>
        </div>
        <div className="header-right-theme"></div>
        <div className="header-right-user">
          <Dropdown overlay={menu}>
            <UserOutlined />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default LayoutHeader;
