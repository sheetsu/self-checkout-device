import _ from "lodash";

export const keysToSnake = (x: any): any => {
  if (Array.isArray(x)) return x.map(keysToSnake);
  if (_.isPlainObject(x)) {
    const renamed = _.mapKeys(x, (_v, k) => _.snakeCase(k));
    return _.mapValues(renamed, keysToSnake);
  }

  return x;
};
