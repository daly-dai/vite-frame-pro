import React, { FC } from 'react';
import * as icons from '@ant-design/icons';

interface Props {
  icon: string;
}

const ShuIcon: FC<Props> = ({ icon }) => {
  const antIcon: { [key: string]: any } = icons;

  return React.createElement(antIcon[icon]);
};

export default ShuIcon;
