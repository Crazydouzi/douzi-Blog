import md5 from './md5'
import axios from 'axios'
// import {get } from 'core-js/core/dict';
//绑定域名
const API_BASE_URL = 'https://api.blog.douzi.site/1.1'
    //请求头
var API_BASE_HEADER = {
    'X-LC-Id': 'Ksbznav33FsKM20tu3IJq7Hn-gzGzoHsz',
    'X-lc-Sign': sign(),
    'Content-Type': 'application/json',
}

//计算验证KEY
function sign() {
    let t = new Date().getTime();
    let key = md5["\x68\x65\x78\x5f\x6d\x64\x35"](t + '\x62\x54\x48\x75\x62\x41\x79\x6a\x68\x78\x75\x6f\x65\x39\x4a\x71\x35\x36\x42\x4e\x74\x70\x71\x64');
    return `${key},${t}`;
}
//密码哈希
function pwdHash(pwd) {
    return `$p${md5["\x62\x36\x34\x5f\x6d\x64\x35"](md5["\x68\x65\x78\x5f\x6d\x64\x35"]('\x28\x40\x3d\x2d\x3d\x5f\x40'+pwd+'\x29\x28\x30\x2e\x30\x3f\x40\x2e\x40\x21\x51\x57\x51\x7e\x7e') + "\x24\x28\x23\x2d\x3e\x6d\x6a\x70\x68\x76\x31\x3c\x3c\x40")}@`
}

const douziAPI = {
    // 登录
    async login(email, password) {
        return axios.post(`${API_BASE_URL}/login`, { email: email, password: pwdHash(password) }, { headers: API_BASE_HEADER })
    },
    //注册
    async register(email, password) {
        return axios.post(`${API_BASE_URL}/user`, { email: email, password: pwdHash(password) }, { headers: API_BASE_HEADER })
    },
    //根据session获取token
    async getMe(session) {
        API_BASE_HEADER['X-LC-Session'] = session
        return axios.get(`${API_BASE_URL}/users/me`, { headers: API_BASE_HEADER })
    },
    //获取导航栏管理员导航栏，首先判断是否登录
    async getNav(isLogin = false, view_mode = '游客') {
        let res = []
            //默认为游客模式，当手动切换游客模式切换为 “未登录”的视图
        if (view_mode == '游客') {
            isLogin = false
        }
        if (isLogin) {
            API_BASE_HEADER['X-LC-Session'] = window.sessionStorage.getItem("user-sessionToken")
                //根据是否登录获取导航栏
            await axios.get(`${API_BASE_URL}/classes/NavBar?where={"isLogin":${isLogin}}&order=index`, { headers: API_BASE_HEADER }).then(r => { res["NAV"] = r.data.results })
        }
        return res
    },
    //获取全部文章分类
    async getArticleType() {
        return axios.get(`${API_BASE_URL}/classes/ArticleType?order=article_type_id`, { headers: API_BASE_HEADER })
    },
    //修改分类
    async editArticleType(objectId, data) {
        API_BASE_HEADER['X-LC-Session'] = window.sessionStorage.getItem("user-sessionToken")
        return axios.put(`${API_BASE_URL}/classes/ArticleType/${objectId}`, data, { headers: API_BASE_HEADER })
    },
    //新建分类
    async createArticleType(data) {
        API_BASE_HEADER['X-LC-Session'] = window.sessionStorage.getItem("user-sessionToken")
        return axios.post(`${API_BASE_URL}/classes/ArticleType`, data, { headers: API_BASE_HEADER })

    },
    //删除分类
    async delArticleTypeById(objectId, typeid) {
        let objList = []
        await this.getArticleByTypeId(typeid).then(r => {
            for (let item in r.data.results) {
                objList.push(r.data.results[item].objectId)
            }
            //如果这个分类下有文章，将文章种类修改为：未分类
            if (objList.length != 0 || objList == undefined) {
                let data = {
                    "article_type_id": 0
                }
                for (let obj in objList) {
                    this.editArticle(objList[obj], data).then(r => {}).catch(r => { console.log(r) })
                }
            }
        }).then(
            r => {
                API_BASE_HEADER['X-LC-Session'] = window.sessionStorage.getItem("user-sessionToken");
                return axios.delete(`${API_BASE_URL}/classes/ArticleType/${objectId}`, { headers: API_BASE_HEADER })
            }
        )
    },
    //获取全部文章
    async getAllArticle() {
        return axios.get(`${API_BASE_URL}/classes/article?order=-createdAt`, { headers: API_BASE_HEADER })
    },

    //根据ID获取文章
    async getArticleById(objectId) {
        return axios.get(`${API_BASE_URL}/classes/article/${objectId}`, { headers: API_BASE_HEADER })
    },
    //根据分类ID获取文章
    async getArticleByTypeId(typeId) {
        return axios.get(`${API_BASE_URL}/classes/article?order=-createdAt&where={"article_type_id":${typeId}}`, { headers: API_BASE_HEADER })
    },
    //添加文章
    async addArticle(data) {
        API_BASE_HEADER['X-LC-Session'] = window.sessionStorage.getItem("user-sessionToken")
        return axios.post(`${API_BASE_URL}/classes/article`, data, { headers: API_BASE_HEADER })
            // console.log(title + "\n" + article)
    },
    //编辑文章
    async editArticle(objectId, data) {
        API_BASE_HEADER['X-LC-Session'] = window.sessionStorage.getItem("user-sessionToken")
        return axios.put(`${API_BASE_URL}/classes/article/${objectId}`, data, { headers: API_BASE_HEADER })
    },

    //删除文章
    async delArticleById(objectId) {
        API_BASE_HEADER['X-LC-Session'] = window.sessionStorage.getItem("user-sessionToken")
        return axios.delete(`${API_BASE_URL}/classes/article/${objectId}`, { headers: API_BASE_HEADER })
    },
    //初始化
    init: {
        async getPage() {
            let res = []
            await axios.get(`${API_BASE_URL}/classes/PageInit`, { headers: API_BASE_HEADER }).then(r => {
                res["PAGE"] = r.data.results;
            })
            return res
        },
    }
}
export default douziAPI