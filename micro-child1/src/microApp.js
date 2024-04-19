import router from './router/index.js';
// import { getQueryObject } from '@/utils/url.js';

// 与基座进行数据交互
function handleMicroData() {
  const tabsStore = useTabsStore();
  const userStore = useUserStore();
  // 是否是微前端环境
  // eslint-disable-next-line no-underscore-dangle
  if (window.__MICRO_APP_ENVIRONMENT__) {
    // 主动获取基座下发的数据
    const microAppData = window.microApp.getData();
    console.log(`${getConfig('appCode')} getData`, microAppData, microAppData.projectCode);
    window.parentRouter = microAppData.router;
    window.parentGetSys = microAppData.getSys;
    window.parentUpdateCurrentTab = microAppData.updateCurrentTab;
    window.parentProjectCode = microAppData.projectCode;
    // setCookie({
    //   name: 'acToken',
    //   value: microAppData.wwwToken,
    //   aes: true
    // });
    // setCookie({
    //   name: 'username',
    //   value: microAppData.username,
    //   aes: true
    // });
    userStore.commitChangeUserInfo();

    // 监听基座下发的数据变化
    window.microApp.addDataListener(({ event, data }) => {
      console.log('window.microApp.addDataListener event: ', event);
      switch (event) {
        case 'routerPush':
          // console.log(getConfig('appCode') + "收：基座 routerPush", data);
          // 当基座下发path时进行跳转
          // eslint-disable-next-line no-case-declarations
          const pathArr = window.location.pathname.match(/\/shitai-.+/);
          // eslint-disable-next-line no-case-declarations
          const curRouterPath = (pathArr ? pathArr[0].replace(/\/$/, '') : '/').replace(/^\/shitai-[^/]+/, '');
          // console.log("当前路由：", curRouterPath);
          if (data.path && data.path !== curRouterPath) {
            // console.log("路由跳转", data.path, window.parentGetSys());
            if (window.parentGetSys && window.parentGetSys().includes(`shitai-${getConfig('appCode')}`)) {
              router.push(data.path);
            } else {
              window.parentRouter.push(`/shitai-${getConfig('appCode')}${data.path}`);
            }
          }
          break;
        case 'deleteCacheTabs':
          console.log(`${getConfig('appCode')}收：基座 deleteCacheTabs`, data);
          tabsStore.removeCachesTabs(data);
          break;
        default:
          console.log(`${getConfig('appCode')}收：基座下发数据改变`);
      }
    });

    // 监听缓存子应用重新渲染
    // eslint-disable-next-line func-names
    window.addEventListener('appstate-change', async function (e) {
      if (e.detail.appState === 'afterhidden') {
        // console.log('已卸载')
      } else if (e.detail.appState === 'beforeshow') {
        // console.log('即将重新渲染')
      } else if (e.detail.appState === 'aftershow') {
        const pathArr = window.location.pathname.match(/\/shitai-.+/);
        // eslint-disable-next-line no-case-declarations
        const curRouterPath = (pathArr ? pathArr[0].replace(/\/$/, '') : '/').replace(/^\/shitai-[^/]+/, '');
        const curRouter = router.currentRoute.value;
        const allPath = curRouterPath + window.location.search || '';
        console.log(decodeURIComponent(curRouter.fullPath), decodeURIComponent(allPath));
        if (curRouterPath === curRouter.fullPath || decodeURIComponent(allPath) === decodeURIComponent(curRouter.fullPath)) {
          if (curRouter.meta.keepAlive) {
            console.log('🚀 > file: main.js:170 > curRouter addCachesTabs', curRouter);
            await tabsStore.addCachesTabs({
              id: curRouter.name,
              name: curRouter.meta.title,
              path: curRouter.path,
              fullPath: curRouter.fullPath,
              ssCode: curRouter.meta.ssCode
            });
          }
          return;
        }
        // FIX: 2022年6月1日 liuyang
        // 修复bug
        // 其他子系统进入已经打开过得某个子系统的页面，就会丢失连接上的参数
        // eg: 主站打开CC  Apage  然后打开 WO  Bpage 然后回CC 某page  如果当前来个强提醒进入WO 工单详情 这里会丢失连接上参数
        // 在跳转的时候拼接参数
        router.replace(allPath);
      }
    });
  }
}

/**
 * 用于解决主应用和子应用都是vue-router4时相互冲突，导致点击浏览器返回按钮，路由错误的问题。
 * 相关issue：https://github.com/micro-zoe/micro-app/issues/155
 * 当前vue-router版本：4.0.12
 */
function fixBugForVueRouter4() {
  // const tabsStore = useTabsStore();
  // router.go = (...arg) => {
  //   let data = tabsStore.cachesTabs.find((v) => {
  //     return (
  //       v.fullPath === window.history.state.current ||
  //       `/shitai-${getConfig('appCode')}${v.fullPath}` === window.history.state.current ||
  //       decodeURIComponent(v.fullPath) === decodeURIComponent(window.history.state.current) ||
  //       decodeURIComponent(`/shitai-${getConfig('appCode')}${v.fullPath}`) === decodeURIComponent(window.history.state.current)
  //     );
  //   });
  //   console.log('fixBugForVueRouter4', data);
  //   if (arg[0] < 0 && getConfig('isChildSystem') && window.microApp) {
  //     window.microApp.dispatch({
  //       event: 'removeCachesTabs',
  //       data: { ...data, ssCode: getConfig('appCode'), isBack: true }
  //     });
  //   }
  // };
  // 判断主应用是 vue-router4，这里无需判断，因为主应用为 router4
  /**
   * 重要说明：
   * 1、这里主应用下发的基础路由为：`/main-xxx/app-vue3`，其中 `/main-xxx` 是主应用的基础路由，需要去掉，我们只取`/app-vue3`，不同项目根据实际情况调整
   *
   * 2、realBaseRoute 的值为 `/app-vue3`
   */
  // const realBaseRoute = window.__MICRO_APP_BASE_ROUTE__.replace(
  //   /^\/shitai-[^/]+/g,
  //   ""
  // );
  // 子应用的基础路由
  // eslint-disable-next-line no-underscore-dangle
  const realBaseRoute = window.__MICRO_APP_BASE_ROUTE__;

  router.beforeEach(() => {
    if (typeof window.history.state?.current === 'string') {
      window.history.state.current = window.history.state.current.replace(new RegExp(realBaseRoute, 'g'), '');
    }
  });

  router.afterEach(() => {
    if (typeof window.history.state === "object") {
      window.history.state.current =
        realBaseRoute + (window.history.state.current || "");
    }
  });
}

export const microAppInit = (app) => {
  // 判断应用是否在微前端环境中
  // eslint-disable-next-line no-underscore-dangle
  if (window.__MICRO_APP_ENVIRONMENT__) {
    // handleMicroData();

    fixBugForVueRouter4();

    window.addEventListener('unmount', () => {
      app.unmount();
      log(`${getConfig('appCode')} 微应用卸载`);
    });
  } 
  // else {
  //   rewriteRouterGo(router);
  // }
};

function rewriteRouterGo(r) {
  console.log('🚀 > file: main.js > line 272 > rewriteRouterGo > rewriteRouterGo');
  const tabsStore = useTabsStore();
  r.go = (...arg) => {
    if (arg[0] < 0) {
      const data = tabsStore.cachesTabs.find((v) => {
        return v.fullPath === window.history.state.current;
      });
      tabsStore.removeCachesTabs(data);
      const params = getQueryObject(data.fullPath);
      console.log('🚀 > file: main.js > line 279 > rewriteRouterGo > params', params);
      router.push(decodeURIComponent(params.from));
    }
  };
}
