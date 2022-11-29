import React, { useEffect, useState } from 'react';
import { Input, Popover } from 'antd';

import iconJson from '@/assets/icon-font/iconfont.json';
import SvgCom from '../SvgCom';
import './index.less';

interface IconNameList {
  iconName: string;
  iconKey: string;
}

const IconPicker = () => {
  const [iconNameList, setIconNameList] = useState<IconNameList[]>([]);
  const [iconName, setIconName] = useState<string>('');
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const { glyphs } = iconJson;
    const iconNameList = (glyphs || []).map((item) => {
      return { iconName: `icon${item.font_class}`, iconKey: item.icon_id };
    });

    setIconNameList(iconNameList);
    if (iconNameList.length) {
      setIconName(iconNameList[0].iconName);
    }
  }, []);

  const hidePopover = () => {
    setClicked(false);
  };

  const handleClickChange = (open: boolean) => {
    setClicked(open);
  };

  const clickContent = () => {
    const selectIcon = (iconName: string) => {
      setIconName(iconName);
      hidePopover();
    };

    return (
      <div className="icon-content">
        {iconNameList.map((item) => (
          <div
            className="icon-content-item"
            key={item.iconKey}
            onClick={() => selectIcon(item.iconName)}
          >
            <SvgCom size="2" iconName={item.iconName} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <Popover
      content={clickContent}
      trigger="click"
      open={clicked}
      onOpenChange={handleClickChange}
      overlayClassName="selectIconContent"
      placement="right"
    >
      <div className="pick">
        <div className="pick-input">
          <Input
            value={iconName}
            prefix={<SvgCom iconName={iconName} size="1.5"></SvgCom>}
          />
        </div>
      </div>
    </Popover>
  );
};

export default IconPicker;
