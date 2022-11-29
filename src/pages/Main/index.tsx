import SvgCom from '@/components/SvgCom';
import IconPicker from '@/components/IconPicker';
import React from 'react';

import './index.less';

const Main = () => {
  return (
    <div>
      首页
      {/* <SvgCom iconName="iconqiyeshensu" size="3"></SvgCom> */}
      <div style={{ margin: '120px' }}>
        <IconPicker></IconPicker>
      </div>
    </div>
  );
};

export default Main;
