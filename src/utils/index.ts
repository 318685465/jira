import { useEffect, useState } from "react";

export const isFalsy = (value: unknown): boolean => {
  return value === 0 ? false : !value;
};

// 在一个函数里面， 改变传入对象本身是不好的
export const cleanObject = (object: object) => {
  const result = { ...object };

  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = object[key];
    if (isFalsy(value)) {
      //@ts-ignore
      delete result[key];
    }
  });

  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

// 后面用泛型解决
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
