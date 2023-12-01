//引入请求api
import { reqGetPassport, reqUserRegister, reqUserLogin, reqGetUserInfo, reqUserLogOut } from "@/api"
//引入token操作
import { getToken, setToken, clearLocalStorageToken } from "@/utils/token";
const userInfoOption = {
    namespaced: true,
    actions: {
        //获取验证码
        async getPassport(context, phone) {
            let result = await reqGetPassport(phone);
            if (result.code == 200) {
                context.commit('GETPASSPORT', result.data)
                return 'ok';
            } else {
                return Promise.reject(new Error('获取验证码失败！'));
            }
        },
        //注册
        async userRegister(context, data) {
            console.log(data);
            let result = await reqUserRegister(data);
            console.log(result);
            if (result.code == 200) {
                console.log(result);
                return 'ok';
            } else {
                return Promise.reject(new Error(result.message));
            }
        },
        //登录
        async userLogin(context, data) {
            let result = await reqUserLogin(data);
            if (result.code == 200) {
                console.log(result);
                setToken(result.data.token);
                context.commit('USERLOGIN', result.data.token)
                return 'ok';
            } else {
                return Promise.reject(new Error(result.message));
            }
        },
        //获取用户数据
        async getUserInfo(context) {
            let result = await reqGetUserInfo();
            if (result.code == 200) {
                context.commit('GETUSERINFO', result.data)
                return 'ok';
            }
        },
        //用户登出
        async userLogOut(context) {
            let result = await reqUserLogOut();
            if (result.code == 200) {
                context.commit('USERLOGOUT');
                return 'ok';
            } else {
                return Promise.reject(new Error(result.message));
            }
        }
    },
    mutations: {
        GETPASSPORT(state, value) {
            state.passport = value;
        },
        USERLOGIN(state, value) {
            state.token = value;
        },
        GETUSERINFO(state, value) {
            state.userInfo = value;
        },
        USERLOGOUT(state) {
            state.token = '';
            state.userInfo = {};
            clearLocalStorageToken();
        }
    },
    state: {
        passport: '',
        token: getToken(),
        userInfo: {}
    },
    getters: {}
}
export default userInfoOption