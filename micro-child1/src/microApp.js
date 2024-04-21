import router from "./router/index.js";
const appName = "micro-child1";

// 与基座进行数据交互
function handleMicroData() {
  // 是否是微前端环境
  // eslint-disable-next-line no-underscore-dangle
  if (window.__MICRO_APP_ENVIRONMENT__) {
    // 主动获取基座下发的数据
    const microAppData = window.microApp.getData();
    window.parentRouter = microAppData.router;
    window.parentGetSys = microAppData.getSys;

    // 监听基座下发的路由变化
    window.microApp.addDataListener(({ event, data }) => {
      console.log(`子应用 ${appName} addDataListener event: `, event);
      switch (event) {
        case "routerPush":
          console.log(`${appName}收：基座 routerPush`, data);
          // 当基座下发path时进行跳转
          const pathArr = window.location.pathname.match(/\/micro-.+/);
          const curRouterPath = (
            pathArr ? pathArr[0].replace(/\/$/, "") : "/"
          ).replace(/^\/micro-[^/]+/, "");
          if (data.path && data.path !== curRouterPath) {
            if (
              window.parentGetSys &&
              window.parentGetSys().includes(`${appName}`)
            ) {
              router.push(data.path);
            } else {
              window.parentRouter.push(`/${appName}${data.path}`);
            }
          }
          break;
        default:
          console.log(`${appName}收：基座下发数据改变`);
      }
    });

    // 监听缓存子应用重新渲染
    // eslint-disable-next-line func-names
    // window.addEventListener('appstate-change', async function (e) {
    //   if (e.detail.appState === 'afterhidden') {
    //     // console.log('已卸载')
    //   } else if (e.detail.appState === 'beforeshow') {
    //     // console.log('即将重新渲染')
    //   } else if (e.detail.appState === 'aftershow') {
    //     const pathArr = window.location.pathname.match(/\/micro-.+/);
    //     // eslint-disable-next-line no-case-declarations
    //     const curRouterPath = (pathArr ? pathArr[0].replace(/\/$/, '') : '/').replace(/^\/micro-[^/]+/, '');
    //     const curRouter = router.currentRoute.value;
    //     const allPath = curRouterPath + window.location.search || '';
    //     console.log(decodeURIComponent(curRouter.fullPath), decodeURIComponent(allPath));
    //     if (curRouterPath === curRouter.fullPath || decodeURIComponent(allPath) === decodeURIComponent(curRouter.fullPath)) {
    //       if (curRouter.meta.keepAlive) {
    //         console.log('🚀 > file: main.js:170 > curRouter addCachesTabs', curRouter);
    //         await tabsStore.addCachesTabs({
    //           id: curRouter.name,
    //           name: curRouter.meta.title,
    //           path: curRouter.path,
    //           fullPath: curRouter.fullPath,
    //           ssCode: curRouter.meta.ssCode
    //         });
    //       }
    //       return;
    //     }
    //     router.replace(allPath);
    //   }
    // });
  }
}

/**
 * 用于解决主应用和子应用都是vue-router4时相互冲突，导致点击浏览器返回按钮，路由错误的问题。
 * 相关issue：https://github.com/micro-zoe/micro-app/issues/155
 * 当前vue-router版本：4.0.12
 */
function fixBugForVueRouter4() {
  // 子应用的基础路由
  // eslint-disable-next-line no-underscore-dangle
  const baseRoute = window.__MICRO_APP_BASE_ROUTE__;

  router.beforeEach(() => {
    if (typeof window.history.state?.current === "string") {
      window.history.state.current = window.history.state.current.replace(
        new RegExp(baseRoute, "g"),
        ""
      );
    }
  });

  router.afterEach(() => {
    if (typeof window.history.state === "object") {
      window.history.state.current =
        baseRoute + (window.history.state.current || "");
    }
  });
}

export const microAppInit = (app) => {
  // 判断应用是否在微前端环境中
  // eslint-disable-next-line no-underscore-dangle
  if (window.__MICRO_APP_ENVIRONMENT__) {
    handleMicroData();

    // fixBugForVueRouter4();

    window.addEventListener("unmount", () => {
      app.unmount();
      console.log(`child1 微应用卸载`);
    });
  }
};
