import SvgCom from '@/components/ShuSvgCom';
import IconPicker from '@/components/ShuIconPicker';
import React, { createRef, useRef, useState } from 'react';

import './index.less';
import { Button, Input } from 'antd';
import './index.less';
import PasswordCheck from '@/components/ShuPasswordCheck';
import ShuModal from '@/components/ShuModal';
import ShuQuarterSelect from '@/components/ShuQuarterSelect';
import ShuBackToTop from '@/components/ShuBackToTop';
import ShuColorPicker from '@/components/ShuColorPicker';
import ShuExcelToData from '@/components/ShuExcelToData';

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
      {/* <Input value={psd} onChange={(e) => setPsd(e.target.value)}></Input>
      <PasswordCheck password={psd}></PasswordCheck> */}
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
      <ShuExcelToData showTable={false}></ShuExcelToData>
    </div>
  );
};

export default Main;
