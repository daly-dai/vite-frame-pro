import React, { useState } from 'react';
import styles from './Login.module.less';
import { Form, Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import AuthCode from './components/AuthCode';

const Login = () => {
  const [form] = Form.useForm();
  const [random, setRandom] = useState('0');

  const handleFormFinish = () => {
    console.log('handleFormFinish');
  };

  return (
    <div className={styles.login}>
      <div className={styles.formBox}>
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
          <Form.Item
            name="code"
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <Input
              size="large"
              placeholder="验证码"
              addonAfter={<AuthCode onChange={(random) => setRandom(random)} />}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* <ChangePassword {...editModel} hideResetDialog={hideResetDialog}></ChangePassword> */}
    </div>
  );
};

export default Login;
