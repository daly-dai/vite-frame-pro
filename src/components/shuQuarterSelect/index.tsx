import { Input, Popover, DatePickerProps } from 'antd';
import React, { FC, useState } from 'react';
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  ScheduleOutlined
} from '@ant-design/icons';

import './index.less';

const quarterList = [
  {
    label: '第一季度',
    value: 1
  },
  {
    label: '第二季度',
    value: 2
  },
  {
    label: '第三季度',
    value: 3
  },
  {
    label: '第四季度',
    value: 4
  }
];

interface Props {
  defaultValue?: any;
  onChange?: (time: string) => void;
}

const ShuQuarterSelect: FC<Props> = ({ defaultValue, onChange }) => {
  const [chooseQuarter, setChooseQuarter] = useState<string>();
  const [quarterValue, setQuarterValue] = useState();
  const [year, setYear] = useState(new Date().getFullYear());
  const [popVisible, setPopVisible] = useState(true);

  const togglePopoverVisible = (open: boolean) => {
    setPopVisible(open);
  };

  // 上一年
  const prev = () => {
    setYear(year - 1);
  };

  const next = () => {
    setYear(year + 1);
  };

  const clearClick = () => {
    setChooseQuarter('');
    setPopVisible(false);
    onChange && onChange('');
  };

  const QuarterContent = () => {
    return (
      <div className="pop">
        <div className="pop-head">
          <div onClick={prev}>
            <DoubleLeftOutlined />
          </div>
          <div>{year}年</div>
          <div onClick={next}>
            <DoubleRightOutlined />
          </div>
        </div>
        <div className="pop-center">
          {quarterList.map((item) => {
            return (
              <span
                className={`pop-center-item ${'pop-center-disable'}`}
                key={item.value}
              >
                {item.label}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="quarter">
      <Popover
        open={popVisible}
        trigger="click"
        onOpenChange={togglePopoverVisible}
        overlayClassName="quarterContent"
        placement="bottom"
        content={QuarterContent}
      >
        <div
          className="quarter-input"
          onClick={() => togglePopoverVisible(true)}
        >
          <Input prefix={<ScheduleOutlined />} allowClear></Input>
        </div>
      </Popover>
    </div>
  );
};

export default ShuQuarterSelect;
