export const Util = {
  pick: (object: any, keys: any): any => {
    return keys.reduce((obj: any, key: number) => {
      if (object && Object.prototype.hasOwnProperty.call(object, key)) {
        // eslint-disable-next-line no-param-reassign
        obj[key] = object[key];
      }
      return obj;
    }, {});
  },
};
