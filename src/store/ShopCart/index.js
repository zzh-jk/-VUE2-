import { reqGetShopCartInfo, reqShopDelete, reqUpdateChecked } from '@/api'

const ShopCartOption = {
    namespaced: true,
    actions: {
        //所有信息
        async getShopCartInfo(context) {
            let result = await reqGetShopCartInfo();
            if (result.code === 200) {
                context.commit('GETSHOPCARTINFO', result.data);
                console.log(result.data);
            }
        },
        //删除某一个
        async deleteShopInfo(context, skuId) {
            let result = await reqShopDelete(skuId);
            if (result.code == 200) {
                return 'delete ok'
            } else {
                Promise.reject(new Error('delete fail!'))
            }
        },
        //更新选中状态
        async changeChecked(context, { skuId, isChecked }) {
            let result = await reqUpdateChecked(skuId, isChecked);
            if (result.code == 200) {
                return 'change ok'
            } else {
                Promise.reject(new Error('change fail!'))
            }
        },
        //删除选中的信息
        deleteALLChecked(context) {
            let PromiseAll = [];
            context.getters.cartInfo.cartInfoList.forEach(element => {
                let promise = element.isChecked == 1 ? context.dispatch('deleteShopInfo', element.skuId) : '';
                PromiseAll.push(promise);
            });
            //只要全部的p1|p2....都成功，返回结果即为成功
            //如果有一个失败，返回即为失败结果
            return Promise.all(PromiseAll);
        },
        changeALLChecked(context, isChecked) {
            let PromiseAll = [];
            context.getters.cartInfo.cartInfoList.forEach(element => {
                let promise = context.dispatch('changeChecked', { skuId: element.skuId, isChecked });
                PromiseAll.push(promise);
            });
            //只要全部的p1|p2....都成功，返回结果即为成功
            //如果有一个失败，返回即为失败结果
            return Promise.all(PromiseAll);
        }
    },
    mutations: {
        GETSHOPCARTINFO(state, value) {
            state.cartList = value
        }
    },
    getters: {
        cartInfo(state) {
            return state.cartList[0] || [];
        }
    },
    state: {
        cartList: []
    }
}
export default ShopCartOption;