import { isArray, get, set } from 'lodash-es';
import { Persist, PersistStore, StrObj } from '@/types/storage';

interface Params {
  key: string;
  path: string;
  storage: Storage;
  value: any;
}

function storePersist<T extends object>(state: T, persist: PersistStore): void {
  if (!persist) return;

  const persistArr = isArray(persist) ? persist : [persist];

  persistArr.forEach((persistItem: Persist) => {
    if (!persistItem?.key) return;

    const persistKey = persistItem?.key;
    const storage = persistItem?.storage || localStorage;
    const paths = persistItem?.paths || [];

    // 没有paths或者isAll === true 缓存所有的state
    if (persistItem?.isAll) {
      storage.setItem(persistKey, JSON.stringify(state));
      return;
    }

    if (!paths || !paths?.length) {
      return;
    }

    if (paths?.length) {
      const _stateStash = paths.reduce((finalObj: StrObj, key) => {
        finalObj[key] = get(state, key, null);

        return finalObj;
      }, {});

      storage.setItem(persistKey, JSON.stringify(_stateStash));
    }
  });
}

function updateStoreDataByKey({
  key,
  path,
  storage,
  value = null
}: Params): void {
  const result: any = storage.getItem(key);

  set(result, path, value);

  updateStoreData(key, storage, value);
}

function updateStoreData(key: string, storage: Storage, value: any) {
  storage.setItem(key, JSON.stringify(value));
}

export { storePersist, updateStoreDataByKey, updateStoreData };
