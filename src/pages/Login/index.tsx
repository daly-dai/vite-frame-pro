import React, { useEffect } from 'react';
import styles from './Login.module.less';
import { Form, Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import userStore from '@/store/userStore';

const Login = () => {
  const navigate = useNavigate();
  const { login } = userStore;
  const [form] = Form.useForm();

  const handleFormFinish = () => {
    login('setToken');

    navigate('/home');
  };

  useEffect(() => {
    console.log(userStore, 909090909);
  }, []);

  // const getMenuData = () => {
  //   const menuData: any = [
  //     {
  //       id: 0,
  //       menuCode: '100',
  //       menuName: '驾驶舱',
  //       path: '/dashboard',
  //       icon: '',
  //       children: []
  //     },
  //     {
  //       id: 1,
  //       menuCode: '200',
  //       menuName: '系统设置',
  //       path: '/',
  //       icon: '',
  //       children: [
  //         {
  //           id: 2,
  //           menuCode: '200',
  //           menuName: '系统设置',
  //           path: '',
  //           icon: ''
  //         }
  //       ]
  //     }
  //   ];
  // };

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
