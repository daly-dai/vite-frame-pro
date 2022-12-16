import { isString } from 'lodash-es';
import React, { FC, useCallback, useMemo } from 'react';
import './index.less';

interface IconProps {
  iconName: string;
  customClass?: string;
  color?: string;
  size?: string | number;
}

const measureUnit = ['px', 'rem', 'em', 'vw', 'vh'];

const ShuSvgCom: FC<IconProps> = ({
  iconName,
  customClass = '',
  color,
  size = ''
}) => {
  // 是否包含度量单位
  const hasMeasureUnit = useCallback((): boolean => {
    let result = false;

    if (!isString(size)) return result;

    for (let i = 0; i < measureUnit.length; i++) {
      if ((size as string).search(measureUnit[i]) !== -1) {
        result = true;
        return result;
      }
    }

    return result;
  }, [size]);

  const svgSize = useMemo(() => {
    if (!size) return {};

    if (hasMeasureUnit()) {
      return {
        width: size,
        height: size
      };
    }

    return {
      width: `${size}em`,
      height: `${size}em`
    };
  }, [hasMeasureUnit, size]);

  return (
    <svg
      className={`icon iconContainer ${customClass}`}
      aria-hidden="true"
      style={{ ...svgSize }}
    >
      <use xlinkHref={`#${iconName}`} fill={color}></use>
    </svg>
  );
};

export default ShuSvgCom;
