import { reqGetAddressList, reqGetOrderList } from '@/api'

const tradeOption = {
    namespaced: true,
    actions: {
        // 获取地址列表
        async getAddressList(context) {
            await reqGetAddressList().then((result) => {
                if (result.code == 200) {
                    console.log(result.data);
                    context.commit('GETADDRESSLIST', result.data);
                }
            }).catch((err) => {
                alert(err.message);
            });
        },
        //获取订单列表
        async getOrderList(context) {
            await reqGetOrderList().then((result) => {
                if (result.code == 200) {
                    console.log(result.data);
                    context.commit('GETORDERLIST', result.data);
                }
            }).catch((err) => {
                alert(err.message);
            });
        }
    },
    mutations: {
        GETADDRESSLIST(state, value) {
            state.addressList = value;
        },
        GETORDERLIST(state, value) {
            state.orderList = value;
        }
    },
    getters: {},
    state: {
        addressList: [],
        orderList: []
    }
}
export default tradeOption;