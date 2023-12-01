import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'

//二级路由

import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'
//引入仓库用于调用token
import store from '@/store'

//重写VueRouter原型对象的push/replace方法
//备份原方法
let originPush = VueRouter.prototype.push
    //参数：
    //location：路由跳转地址
    //resolve,reject:promise对象的成功与失败的回调函数
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}

let originReplace = VueRouter.prototype.replace
    //参数：
    //location：路由跳转地址
    //resolve,reject:promise对象的成功与失败的回调函数
VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace().call(this, location, () => {}, () => {})
    }
}

let router = new VueRouter({
    routes: [
        //重定向，指定项目运行后首先出现的页面
        {
            path: '*',
            redirect: '/home',
            component: Home,
            meta: { footerShow: true }
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            meta: { footerShow: true }
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/search/:keyword?',
            name: 'search',
            component: Search,
            props: (($route) => ({ keyword: $route.params.keyword, k: $route.query.k })),
            meta: { footerShow: true }
        }, {
            path: '/detail/:skuId?',
            name: 'detail',
            component: Detail,
            meta: { footerShow: true }
        }, {
            path: '/addcartsuccess',
            name: 'AddCartSuccess',
            component: AddCartSuccess,
            meta: { footerShow: true }
        },
        {
            path: '/shopcart',
            name: 'ShopCart',
            component: ShopCart,
            meta: { footerShow: true }
        }, {
            path: '/trade',
            name: 'Trade',
            component: Trade,
            meta: { footerShow: true },
            beforeEnter(to, from, next) { //路由独享
                if (from.path == '/shopcart') {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: '/pay',
            name: 'Pay',
            component: Pay,
            meta: { footerShow: true },
            beforeEnter(to, from, next) {
                if (from.path == '/trade') {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: '/paysuccess',
            name: 'PaySuccess',
            component: PaySuccess,
            meta: { footerShow: true }
        }, {
            path: '/center',
            name: 'Center',
            redirect: '/center/myOrder',
            component: Center,
            children: [{
                    path: 'myOrder',
                    name: 'myOrder',
                    component: myOrder,
                },
                {
                    path: 'grouporder',
                    name: 'groupOrder',
                    component: groupOrder
                }
            ],
            meta: { footerShow: true }
        }

    ],
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 } //期望滚动到哪个的位置
    }
})

//设置路由守卫

//全局前置守卫:
router.beforeEach(async(to, from, next) => {
    let token = store.state.userInfoOption.token;
    let name = store.state.userInfoOption.userInfo.name;
    if (token) {
        console.log(token);
        console.log(name);

        // token过期 ==>无法获取到用户信息侧面说明token过期
        if (name) {
            //有用户名字说明token有效获取到了用户信息
            //注册过就不能直接在进入登录注册页面
            if (to.path == '/login' || to.path == '/register') {
                alert('请退出当前账户再继续！')
                next('/')
            } else {
                next();
            }
        } else {
            //登录了但没用户信息==> 第一次登录本地存储还没获取到数据
            await store.dispatch('userInfoOption/getUserInfo').then(res => {
                next();
            }).catch(async err => {
                //token过期  退出登录
                await store.dispatch('userInfoOption/userLogOut')
                next('/login');
            })
        }
    } else {
        //未登录的特殊路由不能访问
        //暂存当前想去但未登录不能去的路由
        let toPath = to.path;
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/center') != -1 || toPath.indexOf('pay') != -1) {
            //若未登录去往这些页面，则跳转到登录页面
            next('/login?redirect=' + toPath); //给登录页重定向 redirect=要去的页面=>此时登录后直接就可以跳转到刚刚想去的页面
        } else {
            next();
        }
    }
})

export default router