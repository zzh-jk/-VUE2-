<template>
    <div class="pagination">
        <!-- 当前是第一页就禁用 否则当前页减一 -->
      <button :disabled="pageNo==1" @click="getPage(pageNo-1)">上一页</button>
      <button v-if=" continuity.start> 1" @click="getPage(1)">1</button>
      <button v-if=" continuity.start > 2">···</button>
  
      <button 
      v-for="(page,index) in continuity.end" :key="index" 
      v-if="page>=continuity.start"
      @click="getPage(page)"
      :class="{active:pageNo==page}"
      >{{page}}</button>
      
      <button v-if="continuity.end<totalPage-1">···</button>
      <button v-if="continuity.end<totalPage" @click="getPage(totalPage)">{{totalPage}}</button>
      <button :disabled="pageNo==totalPage" @click="getPage(pageNo+1)">下一页</button>
      <button style="margin-left: 20px">共{{ total }} 条</button>
    </div>
  </template>
  
  <script>
    export default {
      name: "Pagination",
      props:['pageNo','pageSize','total','continues'],
      computed:{
        totalPage(){
            //向上取整
            return Math.ceil(this.total/this.pageSize);
        },
        continuity(){
            let start=0 ,end = 0;
            //总页数小于连续页签导致end越界  
            if(this.continues>this.totalPage){
                start = 1;
                end = this.totalPage;
            }else{
                start =this.pageNo - parseInt(this.continues/2) ;
                end = this.pageNo + parseInt(this.continues/2) ;
            }
            //判断start与end的越界情况
            //start<1
            if(start<1){
                start = 1;
                end = this.continues;
            }
            //end>totalPage
            if(end>this.totalPage){
                end = this.totalPage
                start = this.totalPage - this.continues;
            }
            return {start,end}
        }
      },
      methods:{
        getPage(page){
          this.$emit('pageGetter',page);
          console.log(page);
        }
      }
    }
  </script>
  
  <style lang="less" scoped>
    .pagination {
        text-align: center;
      button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;    
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;
  
        &[disabled] {
          color: #c0c4cc;
          cursor: not-allowed;
        }
  
        &.active {
        /*  cursor: not-allowed;*/
          background-color: #409eff;
          color: #fff;
        }
      }
    }
  </style>
  