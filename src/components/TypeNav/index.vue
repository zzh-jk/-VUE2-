<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow">
        <h2 class="all" @mouseover="enterShow">全部商品分类</h2>
        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
        <transition name="navShow">
        <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item"
              v-for="(cate1, index) in categoryList"
              :class="{ active: currentIndex == index }"
              :key="cate1.categoryId"
            >
              <h3 @mouseover="changeBack(index)">
                <a
                  :data-categoryName="cate1.categoryName"
                  :data-category1Id="cate1.categoryId"
                  >{{ cate1.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix" v-show="currentIndex == index">
                <div
                  class="subitem"
                  v-for="(cate2, index) in cate1.categoryChild"
                  :key="cate2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="cate2.categoryName"
                        :data-category2Id="cate2.categoryId"
                        >{{ cate2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em
                        v-for="(cate3, index) in cate2.categoryChild"
                        :key="cate3.categoryId"
                      >
                        <a
                          :data-categoryName="cate3.categoryName"
                          :data-category3Id="cate3.categoryId"
                        >
                          {{ cate3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        </transition>
        
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import debounce from "@/script/debounce";
// import debounce from 'lodash/debounce';
// import throttle from 'lodash/throttle';
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },
  mounted() {
    this.$store.dispatch('homeOption/getBannerList')
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  methods: {
    // 导航栏样式操作
    changeBack: debounce(function (index) {
      this.currentIndex = index;
      console.log(this.currentIndex);
    }, 100),
    //路由跳转及传参
    goSearch(event) {
      let element = event.target;
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        if(this.$route.params){
          location.params = this.$route.params
        }
        location.query = query;
        this.$router.push(location);
      }
    },
    enterShow() {
      if (this.$route.path != "/home") {
        this.show = true;
      }
    },
    leaveShow() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
  },
  computed: {
    ...mapState("homeOption", ["categoryList"]),
  },
};
</script>
<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;
  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }
    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }
          .item-list {
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .active {
          background-color: skyblue;
        }
      }
    }
    .navShow-enter{/*,.navShow-leave-to*/
      height: 0px;
    }
    .navShow-enter-to{/*,.navShow-leave**/
      height: 461px;
    }
    .navShow-enter-active{/*,.navShow-leave-active*/
      transition: all 0.3s linear;
    }
  }
}
a:hover {
  cursor: pointer;
}
</style>
