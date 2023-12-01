//接口统一管理
import requests from "./requests"
import mockRequest from "./mockRequest"
//首页home信息列表请求
export const reqCategoryList = () => {
        return requests({
            url: '/api/product/getBaseCategoryList',
            method: 'get'
        })
    }
    //mock请求
export const reqBannerList = () => {
    return mockRequest({
        url: '/banner',
        method: 'get'
    })
}
export const reqFloorList = () => {
    return mockRequest({
        url: '/floor',
        method: 'get'
    })
}

//Search请求
export const reqSearchList = (params) => {
        return requests({
            url: 'api/list',
            method: 'post',
            data: params
        })
    }
    //Detail请求
export const reqGetDetailInfo = (skuId) => {
    return requests({
        url: `/api/item/${skuId}`,
        method: 'get'
    })
}

//添加购物车请求
export const reqGetShopInfo = (skuId, skuNum) => {
    return requests({
        url: `/api/cart/addToCart/${skuId}/${skuNum}`,
        method: 'post'
    })
}


//购物车信息请求
export const reqGetShopCartInfo = () => {
    return requests({
        url: '/api/cart/cartList',
        method: 'get'
    })
}

//购物车删除请求
export const reqShopDelete = (skuId) => {
    return requests({
        url: `/api/cart/deleteCart/${skuId}`,
        method: 'delete'
    })
}

//修改购物车选中信息请求
export const reqUpdateChecked = (skuId, isChecked) => {
    return requests({
        url: `/api/cart/checkCart/${skuId}/${isChecked}`,
        method: 'get'
    })
}

//获取验证码
// /api/user/passport/sendCode/{phone}
export const reqGetPassport = (phone) => {
        return requests({
            url: `/api/user/passport/sendCode/${phone}`,
            method: 'get'
        })
    }
    //用户注册
export const reqUserRegister = (data) => {
        return requests({
            url: '/api/user/passport/register',
            data,
            method: 'POST'
        })
    }
    // /api/user/passport/login
    //用户登录并给token
export const reqUserLogin = (data) => {
        return requests({
            url: '/api/user/passport/login',
            data,
            method: 'POST'
        })
    }
    //根据token拿用户信息
    // /api/user/passport/auth/getUserInfo
export const reqGetUserInfo = () => {
        return requests({
            url: '/api/user/passport/auth/getUserInfo',
            method: 'get'
        })
    }
    // /api/user/passport/logout
    //退出登录并清除token
export const reqUserLogOut = () => {
        return requests({
            url: '/api/user/passport/logout',
            method: 'get'
        })
    }
    //获取个人地址信息
export const reqGetAddressList = () => {
        return requests({
            url: '/api/user/userAddress/auth/findUserAddressList',
            method: 'get'
        })
    }
    //获取订单信息
export const reqGetOrderList = () => {
    return requests({
        url: '/api/order/auth/trade',
        method: 'get'
    })
}

//提交订单
// /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo, data) => {
        return requests({
            url: `/api/order/auth/submitOrder?tradeNo=${tradeNo}`,
            data,
            method: 'post'
        })
    }
    //获取订单支付信息
    // /api/payment/weixin/createNative/{orderId}
export const reqCreateNative = (orderId) => {
        return requests({
            url: `/api/payment/weixin/createNative/${orderId}`,
            method: 'get'
        })
    }
    //查询订单支付状态
    // /api/payment/weixin/queryPayStatus/{orderId}
export const reqQueryPayStatus = (orderId) => {
        return requests({
            url: `/api/payment/weixin/queryPayStatus/${orderId}`,
            method: 'get'
        })
    }
    //获取我的订单列表
    // /api/order/auth/{page}/{limit}
export const reqMyOrderList = (page, limit) => {
    return requests({
        url: `/api/order/auth/${page}/${limit}`,
        method: 'get'
    })
}