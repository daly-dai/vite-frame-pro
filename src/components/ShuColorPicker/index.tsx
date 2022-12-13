import { Popover } from 'antd';
import React, { FC, useMemo, useRef, useState } from 'react';

import './index.less';
import { bColor, colorConfig, gradient, tColor } from './static';

interface Props {
  // 当前颜色
  // modelValue: string;
  // 默认颜色
  defaultColor?: string;
  // 禁用状态
  disabled?: boolean;
  // 点击触发事件
  onChange?: (color: string) => void;
}

const ShuColorPicker: FC<Props> = ({ defaultColor, disabled, onChange }) => {
  const inputRef = useRef(null);

  const [modelValue, setModelValue] = useState('');

  // 面板状态
  const [openStatus, setOpenStatus] = useState(false);

  // 切换弹框的状态
  const togglePopoverVisible = (status: boolean) => {
    // 禁用状态时无法点击
    if (disabled) return;

    setOpenStatus(status);
  };

  // 鼠标经过的颜色块
  const [hoveColor, setHoveColor] = useState('');
  const handleOver = (color: string) => {
    setHoveColor(color);
  };

  // 计算属性：显示颜色
  const showColor = useMemo(() => {
    if (modelValue) {
      return modelValue;
    }
    if (defaultColor) {
      return defaultColor;
    }

    return '#333';
  }, [defaultColor, modelValue]);

  // 计算属性：显示面板颜色
  const showPanelColor = useMemo(() => {
    if (hoveColor) {
      return hoveColor;
    } else {
      return showColor;
    }
  }, [hoveColor, showColor]);

  // 计算属性：颜色面板
  const colorPanel = useMemo(() => {
    const colorArr = [];

    for (const color of colorConfig) {
      colorArr.push(gradient(color[1], color[0], 5));
    }

    return colorArr;
  }, []);

  // 更新组件的值
  const updateValue = (value: string) => {
    onChange && onChange(value);
    setOpenStatus(false);
    setModelValue(value);
  };

  const handleDefaultColor = () => {
    defaultColor && updateValue(defaultColor);
  };

  const triggerHtml5Color = () => {
    if (inputRef.current) {
      (inputRef.current as any).focus();
    }
  };

  const colorPickerContent = () => {
    const defaultPropsColor = defaultColor || '';

    return (
      <>
        <div className="head">
          <div
            className="head-colorView"
            style={{ backgroundColor: showPanelColor }}
          ></div>
          <div
            className="head-button"
            onClick={handleDefaultColor}
            onMouseOver={() => handleOver(defaultPropsColor)}
            onMouseOut={() => handleOver('')}
          >
            默认颜色
          </div>
        </div>

        <div className="bd">
          <h3>主题颜色</h3>
          <ul className="tColor">
            {tColor.map((color, index) => (
              <li
                key={index}
                style={{ backgroundColor: color }}
                onMouseOver={() => handleOver(color)}
                onMouseOut={() => handleOver('')}
                onClick={() => updateValue(color)}
              ></li>
            ))}
          </ul>

          <ul className="bColor">
            {colorPanel.map((item, index) => (
              <li key={index}>
                <ul>
                  {item.map((color, cindex) => (
                    <li
                      key={cindex}
                      style={{ backgroundColor: color }}
                      onMouseOver={() => handleOver(color)}
                      onMouseOut={() => handleOver('')}
                      onClick={() => updateValue(color)}
                    ></li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <h3>标准颜色</h3>
          <ul className="tColor">
            {bColor.map((color, index) => (
              <li
                key={index}
                style={{ backgroundColor: color }}
                onMouseOver={() => handleOver(color)}
                onMouseOut={() => handleOver('')}
                onClick={() => updateValue(color)}
              ></li>
            ))}
          </ul>
          <div className="more-color">
            <h3 onClick={triggerHtml5Color}>更多颜色...</h3>

            <input
              type="color"
              ref={inputRef}
              onChange={(e) => updateValue(e.target.value)}
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="m-colorPicker">
      <Popover
        open={openStatus}
        trigger="click"
        onOpenChange={togglePopoverVisible}
        content={colorPickerContent}
        overlayClassName="colorContent"
      >
        <div
          className="colorBtn"
          style={{ background: showColor }}
          onClick={() => togglePopoverVisible(true)}
        ></div>
      </Popover>
    </div>
  );
};

export default ShuColorPicker;
