import axios from 'axios';

// import errorCode from '@/utils/errorCode'

(axios.defaults.headers as any)['Content-Type'] =
  'application/json;charset=utf-8';

// 创建axios实例

const errorCode: { [key: number | string]: string } = {
  400: '错误的请求',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '请求错误,未找到该资源',
  405: '请求方法未允许',
  408: '请求超时',
  500: '服务器端出错',
  501: '网络未实现',
  502: '网络错误',
  503: '服务不可用',
  504: '网络超时',
  505: 'http版本不支持该请求',
  default: '网络异常'
};

const service = axios.create({
  timeout: 10000
});
// request拦截器
service.interceptors.request.use(
  (config) => {
    // if (getToken() && !isToken) {
    //   config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // 未设置状态码则默认成功状态
    const code = res?.data?.code || 200;
    // 获取错误信息
    const msg = res?.data?.msg || errorCode[code] || errorCode['default'];
    // 二进制数据则直接返回
    if (
      res.request.responseType === 'blob' ||
      res.request.responseType === 'arraybuffer'
    ) {
      return res.data;
    }
    // 判断状态码
    if (code === 200) {
      return res?.data;
    }

    if (code === 401) {
      //跳转首页逻辑
      return Promise.reject(msg);
    }

    return Promise.reject(msg);
  },
  (error) => {
    let { message } = error;
    if (message == 'Network Error') {
      message = '后端接口连接异常';
    }

    if (message.includes('timeout')) {
      message = '系统接口请求超时';
    }

    if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常';
    }
    return Promise.reject(error);
  }
);

export default service;
