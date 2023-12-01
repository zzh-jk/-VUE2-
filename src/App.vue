<template>
  <div id="app">
   <Header/>
   <router-view></router-view>
   <!-- 在Home、Search显示的,在登录、注册隐藏 -->
   <!--简略形式 -->
   <!-- <Footer V-show="$route.path=='/home'||$route.path=='/search'"></Footer> -->
   <!-- 更优方式：路由元信息 -->
   <Footer v-show="$route.meta.footerShow"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
 Header,
 Footer
  },
  mounted(){
     // this.$store.dispatch('空间名/action名')|
     this.$store.dispatch("homeOption/categoryList");
     this.$store.dispatch('homeOption/getBannerList')
  }
}
</script>

<style>

</style>
