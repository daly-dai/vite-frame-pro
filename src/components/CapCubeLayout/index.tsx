import React, { FC, useMemo, useState } from 'react';
import produce from 'immer';
import './index.less';
import { cloneDeep, keys, sortBy, toString } from 'lodash-es';

interface CapCubeLayoutProps {
  value: any;
  model: string;
  row: number;
  onCurrentIndex: (params: any) => void;
}

const CapCubeLayout: FC<CapCubeLayoutProps> = ({
  value,
  model,
  row,
  onCurrentIndex
}) => {
  const [startKey, setStartKey] = useState(0);
  const [currIndex, setCurrentIndex] = useState(-1);
  const [col, setCol] = useState(6);
  const [edit, setEdit] = useState(false);
  const [ys, setYs] = useState<any>([]);
  const [mValue, setMValue] = useState<any>([]);
  const [editKeys, setEditKeys] = useState<any>([]);

  const xs = useMemo(() => {
    return [...Array(col).keys()];
  }, [col]);

  useMemo(() => {
    setMValue(value);
  }, [value]);

  useMemo(() => {
    setYs([...Array(row).keys()]);
  }, [row]);

  useMemo(() => {
    const temp = currIndex == -1 ? undefined : mValue[currIndex];
    onCurrentIndex(temp);
  }, [currIndex, mValue, onCurrentIndex]);

  // 重置组件状态
  const reset = () => {
    setStartKey(0);
    setCurrentIndex(-1);
    setEdit(false);
    setMValue([]);
    setEditKeys([]);
  };

  /**
   * @desc 坐标计算下标
   * @date 2022-11-30
   * @param {any} y:number
   * @param {any} x:number
   * @returns {any}
   */
  const mergeKey = (y: number, x: number) => {
    return Number(x + y * 10);
  };

  // 下标拆分坐标
  const splitKey = (key: any) => {
    if (key >= 10) {
      const y = parseInt(toString((key % 100) / 10));
      return { y, x: key % 10 };
    } else {
      return { y: 0, x: Number(key) };
    }
  };

  const clickWrap = (e: any) => {
    if (!edit) {
      const key = e.target.dataset.key;
      setEditKeys(
        produce((draft: number[]) => {
          draft.push(Number(key));
        })
      );

      setStartKey(key);
      setEdit(true);
      return;
    }

    const keys = cloneDeep(sortBy(editKeys));
    const start = splitKey(keys[0]);
    const end = splitKey(keys.pop());

    // 结束编辑模式
    const temp = {
      top: start.y,
      left: start.x,
      bottom: end.y + 1,
      right: end.x + 1,
      height: end.y - start.y + 1,
      width: end.x - start.x + 1,
      image: '//d303.paixin.com/thumbs/1561359/378467338/staff_1024.jpg'
    };

    setMValue(
      produce((draft: any) => {
        draft.push(temp);
      })
    );
    // 数据延迟特地做的
    setCurrentIndex(mValue.length);
    setEditKeys([]);
    setEdit(false);
  };

  // 样式处理
  const getStyle = (style: any) => {
    const result: any = {};
    keys(style).map((key) => {
      result[key] = style[key] * 50;

      if (['top', 'left'].includes(key)) {
        --result[key];
      }
      if (['width', 'height'].includes(key)) {
        ++result[key];
      }
      result[key] += 'px';
    });

    return result;
  };

  const deleteEditWrap = (index: any) => {
    setMValue(
      produce((draft: any) => {
        draft.splice(index, 1);
      })
    );

    setCurrentIndex(mValue.length - 1);
  };

  /**
   * 判断两数值区间是否有交集
   * @param {*} arrA
   * @param {*} arrB
   */
  const isIntersection = (arrA: any[], arrB: any[]) => {
    const max = [arrA[0], arrB[0]];
    const min = [arrA[1], arrB[1]];

    if (Math.max.apply(null, max) <= Math.min.apply(null, min)) {
      return true;
    }

    return false;
  };

  // 防碰撞算法
  const antiCollision = (
    start: { y: any; x: any },
    end: { y: any; x: any }
  ) => {
    let result = false;

    cloneDeep(mValue).map(
      (item: { bottom: number; right: number; left: number; top: number }) => {
        --item.bottom;
        --item.right;

        // 判断 x 是否有交集
        if (isIntersection(sortBy([start.x, end.x]), [item.left, item.right])) {
          // 初始点在目标块y轴上方,结束点大于等于目标块top，发生了碰撞
          if (start.y < item.top && end.y >= item.top) {
            console.log('初始点在目标块y轴上方,碰撞了');
            result = true;
          }
          // 初始点在目标块y轴下方,结束点小于等于目标块bottom，发生了碰撞
          if (start.y > item.bottom && end.y <= item.bottom) {
            console.log('初始点在目标块y轴下方,碰撞了');
            result = true;
          }
        }

        // 判断 y 是否有交集
        if (isIntersection(sortBy([start.y, end.y]), [item.top, item.bottom])) {
          // 初始点在目标块y轴左方,结束点大于等于目标块left，发生了碰撞
          if (start.x < item.left && end.x >= item.left) {
            console.log('初始点在目标块y轴左方,碰撞了');
            result = true;
          }
          // 初始点在目标块y轴下方,结束点小于等于目标块bottom，发生了碰撞
          if (start.x > item.right && end.x <= item.right) {
            console.log('初始点在目标块y轴右方,碰撞了');
            result = true;
          }
        }
      }
    );

    return result;
  };

  // 移动鼠标设置编辑容器
  const move = (e: any) => {
    if (!edit) return;

    const keys = [];
    const start = splitKey(startKey);
    const end = splitKey(e.target.dataset.key);
    const ys = sortBy([start.y, end.y]);
    const xs = sortBy([start.x, end.x]);

    // 容器碰撞，阻止编辑容器变更
    if (antiCollision(start, end)) {
      return;
    }

    for (let i = ys[0]; i <= ys[1]; i++) {
      for (let j = xs[0]; j <= xs[1]; j++) {
        keys.push(mergeKey(i, j));
      }
    }

    setEditKeys(keys);
  };

  return (
    <div className="wrap">
      {/* 布局容器 */}
      {ys.map((y: any) => (
        <li key={y} className="flex">
          {xs.map((x) => (
            <li
              className={`wrap-item flex-center ${
                editKeys.includes(mergeKey(y, x)) ? 'move-wrap' : ''
              }`}
              key={mergeKey(y, x)}
              data-key={mergeKey(y, x)}
              data-y={y}
              data-x={x}
              onClick={(e) => clickWrap(e)}
              onMouseOver={move}
            ></li>
          ))}
        </li>
      ))}

      {/* 编辑器模块 */}

      {mValue.map((item: any, index: number) => (
        <div
          key={index}
          className={'edit-wrap flex-column flex-center'}
          style={{ ...getStyle(item) }}
          onClick={() => setCurrentIndex(index)}
        >
          {model == 'custom' && (
            <div
              className="edit-wrap-close"
              onClick={(index) => deleteEditWrap(index)}
            >
              <i className="f12 icon icon-cha-"></i>
            </div>
          )}
          <div className="mb3">{`${parseInt(item.width * 62.5 + '')}x${parseInt(
            item.height * 62.5 + ''
          )}`}</div>
          {item.width > 1 && <div>或同等比例</div>}
        </div>
      ))}
    </div>
  );
};

export default CapCubeLayout;
