import Vue from 'vue'
import VueRouter from 'vue-router'
import View from '@/views/View.vue'
// console.log(process.env.NODE_ENV)

Vue.use(VueRouter)

const routes = [{
            path: '/',
            component: View,
            children: [{
                    path: '/',
                    name: 'Home',
                    component: () =>
                        import ('@/views/Home.vue'),
                },
                {
                    path: 'about',
                    name: 'About',
                    component: () =>
                        import ('@/views/About.vue'),
                },
                {
                    path: 'blog',
                    component: () =>
                        import ('@/views/Blog.vue'),
                    children: [{
                            path: '/',
                            name: 'Blog',
                            props: { default: true, sidebar: false },
                            component: () =>
                                import ('@/views/article/ArticleList.vue'),
                        },
                        {
                            path: 'p/:data',
                            name: 'Article',
                            component: () =>
                                import ('@/views/article/Article.vue'),
                        }
                    ]
                }
            ]
        }, {
            path: '/admin/',
            component: View,
            redirect: '/admin/dashboard',
            //to 目标路由名 from离开地址，即当前路由名
            beforeEnter: (to, from, next) => {
                if (to.name !== 'Login' && !sessionStorage.getItem('user-sessionToken')) next({ name: 'Login' })
                else next()
            },
            children: [{
                    path: 'setting',
                    name: 'Setting',
                    component: () =>
                        import ('@/views/admin/Setting.vue')
                }, {
                    path: 'dashboard',
                    name: 'Dashboard',
                    component: () =>
                        import ('@/views/admin/Dashboard.vue')
                },
                {
                    path: 'blog',
                    name: 'BlogEdit',
                    component: () =>
                        import ('@/views/admin/BlogEdit.vue')
                },
                {
                    path: 'article',
                    name: 'ArticleType',
                    component: () =>
                        import ('@/views/admin/ArticleType.vue')
                }
            ]
        }, {
            path: '/account/login',
            name: 'Login',
            component: () =>
                import ('@/views/account/login.vue')
        },
        {
            path: '*',
            redirect: '/',
            component: () =>
                import ('@/views/Home.vue'),

        },
        // {
        //     path: '/cloudstorage/:data',
        //     name: 'CloudStorage',
        //     // component: () =>
        //     //     import ('@/views/CloudStorage.vue'),
        //     //访问云盘控制台需要先登录 (虽然可以直接访问)
        //     beforeEnter: (to, from, next) => {
        //         if (to.params.data == 'http://pan.makjust.com/?/login' && !sessionStorage.getItem('user-sessionToken')) next({ name: 'Login' })
        //             // else window.location.href = to.params.data
        //         else window.open(to.params.data)
        //     }
        // },
        //仅用于第一次注册用
        // {
        //     path: '/account/reg',
        //     name: 'Register',
        //     component: () =>
        //         import ('@/views/account/register.vue')
        // }
    ]
    //解决重复导致的导航冗余
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    linkExactActiveClass: 'active',
    routes
})

export default router