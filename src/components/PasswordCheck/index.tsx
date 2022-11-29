import { isArray } from 'lodash-es';
import React, { FC, useEffect, useMemo, useState } from 'react';

import './index.less';
import { CHECK_REG_MAP, COUNT_MAP, COUNT_MAP_LIST } from './static';

interface PasswordProps {
  password: string;
}
interface PsdCount {
  count: number;
  color: string;
  title: string;
}

// 密码校验
const PasswordCheck: FC<PasswordProps> = ({ password }) => {
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
    if (!CHECK_REG_MAP[type]) return true;

    return (CHECK_REG_MAP[type] as RegExp).test(str);
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

      if (len >= 3) {
        count += 20;
      } else {
        count += 10;
      }
    }

    if (includeCheck(v, 'syboml')) {
      const sybomlLen = countLen('syboml', v);

      if (sybomlLen > 1) {
        count += 25;
      } else {
        count += 10;
      }
    }

    return count;
  };

  const count = useMemo(() => {
    return checkPasswordInfo(password);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  // 判断是否在当前分数段内
  const checkUpCount = (checkItem: PsdCount) => {
    if (count > checkItem.count) return checkItem.color;

    return 'rgb(221, 221, 221)';
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

          return (
            <li key={item.count}>
              <div className="password-line">
                <div
                  className="line-bg"
                  style={{
                    background: hasColor
                  }}
                ></div>
                <div
                  className="title"
                  style={{
                    background: hasColor
                  }}
                >
                  {item.title}
                </div>
              </div>
            </li>
          );
        })}

        {/* <li>
          <div className="password-line">
            <div className="line-bg"></div>
            <div className="title">一般</div>
          </div>
        </li>
        <li>
          <div className="password-line">
            <div className="line-bg"></div>
            <div className="title">强</div>
          </div>
        </li>
        <li>
          <div className="password-line">
            <div className="line-bg"></div>
            <div className="title">较强</div>
          </div>
        </li>
        <li>
          <div className="password-line">
            <div className="line-bg"></div>
            <div className="title">安全</div>
          </div>
        </li>
        <li>
          <div className="password-line">
            <div className="line-bg"></div>
            <div className="title">非常安全</div>
          </div>
        </li> */}
      </ul>
    </div>
  );
};

export default PasswordCheck;
