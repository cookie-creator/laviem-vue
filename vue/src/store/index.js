import {createStore} from "vuex";
import axiosClient from "../axios";

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem("TOKEN"),
        },

        bookmarks: {
          loading: false,
          links: [],
          data: []
        },
        currentBookmark: {
          data: {},
          loading: false,
        },

        categories: {
          loading: false,
          links: [],
          data: []
        },
        currentCategory: {
          data: {},
          loading: false,
        },

        notifications: {
          loading: false,
          links: [],
          data: []
        }
    },
    getters: {},
    actions: {
      register({commit}, user) {
        return axiosClient.post('/register', user)
          .then(({data}) => {
            commit('setUser', data.user);
            commit('setToken', data.token)
            return data;
          })
      },
      login({commit}, user) {
        return axiosClient.post('/login', user)
          .then(({data}) => {
            commit('setUser', data.user);
            commit('setToken', data.token)
            return data;
          })
      },
      logout({commit}) {
        return axiosClient.post('/logout')
          .then(response => {
            commit('logout')
            return response;
          })
      },


      /* User */
      getUser({commit}) {
        return axiosClient.get('/user')
          .then(res => {
            commit('setUser', res.data)
          })
      },


      /* Bookmarks */
      getBookmarks({ commit }, {url = null} = {})
      {
        commit('setBookmarksLoading', true)
        url = url || "/bookmarks";
        return axiosClient.get(url).then((res) => {
          commit('setBookmarksLoading', false)
          commit("setBookmarks", res.data);
          return res;
        });
      },
      getBookmark({ commit }, id) {
        commit("setCurrentBookmarkLoading", true);
        return axiosClient
          .get(`/bookmarks/${id}`)
          .then((res) => {
            commit("setCurrentBookmark", res.data);
            commit("setCurrentBookmarkLoading", false);
            return res;
          })
          .catch((err) => {
            commit("setCurrentBookmarkLoading", false);
            throw err;
          });
      },
      saveBookmark({ commit, dispatch }, bookmark)
      {
        let response;
        if (bookmark.id) {
          response = axiosClient
            .put(`/bookmarks/${bookmark.id}`, bookmark)
            .then((res) => {
              commit('setCurrentBookmark', res.data)
              return res;
            });
        } else {
          response = axiosClient.post("/bookmarks", bookmark).then((res) => {
            commit('setCurrentBoookmark', res.data)
            return res;
          });
        }

        return response;
      },
      deleteBookmark({ dispatch }, id)
      {
        return axiosClient.delete(`/bookmarks/${id}`).then((res) => {
          dispatch('getBookmarks')
          return res;
        });
      },


      /* Categories */
      getCategories({ commit }, {url = null} = {})
      {
        commit('setCategoriesLoading', true)
        url = url || "/categories";
        return axiosClient.get(url).then((res) => {
          commit('setCategoriesLoading', false)
          commit("setCategories", res.data);
          return res;
        });
      },
      getCategory({ commit }, id) {
        commit("setCurrentCategoryLoading", true);
        return axiosClient
          .get(`/categories/${id}`)
          .then((res) => {
            commit("setCurrentCategory", res.data);
            commit("setCurrentCategoryLoading", false);
            return res;
          })
          .catch((err) => {
            commit("setCurrentCategoryLoading", false);
            throw err;
          });
      },
      saveCategory({ commit, dispatch }, category)
      {
        let response;
        if (category.id) {
          response = axiosClient
            .put(`/categories/${category.id}`, category)
            .then((res) => {
              commit('setCurrentCategory', res.data)
              return res;
            });
        } else {
          response = axiosClient.post("/categories", category).then((res) => {
            commit('setCurrentCategory', res.data)
            return res;
          });
        }

        return response;
      },
      deleteCategory({ dispatch }, id)
      {
        console.log(id);
        return axiosClient.delete(`/categories/${id}`).then((res) => {
          dispatch('getCategories')
          return res;
        });
      },


      /* Notifications */
      getNotifications({ commit }, {url = null} = {})
      {
        commit('setNotificationsLoading', true)
        url = url || "/notifications";
        return axiosClient.get(url).then((res) => {
          commit('setNotificationsLoading', false)
          commit("setNotifications", res.data);
          return res;
        });
      },

    },
    mutations: {
      logout: (state) => {
        state.user.token = null;
        state.user.data = {};
        sessionStorage.removeItem("TOKEN");
      },
      setUser: (state, user) => {
        state.user.data = user;
      },
      setToken: (state, token) => {
        state.user.token = token;
        sessionStorage.setItem('TOKEN', token);
      },
      dashboardLoading: (state, loading) => {
        state.dashboard.loading = loading;
      },
      setDashboardData: (state, data) => {
        state.dashboard.data = data
      },


      /* Bookmarks */
      setBookmarksLoading: (state, loading) => {
        state.bookmarks.loading = loading;
      },
      setBookmarks: (state, bookmarks) => {
        state.bookmarks.links = bookmarks.meta.links;
        state.bookmarks.data = bookmarks.data;
      },
      setCurrentBookmarkLoading: (state, loading) => {
        state.currentBookmark.loading = loading;
      },
      setCurrentBookmark: (state, bookmark) => {
        state.currentBookmark.data = bookmark.data;
      },


      /* Categories */
      setCategoriesLoading: (state, loading) => {
        state.categories.loading = loading;
      },
      setCategories: (state, categories) => {
        state.categories.links = categories.meta.links;
        state.categories.data = categories.data;
      },
      setCurrentCategoryLoading: (state, loading) => {
        state.currentCategory.loading = loading;
      },
      setCurrentCategory: (state, category) => {
        state.currentCategory.data = category.data;
      },


      /* Notifications */
      setNotificationsLoading: (state, loading) => {
        state.notifications.loading = loading;
      },
      setNotifications: (state, notifications) => {
        state.notifications.links = notifications.meta.links;
        state.notifications.data = notifications.data;
      },


      notify: (state, {message, type}) => {
        state.notification.show = true;
        state.notification.type = type;
        state.notification.message = message;
        setTimeout(() => {
          state.notification.show = false;
        }, 3000)
      },
    },
    modules: {}
})

export default store
