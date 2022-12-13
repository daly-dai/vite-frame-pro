import SvgCom from '@/components/SvgCom';
import IconPicker from '@/components/IconPicker';
import React, { createRef, useRef, useState } from 'react';

import './index.less';
import { Button, Input } from 'antd';
import './index.less';
import PasswordCheck from '@/components/PasswordCheck';
import ShuModal from '@/components/ShuModal';
import ShuQuarterSelect from '@/components/shuQuarterSelect';
import ShuBackToTop from '@/components/ShuBackToTop';
import ShuColorPicker from '@/components/ShuColorPicker';

const Main = () => {
  const [psd, setPsd] = useState('');
  const modalRef = useRef() as any;

  const showModal = () => {
    console.log(modalRef, 'modalRef');
    modalRef.current.showModal();
  };

  return (
    <div id="main" className="main">
      首页
      <SvgCom iconName="iconqiyeshensu" size="3"></SvgCom>
      <div style={{ margin: '120px' }}>
        <IconPicker></IconPicker>
      </div>
      <Input value={psd} onChange={(e) => setPsd(e.target.value)}></Input>
      {/* <PasswordCheck isDynamic={true} password={psd}></PasswordCheck> */}
      <ShuModal
        ref={modalRef}
        trigger={
          <Button onClick={showModal} type="primary">
            点击唤起弹框
          </Button>
        }
      >
        弹框内部内容
      </ShuModal>
      <ShuQuarterSelect></ShuQuarterSelect>
      <ShuBackToTop container="main"></ShuBackToTop>
      <ShuColorPicker defaultColor="#333"></ShuColorPicker>
    </div>
  );
};

export default Main;
