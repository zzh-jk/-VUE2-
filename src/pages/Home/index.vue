<template>
  <div>
    <!-- 三级联动组件全局注册，无需引入 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
   <Floor v-for="(floor,index)  in floorList" :key=" floor.id" :list=floor />
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import { mapState } from 'vuex'
export default {
name:'home',
components:{
  ListContainer,Recommend,Rank,Like,Floor
},
methods:{
  async getUserInfo(){
    await this.$store.dispatch('userInfoOption/getUserInfo');
  }
  },
  mounted(){
    this.$store.dispatch('homeOption/getFloorList');
     this.getUserInfo()
  },
computed:{
  ...mapState('homeOption',['floorList']),
  ...mapState('userInfoOption',['userInfo'])
 }
}
</script>
 
<style>

</style>
