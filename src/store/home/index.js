import { reqCategoryList, reqBannerList, reqFloorList } from "@/api"
const homeOption = {
    namespaced: true,
    actions: {
        async categoryList(context, value) {
            let result = await reqCategoryList()
            if (result.code == 200) {
                // console.log(result);
                context.commit('CATEGORYLIST', result.data)
            }

        },
        async getBannerList(context, value) {
            let result = await reqBannerList()
            if (result.code == 200) {
                context.commit('GETBANNERLIST', result.data)
                    // console.log(result);
            }

        },
        async getFloorList(context, value) {
            let result = await reqFloorList()
            if (result.code == 200) {
                context.commit('GETFLOORLIST', result.data)
                    // console.log(result);
            }

        }
    },
    mutations: {
        CATEGORYLIST(state, value) {
            state.categoryList = value
        },
        GETBANNERLIST(state, value) {
            state.bannerList = value
        },
        GETFLOORLIST(state, value) {
            state.floorList = value
        }
    },
    state: { categoryList: [], bannerList: [], floorList: [] },
    getters: {}
}
export default homeOption