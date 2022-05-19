import {createRouter, createWebHistory} from "vue-router";
import AppLayout from "../components/AppLayout.vue";
import AuthLayout from "../components/AuthLayout.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import Bookmarks from "../views/Bookmarks.vue";
import NotFound from "../views/NotFound.vue";
import BookmarksView from "../views/BookmarksView.vue";
import Categories from "../views/Categories.vue";
import CategoryView from "../views/CategoryView.vue";
import Notifications from "../views/Notifications.vue";

import store from "../store";

const routes = [
  {
    path: '/',
    redirect: '/app',
    component: AppLayout,
    meta: {requiresAuth: true},
    children: [
      {path: '/app', name: 'Dashboard', component: Dashboard},
      {path: '/bookmarks', name: 'Bookmarks', component: Bookmarks},
      {path: '/bookmarks/create', name: 'BookmarkCreate', component: BookmarksView},
      {path: '/bookmarks/:id', name: 'BookmarkView', component: BookmarksView},

      {path: '/categories', name: 'Categories', component: Categories},
      {path: '/category/create', name: 'CategoryCreate', component: CategoryView},
      {path: '/category/:id', name: 'CategoryView', component: CategoryView},

      {path: '/notifications', name: 'Notifications', component: Notifications},
    ]
  },
  {
    path: '/auth',
    redirect: './login',
    name: 'Auth',
    component: AuthLayout,
    meta: {isGuest: true},
    children: [
      {path: '/login', name: 'Login', component: Login},
      {path: '/register', name: 'Register', component: Register},
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: "Login" });
  } else if (store.state.user.token && to.meta.isGuest) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;
