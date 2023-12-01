import { reqGetDetailInfo, reqGetShopInfo } from '@/api'
import { getUuid } from '@/utils/uuid';
const detailOption = {
    namespaced: true,
    actions: {
        async DetailInfo(context, skuId) {
            let result = await reqGetDetailInfo(skuId);
            if (result.code == 200) {
                context.commit('DETAILINFO', result.data)
            }
            console.log(result.data);
        },
        async addOrUpdateShopInfo(context, { skuId, skuNum }) {
            let result = await reqGetShopInfo(skuId, skuNum)
            console.log(result);
            // context
        }
    },
    mutations: {
        DETAILINFO(state, value) {
            state.goodsInfo = value;
        }
    },
    state: {
        goodsInfo: [],
        uuid_Token: getUuid() //游客身份ID
    },
    //计算属性 主要用来简化代码
    getters: {
        categoryView(state) {
            return state.goodsInfo.categoryView || {};
        },
        skuInfo(state) {
            return state.goodsInfo.skuInfo || {};
        }
    }
}
export default detailOption