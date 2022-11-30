import { isArray } from 'lodash-es';
import React, { FC, useEffect, useMemo, useState } from 'react';

import './index.less';
import {
  CHECK_REG_MAP,
  COUNT_MAP,
  COUNT_MAP_LIST,
  CONTAINS_REG_CHECK_MAP
} from './static';

interface PasswordProps {
  password: string;
  isDynamic?: boolean;
}
interface PsdCount {
  count: number;
  color: string;
  title: string;
}

// 密码校验
const PasswordCheck: FC<PasswordProps> = ({ password, isDynamic = false }) => {
  const [psdCountList, setPsdCountList] = useState<PsdCount[]>([]);

  const checkStr = (str: string, type: string) => {
    if (!CHECK_REG_MAP[type]) return true;

    if (isArray(CHECK_REG_MAP[type])) {
      return (CHECK_REG_MAP[type] as any).every((reg: RegExp) => {
        return reg.test(str);
      });
    }

    return (CHECK_REG_MAP[type] as RegExp).test(str);
  };

  const countLen = (type: string, str: string | any[]) => {
    let num = 0;
    if (str.length > 0) {
      for (const value of str) {
        if (checkStr(value, type)) {
          num++;
        }
      }
    }
    return num;
  };

  const includeCheck = (str: string, type: string) => {
    if (!CONTAINS_REG_CHECK_MAP[type]) return true;

    return (CONTAINS_REG_CHECK_MAP[type] as RegExp).test(str);
  };

  const checkPasswordInfo = (v: string) => {
    let count = 0;
    // 长度计分
    if (v === '') {
      count = 0;

      return count;
    }

    if (v.length <= 4) {
      count = 5;
    } else if (v.length < 5 && v.length >= 7) {
      count = 10;
    } else {
      count = 25;
    }

    if (includeCheck(v, 'lower')) {
      count += 10;
    }

    if (includeCheck(v, 'upper')) {
      count += 10;
    }

    if (includeCheck(v, 'number')) {
      const len = countLen('number', v);

      count += len > 3 ? 20 : 10;
    }

    if (includeCheck(v, 'symbol')) {
      const symbolLen = countLen('symbol', v);

      count += symbolLen > 1 ? 25 : 10;
    }

    return count;
  };

  const count = useMemo(() => {
    return checkPasswordInfo(password);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  // 判断是否在当前分数段内
  const checkUpCount = (checkItem: PsdCount) => {
    if (count >= checkItem.count) return checkItem.color;

    return '';
  };

  useEffect(() => {
    const psdCountList = COUNT_MAP_LIST.map((key) => {
      return {
        count: key,
        ...COUNT_MAP[key]
      };
    });

    setPsdCountList(psdCountList);
  }, []);

  return (
    <div className="base-password-style">
      <ul>
        {psdCountList.map((item: PsdCount) => {
          const hasColor = checkUpCount(item);

          if (isDynamic && !hasColor) {
            return '';
          }

          return (
            <li key={item.count}>
              <div className="password-line">
                <div
                  className="line-bg"
                  style={{
                    background: hasColor ? hasColor : 'rgb(221, 221, 221)'
                  }}
                ></div>
                <div
                  className="title"
                  style={{
                    color: hasColor ? hasColor : ''
                  }}
                >
                  {item.title}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PasswordCheck;
