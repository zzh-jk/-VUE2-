<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类中的面包屑 -->
            <li class="with-x" v-if="this.searchParams.categoryName">
              {{ this.searchParams.categoryName
              }}<i @click="removeCategory">×</i>
            </li>
            <!-- 查询关键字的面包屑 -->
            <li class="with-x" v-if="this.searchParams.keyword">
              {{ this.searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 查询品牌的面包屑 -->
            <li class="with-x" v-if="this.searchParams.trademark">
              {{ this.searchParams.trademark.split(':')[1] }}<i @click="removeTrademark">×</i>
            </li>
            <!-- attr的面包屑 -->
            <li class="with-x" v-for="(attrValue,index) in this.searchParams.props" :key="index">
              {{ attrValue.split(':')[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector 
        @trademarkInfo="trademarkInfo" 
        @attrEvent="attrEvent"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder(flag='1')">
                  <a>综合<span v-show="isOne" class="iconfont" :class="{'icon-down':isDesc,'icon-up':isAsc}"></span></a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder(flag='2')">
                  <a>价格<span v-show="isTwo" class="iconfont" :class="{'icon-down':isDesc,'icon-up':isAsc}"></span></a>
                </li>
                <!-- <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li>
                  <a href="#">价格⬆</a>
                </li>
                <li>
                  <a href="#">价格⬇</a> 
                </li>-->
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good, index) in goodsList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg"/>
                  </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">{{
                      good.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="searchList.total" :continues="5" @pageGetter="pageGetter"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1 desc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: "",
      },
    };
  },
  methods: {
    getData() {
      this.$store.dispatch("searchOption/getSearchList", this.searchParams);
      console.log(this.searchParams);
    },
    //叉掉分类的面包屑，同时重新请求
    removeCategory() {
      this.searchParams.categoryName = "";
      //节约传输资源，因为默认这部分是可选值
      //带给服务器参数说明可有可无的: 如果属性值为空的字符串还是会把相应的字段带给服务器
      //但是你把相应的字段变为undefined，当前这个字段不会带给服务器
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();
      //关掉面包屑参数修改后还需要修改地址栏参数
      //技巧：直接跳转当前页。直接清空query参数
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params }); //若有params参数就保留
      } else {
        this.$router.push({ name: "search" });
      }
    },
    //叉掉搜索关键字的面包屑
    removeKeyword() {
      this.searchParams.keyword = "";
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query }); //若有params参数就保留
      } else {
        this.$router.push({ name: "search" });
      }
      this.getData();
      this.$bus.$emit("clear");
    },
    //叉掉品牌的面包屑
    removeTrademark(){
      this.searchParams.trademark=undefined;
      this.getData();
    },
    //子组件品牌自定义事件
    trademarkInfo(trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();
    },
    //子组件平台自定义事件
    attrEvent(attr,attrValue){
      // console.log(attr,attrValue);
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      if(this.searchParams.props.indexOf(props)==-1){ //数组查重
        this.searchParams.props.push(props);
      }
      this.getData();
    
    },
    removeAttr(index){
      //删除点击对应元素（面包屑）
      this.searchParams.props.splice(index,1);
      this.getData()
    },
    changeOrder(flag){
      console.log(flag);
      if(flag=='1'){
        this.searchParams.order = this.searchParams.order == '1 desc' ? '1 asc' : '1 desc';
      }
      if(flag=='2'){
        this.searchParams.order = this.searchParams.order == '2 desc' ? '2 asc' : '2 desc';
      }
      this.getData();
    },
    //自定义事件计算分页当前页
    pageGetter(page){
      this.searchParams.pageNo = page;
      this.getData();
    }

  },
  beforeMount() {
    //合并参数
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapState("searchOption",["searchList"]),
    ...mapGetters("searchOption", ["goodsList"]),
    ...mapGetters("searchOption", ["attrsList"]),
    ...mapGetters("searchOption", ["trademarkList"]),
    //计算是否是 1 
    isOne(){
      return this.searchParams.order.indexOf('1')!=-1;
    },
    //计算是否是 2
    isTwo(){
      return this.searchParams.order.indexOf('2')!=-1;
    },
    //计算是否是升序
    isAsc(){
      return this.searchParams.order.indexOf('asc')!=-1;
    },
    //计算是否是降序
    isDesc(){
      return this.searchParams.order.indexOf('desc')!=-1;
    }
  },
  //通过监视路由变化监听传参和重新请求
  watch: {
    $route(newValue, oldValue) {
      //先将冗余数据清空
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
      //重新配置参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: .625rem 0;

  .py-container {
    width: 75rem;
    margin: 0 auto;

    .bread {
      margin-bottom: .3125rem;
      overflow: hidden;

      .sui-breadcrumb {
        padding: .1875rem .9375rem;
        margin: 0;
        font-weight: 400;
        border-radius: .1875rem;
        float: left;

        li {
          display: inline-block;
          line-height: 1.125rem;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -0.3125rem;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: .3125rem 0 0;
        margin-bottom: 1.125rem;
        float: left;

        .with-x {
          font-size: .75rem;
          margin: 0 .3125rem .3125rem 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 .4375rem;
          height: 1.25rem;
          line-height: 1.25rem;
          border: .0625rem solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: .625rem;
            cursor: pointer;
            font: 400 .875rem tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: .3125rem;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 2.5rem;
          padding-right: 1.25rem;
          background: #fbfbfb;
          border: .0625rem solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 .0625rem .25rem rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 .625rem 0 0;

            li {
              float: left;
              line-height: 1.125rem;

              a {
                display: block;
                cursor: pointer;
                padding: .6875rem .9375rem;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 1.25rem 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: .625rem;
            line-height: 1.75rem;

            .list-wrap {
              .p-img {
                padding-left: .9375rem;
                width: 13.4375rem;
                height: 15.9375rem;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: .9375rem;
                font-size: 1.125rem;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -0.3125rem;
                  }
                }
              }

              .attr {
                padding-left: .9375rem;
                width: 85%;
                overflow: hidden;
                margin-bottom: .5rem;
                min-height: 2.375rem;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: .9375rem;
                height: 1.375rem;
                font-size: .8125rem;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: .75rem .9375rem;

                .sui-btn {
                  display: inline-block;
                  padding: .125rem .875rem;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: .75rem;
                  line-height: 1.125rem;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: .9375rem;
                }

                .btn-bordered {
                  min-width: 5.3125rem;
                  background-color: transparent;
                  border: .0625rem solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: .0625rem solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: .0625rem solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: .0625rem solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 45.8125rem;
        height: 4.125rem;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 1.125rem 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 30.625rem;
            float: left;

            li {
              line-height: 1.125rem;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 1.125rem;
                text-decoration: none;
                background-color: #fff;
                border: .0625rem solid #e0e9ee;
                margin-left: -0.0625rem;
                font-size: .875rem;
                padding: .5625rem 1.125rem;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -0.0625rem;
                  position: relative;
                  float: left;
                  line-height: 1.125rem;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: .875rem;
                  border: 0;
                  padding: .5625rem 1.125rem;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: .875rem;
            float: right;
            width: 15.0625rem;
          }
        }
      }
    }
  }
}
</style>