import SvgCom from '@/components/SvgCom';
import IconPicker from '@/components/IconPicker';
import React, { useState } from 'react';

import './index.less';
import { Input } from 'antd';
import PasswordCheck from '@/components/PasswordCheck';

const Main = () => {
  const [psd, setPsd] = useState('');
  return (
    <div>
      首页
      {/* <SvgCom iconName="iconqiyeshensu" size="3"></SvgCom> */}
      <div style={{ margin: '120px' }}>
        <IconPicker></IconPicker>
      </div>
      <Input value={psd} onChange={(e) => setPsd(e.target.value)}></Input>
      <PasswordCheck isDynamic={true} password={psd}></PasswordCheck>
    </div>
  );
};

export default Main;
