import Vue from "vue";
import Vuex from 'vuex'
import homeOption from './home'
import searchOption from "./search";
import detailOption from "./detail";
import ShopCartOption from "./ShopCart";
import userInfoOption from "./userInfo";
import tradeOption from "./trade";

Vue.use(Vuex)
export default new Vuex.Store({
    modules: { homeOption, searchOption, detailOption, ShopCartOption, userInfoOption, tradeOption }
})