import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import userStore from '@/store/userStore';
import ShuIcon from '@/components/ShuIcon';
import styles from './Login.module.less';
import appStore from '@/store/appStore';

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
        icon: <ShuIcon icon="AppstoreOutlined" />,
        key: 'permission-mange',
        label: '权限设置'
      },
      {
        icon: <ShuIcon icon="AppstoreOutlined" />,
        key: 'role-mange',
        label: '角色设置'
      },
      {
        icon: <ShuIcon icon="AppstoreOutlined" />,
        key: 'user-mange',
        label: '用户设置'
      }
    ]
  }
];

const Login = () => {
  const navigate = useNavigate();
  const { login } = userStore;
  const { setAsideMenu } = appStore;
  const [form] = Form.useForm();

  const handleFormFinish = () => {
    login('setToken');
    setAsideMenu(asideMenu);

    navigate('/home');
  };

  useEffect(() => {
    console.log(userStore, 909090909);
  }, []);

  return (
    <div className={styles.login}>
      <div className={styles.title}>vite-frame-pro</div>
      <div className={styles.formBox}>
        <div className={styles.formBoxTitle}>登录</div>
        {/* 手机号登陆 */}
        <Form form={form} onFinish={handleFormFinish}>
          <Form.Item
            name="account"
            rules={[{ required: true, message: '请输入手机号' }]}
          >
            <Input size="large" placeholder="手机号" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              size="large"
              placeholder="密码"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
