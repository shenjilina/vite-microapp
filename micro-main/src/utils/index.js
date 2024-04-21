
export const isObject = (val) => val !== null && is(val, 'Object');
// params参数拼接
export function parseParams(uri, params) {
  const paramsArray = [];
  Object.keys(params).forEach(
    (key) => params[key] && paramsArray.push(`${key}=${params[key]}`)
  );
  if (uri.search(/\?/) === -1) {
    uri += `?${paramsArray.join("&")}`;
  } else {
    uri += `&${paramsArray.join("&")}`;
  }
  return uri;
}