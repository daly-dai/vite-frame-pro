import React, { useEffect, useState } from 'react';
import { Popover, message } from 'antd';

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
  const [popoverVisible, setPopoverVisible] = useState(false);

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

  const showPopover = () => {
    setPopoverVisible(true);
  };

  const hidePopover = () => {
    setPopoverVisible(false);
  };

  const handleCopy = async () => {
    if ('clipboard' in navigator) {
      message.success('复制成功');
      return await navigator.clipboard.writeText(iconName);
    }

    return document.execCommand('copy', true, iconName);
  };

  const handleClickChange = (open: boolean) => {
    setPopoverVisible(open);
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
    <>
      <div className="pick">
        <div className="pick-icon" onClick={showPopover}>
          <SvgCom iconName={iconName} size="1.5"></SvgCom>
        </div>
        <div className="pick-input" onClick={handleCopy}>
          {iconName}
        </div>
      </div>

      <Popover
        content={clickContent}
        trigger="click"
        open={popoverVisible}
        onOpenChange={handleClickChange}
        overlayClassName="selectIconContent"
        placement="right"
      />
    </>
  );
};

export default IconPicker;
