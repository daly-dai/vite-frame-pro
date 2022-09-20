import { get } from '@/request/request';

// 用户登录表单
export interface TestParams {
  username: string;
  password: string;
}

export interface TestResData {
  token: string;
}

export const getTest: any = (params: TestParams) => {
  return get('/api/community/getCommunity', params);
};
