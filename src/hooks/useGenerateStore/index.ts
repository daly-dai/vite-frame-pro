import { PersistStore } from '@/types/storage';
import { assign, isObject } from 'lodash-es';
import { proxy, useSnapshot, subscribe } from 'valtio';

import { storePersist } from './store-persist';
export type _Method = (...args: any[]) => any;

type Actions = { [key: string]: _Method };
interface storeParams<T> {
  state: T;
  actions?: Actions;
  persist?: PersistStore;
}

function generateActions<T>(state: T, actions: Actions) {
  const result: any = {};

  Object.keys(actions).forEach((key: string) => {
    result[key] = (...args: any[]) => {
      return (actions[key] as any)(...args, state);
    };
  });

  return result;
}

function generatePersist<T extends object>(
  state: T,
  persist: PersistStore
): void {
  storePersist(state, persist);
  // 订阅状态变化
  // todo 局部更新存储数据
  subscribe(state, () => {
    storePersist(state, persist);
  });
}

function generateStore<T extends object>({
  state,
  actions,
  persist = null
}: storeParams<T>) {
  if (!isObject(state)) {
    throw new Error('state object required');
  }

  if (!isObject(actions)) {
    throw new Error('actions object required');
  }

  let _actions: any;

  const result: T = proxy({ ...(state as object) }) as T;

  // 处理函数
  if (actions) {
    _actions = generateActions<T>(result, actions);
  }

  // 处理缓存
  if (persist) {
    generatePersist<T>(result, persist);
  }

  return () => {
    const resultStore = useSnapshot(result);
    console.log(111212121);

    return assign({}, resultStore, _actions);
  };
}

export default generateStore;
