import _ from "lodash";

export const keysToCamel = (o: any): any => {
  if (_.isArray(o)) {
    return o.map(v => keysToCamel(v));
  }

  else if (_.isObject(o) && !_.isDate(o) && !_.isRegExp(o)) {
    const mapped = _.mapKeys(o, (v, k) => _.camelCase(k));
    return _.mapValues(mapped, v => keysToCamel(v));
  }

  return o;
}
