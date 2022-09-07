export const isFalsy = (value) => (value === 0 ? false : !value);

// 在一个函数里面， 改变传入对象本身是不好的
export const cleanObject = (object) => {
  const result = { ...object };

  Object.keys(result).forEach((key) => {
    const value = object[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });

  return result;
};
