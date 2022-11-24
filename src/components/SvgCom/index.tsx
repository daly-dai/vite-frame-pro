import React, { FC } from 'react';
import './index.less';

interface IconProps {
  iconName: string;
  customClass?: string;
  prefix: string;
  color: string;
}

const SvgCom: FC<IconProps> = ({
  prefix = 'icon',
  iconName,
  customClass = '',
  color
}) => {
  return (
    <svg className={`icon ${customClass}`} aria-hidden="true">
      <use xlinkHref={`#${prefix}-${iconName}`} fill={color}></use>
    </svg>
  );
};

export default SvgCom;
