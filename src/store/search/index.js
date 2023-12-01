 import { reqSearchList } from '@/api'
 const searchOption = {
     namespaced: true,
     actions: {
         async getSearchList(context, params = {}) {
             let result = await reqSearchList(params);
             if (result.code == 200) {
                 context.commit('GETSEARCHLIST', result.data)
             }
             //  console.log(result.data);
         }
     },
     mutations: {
         GETSEARCHLIST(state, value) {
             state.searchList = value;
         }
     },
     state: { searchList: [] },
     //计算属性 主要用来简化代码
     getters: {
         goodsList(state) {
             return state.searchList.goodsList || [];
         },
         attrsList(state) {
             return state.searchList.attrsList || [];
         },
         trademarkList(state) {
             return state.searchList.trademarkList || [];
         },
     }
 }
 export default searchOption