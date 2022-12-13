import { QuarterItem } from './type';

const QUARTER_LIST: QuarterItem[] = [
  {
    label: '第一季度',
    value: 1
  },
  {
    label: '第二季度',
    value: 2
  },
  {
    label: '第三季度',
    value: 3
  },
  {
    label: '第四季度',
    value: 4
  }
];

/**
 * @desc
 * @param date 时间
 * @param type
 * @returns
 */
function getQuarterByDate(date: Date) {
  const month = date.getMonth() + 1;

  //下面是几个if
  if (month >= 1 && month <= 3) {
    return 1;
  } else if (month >= 4 && month <= 6) {
    return 2;
  } else if (month >= 7 && month <= 9) {
    return 3;
  } else {
    return 4;
  }
}

// 获取当前时间戳的年季度
function getFullQuarter(date: Date | undefined = new Date()) {
  const year = date.getFullYear();
  const quarter = getQuarterByDate(date);

  return `${year}-${quarter}`;
}

/**
 * @description 检查当前时间戳是否在当前季度内
 */
function checkDateInCurrentQuarter({
  date,
  year,
  quarter
}: {
  date: Date;
  year: number;
  quarter: number;
}) {
  const quarterDate = getQuarterByDate(date);
  const yearDate = date.getFullYear();

  if (quarterDate === quarter && yearDate === year) return true;

  return false;
}

export {
  getQuarterByDate,
  checkDateInCurrentQuarter,
  QUARTER_LIST,
  getFullQuarter
};
