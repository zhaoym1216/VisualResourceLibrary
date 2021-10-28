import Vue from 'vue'
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router);


 const routes = [
    {
      path: "/",
      name: "Navigation",
      component: resolve => require(["@/components/navigation"], resolve),
      children: [
        {
          path: "", 
          redirect: "home"
        },
        {
          path: "home",
          name: "home",
          component: resolve =>
            require(["@/components/home/home"], resolve)
        },
        {
          path: "permission/:level/:id",
          name: "permission",
          component: resolve =>
            require(["@/components/permissionManager"], resolve)
        },
        {
          path: "newPersonalPage",
          name: "newPersonalPage",
          component: resolve =>
            require(["@/components/user/userPage/newPersonalPage"], resolve),
          children: [
            {
              path: "overView",
              name: "overView",
              component: resolve => require(["@/components/user/subPage/overView"], resolve),
            },
            //新的resource 页面，含文件夹结构
            {
              path: "resourceList",
              name: "resourceList",
              component: resolve => require(["@/components/user/subPage/resourceList"], resolve)
            },
            {
              path: "notification",
              name: "notification",
              component: resolve => require(["@/components/user/subPage/notification"], resolve)
            },
            {
              path: "tool",
              name: "tool",
              component: resolve => require(["@/components/user/subPage/tool"], resolve)
            },
            {
              path: "project",
              name: "project",
              component: resolve => require(["@/components/user/subPage/project"], resolve)
            },
            {
              path: "todoList",
              name: "todoList",
              component: resolve => require(["@/components/user/subPage/todoList"], resolve)
            },
            {
              path: "userInfo",
              name: "userInfo",
              component: resolve => require(["@/components/user/subPage/userInfo"], resolve)
            }
  
          ]
        },
        {
          path: "help",
          name: "Help",
          component: resolve =>
            require(["@/components/navigationContent/help"], resolve)
        },
        {
          path: "memberPage/:id",
          name: "MemberDetailPage",
          component: resolve =>
            require(["@/components/user/userPage/memberDetailPage"], resolve)
        },
        // { path: 'resourceList', name: 'resourceList', component: resolve => (require(["@/components/resources/resourceList"], resolve)) },
        {
          path: "publicResource",
          name: "PublicResource",
          component: resolve =>
            require(["@/components/resources/publicResourceList"], resolve)
        },
        {
          path: "login",
          name: "Login",
          component: resolve =>
            require(["@/components/user/userState/login"], resolve)
        },
        {
          path: "register",
          name: "Register",
          component: resolve =>
            require(["@/components/user/userState/register"], resolve)
        },
        {
          path: "resetPassword/:email",
          name: "resetPassword",
          component: resolve =>
            require(["@/components/user/userState/resetPwd"], resolve)
        },
        {
          path: "resourceCenter",
          name: "resourceCenter",
          component: resolve =>
            require(["@/components/resources/resourceCenter"], resolve)
        },
      ]
    },
  ];


export default new Router({
  routes,
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {x: 0, y: 0};
    }
  }
});