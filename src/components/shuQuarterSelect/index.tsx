import { Input, Popover, DatePickerProps } from 'antd';
import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  ScheduleOutlined
} from '@ant-design/icons';

import './index.less';
import { getFullQuarter } from './static';

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
  defaultValue?: Date;
  onChange?: (time: string) => void;
}

const ShuQuarterSelect: FC<Props> = ({ defaultValue, onChange }) => {
  const [quarterValue, setQuarterValue] = useState<string>();
  const [year, setYear] = useState(new Date().getFullYear());
  const [popVisible, setPopVisible] = useState(false);

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
    setPopVisible(false);
    onChangeEvent('');
  };

  const onChangeEvent = useCallback(
    (value: string) => {
      onChange && onChange(value);
    },
    [onChange]
  );

  const initDefaultValue = useCallback(() => {
    const fullQuarter = getFullQuarter(defaultValue);

    setQuarterValue(fullQuarter);
    onChangeEvent(fullQuarter);
  }, [defaultValue, onChangeEvent]);

  useEffect(() => {
    initDefaultValue();
  }, [initDefaultValue]);

  // 选择
  const onSelectQuarter = (time: string) => {
    if (time === quarterValue) return false;

    setQuarterValue(time);
    setPopVisible(false);
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
            const fullTime = `${year}-${item.value}`;
            const isActive = quarterValue === fullTime;

            return (
              <span
                onClick={() => onSelectQuarter(fullTime)}
                className={`pop-center-item ${isActive && 'pop-center-active'}`}
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
