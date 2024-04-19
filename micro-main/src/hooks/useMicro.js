import microApp, { getActiveApps } from "@micro-zoe/micro-app";
import router from "@/router/index.js";
// params参数拼接
function parseParams(uri, params) {
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
export function routerPush(indexPath, params) {
  if (params && isObject(params)) indexPath = parseParams(indexPath, params);
  // 子应用名
  const appName = indexPath.replace("/", "").split("/")[0];
  /**
   * 当子应用还未渲染，通过基座控制路由跳转，子应用在初始化时会自己根据url渲染对应的页面
   * 当子应用已经渲染，则直接控制子应用进行内部跳转
   *
   * getActiveApps: 获取正在运行的子应用
   */
  if (!getActiveApps().includes(appName)) {
    // 主应用跳转
    console.log("主应用跳转", `将跳往 ${appName} 系统 ${indexPath} 页面`);
    if (indexPath === '/micro-child1/:page*') {
      router.push('/micro-child1/page1');
    } else {
      router.push(indexPath);
    }
  } else {
    let childPath = null;
    // path的值形式如：/micro-child1/page1，这里/micro-child1是子应用的基础路由，/page1才是页面地址，所以我们需要将/micro-child1部分删除
    childPath = indexPath.replace(/^\/micro-[^/]+/, "");
    !childPath && (childPath = "/"); // 防止地址为空
    // 主应用通过下发data数据控制子应用跳转
    console.log(`主应用控制跳转`, `将跳往 ${appName} 系统 ${childPath} 页面`);
    microApp.setData(appName, {
      event: "routerPush",
      data: { path: childPath },
    });
  }
  // 触发全局事件监听（用于sidebar菜单校准）
  microApp.setGlobalData({ name: appName, path: indexPath });
}
export default function useMicro() {}
