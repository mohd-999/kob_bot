import { createRouter, createWebHistory } from 'vue-router'
import HomeIndexView from '../views/home/HomeIndexView.vue'
import PkIndexView from '../views/pk/PkIndexView.vue'
import RecordIndexView from '../views/record/RecordIndexView.vue'
import RecordContentView from '../views/record/RecordContentView.vue'
import RanklistIndexView from '../views/ranklist/RanklistIndexView.vue'
import UserCenterNameIndexView from '../views/user/center/UserCenterNameIndexView.vue'
import UserCenterPasswordIndexView from '../views/user/center/UserCenterPasswordIndexView.vue'
import UserBotIndexView from '../views/user/bot/UserBotIndexView.vue'
import NotFound from '../views/error/NotFound.vue'
import UserAccountLoginView from '../views/user/account/UserAccountLoginView.vue'
import UserAccountRegisterView from '../views/user/account/UserAccountRegisterView.vue'
import store from '../store/index'

// 前端路由
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeIndexView,
    // redirect: "/pk/",
    meta: {
      requestAuth: true,
    }
  },
  {
    path: "/pk/",
    name: "pk_index",
    component: PkIndexView,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: "/record/",
    name: "record_index",
    component: RecordIndexView,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: "/record/:recordId/",
    name: "record_content",
    component: RecordContentView,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: "/ranklist/",
    name: "ranklist_index",
    component: RanklistIndexView,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: "/user/bot/",
    name: "user_bot_index",
    component: UserBotIndexView,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: "/user/center/name/",
    name: "user_center_name_index",
    component: UserCenterNameIndexView,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: "/user/center/password/",
    name: "user_center_password_index",
    component: UserCenterPasswordIndexView,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: "/user/account/login/",
    name: "user_account_login",
    component: UserAccountLoginView,
    meta: {
      requestAuth: false,
    }
  },
  {
    path: "/user/account/register/",
    name: "user_account_register",
    component: UserAccountRegisterView,
    meta: {
      requestAuth: false,
    }
  },
  {
    path: "/404/",
    name: "404",
    component: NotFound,
    meta: {
      requestAuth: false,
    }
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404/",
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const jwt_token = localStorage.getItem('jwt_token');
  if(jwt_token) {
    store.commit('updateToken',jwt_token);
    store.dispatch('getinfo',{
      success(){
        next();
        store.commit("updatePullingInfo", false);
      },
      error(){
        store.dispatch('logout');
        alert("token无效, 请重新登录！");
        next({name:"user_account_login"});
        store.commit("updatePullingInfo", false);
      }
    })
  } else {
    if(to.meta.requestAuth && !store.state.user.is_login) {
      next({name: "user_account_login"});
    } else {
      next();
      store.commit("updatePullingInfo", false);
    }
  }
})

export default router
