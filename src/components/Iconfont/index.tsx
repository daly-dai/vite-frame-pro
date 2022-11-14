import React, { FC } from 'react';
import './index.less';

interface IconProps {
  iconName: string;
  customClass?: string;
  iconClick?: () => void;
}

const Icon: FC<IconProps> = ({ iconName, customClass, iconClick }) => {
  const handle = () => {
    iconClick?.();
  };

  return (
    <svg className="icon" aria-hidden="true">
      <use xlinkHref={`#${iconName}`}></use>
    </svg>
  );
};

export default Icon;
