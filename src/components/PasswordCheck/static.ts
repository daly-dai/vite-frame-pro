const COUNT_MAP_LIST = [5, 50, 60, 70, 80, 90];

const COUNT_MAP: {
  [key in string | number]: {
    color: string;
    title: string;
  };
} = {
  5: {
    color: 'rgb(158, 165, 180)',
    title: '弱'
  },
  50: {
    color: 'rgb(236, 181, 111)',
    title: '一般'
  },
  60: {
    color: 'rgb(255, 133, 76)',
    title: '强'
  },
  70: {
    color: 'rgb(216, 68, 0)',
    title: '较强'
  },
  80: {
    color: 'rgb(111, 176, 254)',
    title: '安全'
  },
  90: {
    color: 'rgb(24, 144, 255)',
    title: '非常安全'
  }
};

// 包含关系的正则
const CONTAINS_REG_CHECK_MAP: {
  [key in string]: RegExp | RegExp[];
} = {
  lower: /^(?=.*?[a-z]).*$/,
  upper: /^(?=.*?[A-Z]).*$/,
  number: /^(?=.*?[0-9]).*$/,
  symbol: /^(?=.*?[`~!@#$%^&*.<>￥，。《》?？【】、·~；’：”;']).*$/
};

// 类型正则
const CHECK_REG_MAP: {
  [key in string]: RegExp | RegExp[];
} = {
  // 手机号码
  phone: /^1[3|4|5|6|7|8|9][0-9]{9}$/,
  // 座机
  tel: /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/,
  // 身份证
  card: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  // 密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
  pwd: /^[a-zA-Z]\w{5,17}$/,
  // 邮政编码
  postal: /[1-9]\d{5}(?!\d)/,
  // QQ号
  QQ: /^[1-9][0-9]{4,9}$/,
  // 邮箱
  email: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
  // 金额(小数点2位)
  money: /^\d*(?:\.\d{0,2})?$/,
  // 网址
  URL: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\\.,@?^=%&:/~\\+#]*[\w\-\\@?^=%&/~\\+#])?/,
  // IP
  IP: /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/,
  // 日期时间
  date: [
    /^(\d{4})\\-(\d{2})\\-(\d{2}) (\d{2})(?:\\:\d{2}|:(\d{2}):(\d{2}))$/,
    /^(\d{4})\\-(\d{2})\\-(\d{2})$/
  ],
  // 数字
  number: /^[0-9]$/,
  // 英文
  english: /^[a-zA-Z]+$/,
  // 中文
  chinese: /^[\\u4E00-\\u9FA5]+$/,
  // 小写
  lower: /^[a-z]+$/,
  // 大写
  upper: /^[A-Z]+$/,
  // HTML标记
  HTML: /<("[^"]*"|'[^']*'|[^'">])*>/,
  symbol: /^[^`~!@#$%^&*.<>￥，。《》?？【】、·~；’：”;']+$/
};

export { COUNT_MAP_LIST, COUNT_MAP, CHECK_REG_MAP, CONTAINS_REG_CHECK_MAP };
