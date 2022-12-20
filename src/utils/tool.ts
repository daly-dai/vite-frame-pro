export const formateTime = (fmt: string, time: any) => {
  const o: any = {
    'M+': time.getMonth() + 1, // 月份
    'd+': time.getDate(), // 日
    'h+': time.getHours(), // 小时
    'm+': time.getMinutes(), // 分
    's+': time.getSeconds(), // 秒
    'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
    S: time.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (time.getFullYear() + '').substr(4 - RegExp.$1.length)
    );

  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
  }

  return fmt;
};

export function frontTime(fmt: string, font = 0) {
  const fontHour = font * 60 * 60 * 1000;
  const currentTime = new Date(new Date().getTime() - fontHour);

  return formateTime(fmt, currentTime);
}

export function delayTime(fmt: string, delay = 0) {
  const delayTime = delay * 60 * 60 * 1000;
  const currentTime = new Date(new Date().getTime() + delayTime);

  return formateTime(fmt, currentTime);
}

export function uuid() {
  let d = new Date().getTime();
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now(); //use high-precision timer if available
  }

  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (d + Math.random() * 16) % 16 | 0; // d是随机种子
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}
