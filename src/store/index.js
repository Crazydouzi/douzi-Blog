import Vue from 'vue'
import Vuex from 'vuex'

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
    state: {
        //存放的键值对就是所要管理的状态
        drawer: true,
        viewMode: '游客',
        USER: {},
        PAGE: {},
        NAV: {},
        isLogin: false,
        articleType: {},
    },
    mutations: {
        func_saveArticleType(s, p) {
            for (let item in p) {
                s.articleType[p[item].article_type_id] = p[item].article_type_name
            }
        },
        func_saveUserInfo(s, p) {
            s.isLogin = true;
            s.USER = p.USER;
        },
        // 初始化User信息，当session有数据
        initUserInfo(s, p) {
            for (let item in p) {
                if (item.indexOf('user-') > -1) {
                    s.isLogin = true;
                    s.USER[item.replace('user-', '')] = p[item]

                }
            }
        },
        initPage(s, p) {
            for (let tag in p) {
                s[Object.keys(p[tag])[0]] = p[tag][Object.keys(p[tag])[0]]
                    // console.log(Object.keys(p[tag])[0], s[Object.keys(p[tag])[0]])
            }
        },
        navDrawer(s) {
            s.drawer = !s.drawer;
        },
        navView(s, p) {
            s.viewMode = p
        }
    },
    actions: {
        saveUserAsync(c, p) {
            var USER = Array;
            for (let item in p) {
                window.sessionStorage.setItem(`user-${item}`, p[item])
                USER[item] = p[item];
            }
            USER['authTime'] = new Date().getTime();
            c.commit('func_saveUserInfo', { USER });
        },
    }
})

export default store