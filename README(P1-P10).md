# project_sph  测试123

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


day1:

1.vue-cli脚手架初始化项目
node + webpack + 淘宝镜像

node_modules文件夹:项目依赖文件

public文件夹:一般放置一些静态资源(图片)，需要注意：放在public文件夹的静态资源webpack打包的时候回原封不动的打包到dist文件夹中
 
 src文件夹（源码文件夹）：
    assert文件夹：一般放置静态资源（多个组件共用的资源文件）注意：在webpack打包的时候，会把静态资源当做一个模块打包到JS文件里面。

component文件夹：一般放置非路由组件（全局组件）

App.vue: 唯一的根组件

main.js:项目程序入口文件

babel.config.js 兼容语法配置文件

package.json.js 记录项目依赖
 
package-lock.json 缓存型文件（锁定各种依赖包版本）

README.md 项目说明文件 


day2:

2.项目的其他配置

2.1项目运行成功自动打开浏览器
package.json.js：
```
"scripts"."serve"="vue-cli-service serve --open"
```
2.2 eslint 校验工具关闭

Vue.config.js:
```
module.exports =  { lintOnSave : false}
```
2.3 src文件夹配置别名
jsconfig.json 配置别名@提示[@代表的是src文件夹，这样将来文件过多，找的时候方便很多]
```
{
    "compilerOptions":{
        "baseUrl":"./",
        "paths":{
                  "@/*":["src/*"]
        }
    },
    "exclude":["node_modules","dist"]
}
```

3.项目路由分析
vue-router
前端所谓路由: KV键值对。
key:URL(地址栏中的路径)
value:
相应的路由组件
注意:项目上中下结构
路由组件:
Home首页路由组件、Search路 由组件、login登录路由、Register注册路由
非路由组件:
Header [首页、搜索页)
Footer [在首页、搜索页]，但是在登录页面是没有



4、完成非路由组件Header与Footer业务
在咱们项目当中，不在以HTML +CsS为主，主要搞业务、逻辑
在开发项目的时候:
1:书写静态页面(HTML + Css)
2:拆分组件
3:获取服务器的数据动态展示
4:完成相应的动态业务逻辑
注意1:创建组件的时候，组件结构+组件的样式+图片资源
注意2:咱们项目采用的less样式，浏览器不识别less样式，需要通过less、less- loader [安装五版本的]进行处理less,把less样式变为css样式，浏览器才可以识别。I
注意3:如果想让组件识别less样式，
需要在sty1e标签的身上加上1ang=less


5.路由组件的搭建
vue-router在上面分析的时候，路由组件应该有四个: Home、 Search、 Login、 Register
-components文件夹:经常放置的非路由组件(共用全局组件)
-pages |views文件夹:经常放置路由组件
5.1配置路由
项目当中配置的路由般放置在router文件夹中
5.2总结
路由组件与非路由组件的区别?
1:路由组件一般放 置在pages|views文件夹，非路由组件一般放置components文件夹中
2:路由组件一般需要在router文件夹中进行注册(使用的即为组件的名字)，非路由组件在使用的时候，一般都是以标签的形式使用
3:注册完路由，不管路由路由组件、还是非路由组件身上都有$route、$router属性
$route:-般获取路由信息[路径、query、params等等]
$router:一般进行编程式导航进行路由跳转[ push | replace ]


6.Footer组件显示与隐藏
显示或者隐藏组件: v-if |v-show
Footer组件:在Home、 Search 显示Footer组件
Footer组件:在登录、注册时候隐藏的
6.1我们可以根据组件身上的$route获取当前路由的信息，通过路由路径判断Footer显示与隐藏。
6.2配置的路由的时候，可以给路由添加路由元信息[meta]，路由需要配置对象，它的key不能瞎写、胡写、乱写

8.路由传参
8.1:路由跳转有几种方式?
比如: A->B
声明式导航: router-link (务必要有to属性)，可以实现路由的跳转
编程式导航:利用的是组件实例的$router . push|replace方法，
可以实现路由的跳转。(可以书写一些自己业务)
8.2: 路由传参，参数有几种写法?
params参数:属于路径当中的一部分，需要注意，在配置路由的时候，需要占位
query参数:不属于路径当中的一部分， 类似于ajax中的queryString /home ?k=v&kv=,不需要占位

```
//路由传递参数:
//第一种:字符串形式
// this.$router.push("/search/"+this.keyword+"?k="+this.keyword.toUpperCase());
//第二种:模板字符串
// this.$router.push("/search/${this.keyword}?k=${this.keyword.toUpperCase()}")
//第三种:对象
this.$router.push({name:"search",params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase} })

```

//面试题1:路由传递参数(对象写法) path是否可以结合params参数一起使用 ?
//答:路由跳转传参的时候，对象的写法可以是name、path形式，但是需要注意的是，path这种写法不能与params参数一同使用
// this.$router.push({name:'search',params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase} })

//2:如何指定params参数可传可不传?
//如果路由要求传递params参数，但是你就不传递params参数，发现一件事情，URL会有问题的(路径缺失)
比如:配置路由的时候，占位了(params参数)，但是路由跳转的时候就不传递。
路径会出现问题
出现问题：http://localhost:8080/#/?k=QWE 
理想状态：http://localhost:8080/#/search?k=QWE

//如何指定params参数可以传递、或者不传递，在配置路由的时候，在占位的后面加上一个问号[params可以传递或者不传]
```
path: '/search:keyword?'

```
//面试题3:params参数可以传递也可以不传递，但是如果传递是空串，如何解决?
//使用undefined解决: params参 数可以传递、不传递(空的字符串)
this.$router.push( {name :'search',params:{keyword:|| undefined} })

//面试题4:]路由组件能不能传递props数据?
//可以的:三种写法 
```
//布尔值写法:params
// props :true，
//对象写法:额外的给路由组件传递一些props
// props:{a:1,b:2},
//函数写法:可以params参数、query参数，通过props传递给路由组件
props: ($route)=>( {keyword: $route.params.keyword, k:$route.query.k};)

```

1:编程式路由跳转到当前路由(参数不变)，多次执行会抛出NavigationDuplicated的警告错误? 
--路由跳转有两种形式:声明式导航、编程式导航
--声明式导航没有这类问题的，因为vue-router底层已经处理好了
1.1为什么编程式导航进行路由跳转的时候，就有这种警告错误那?
"vue-router": "^3.5.3": 最新的vue-router引入promise
1.2通过给push方法传递相应的成功、失败的回调函数，可以捕获到当前错误，可以解决。
1.3通过底部的代码，可以实现解决错误
this.$router.push( {name:"search",params:{keyword: this.keyword}, query:{k:this.keyword.toUpperCase()} }, ()=>{},()=>{});
这种写法:治标不治本，将来在别的组件当中push|replace,编程式导航还是有类似错误。


this:当前组件实例(search)
this.$router属性:当前的这个属性，属性值VueRouter类的一个实例，当在入口文件注册路由的时候，给组件实例添加$router I $route属性
push是VueRouter类的一个原型方法
$router是VueRouter类的实例
所以对原型方法push进行修改，修改结果就会作用于组件实例的$router实例。

//重写VueRouter原型对象的push/replace方法
```

//备份原方法
let originPush = VueRouter.prototype.push
//参数：
//location：路由跳转地址
//resolve,reject:promise对象的成功与失败的回调函数
    VueRouter.prototype.push = function(location,resolve,reject){
        if(resolve && reject){
            originPush.call(this,location,resolve,reject)
        }else{
            originPush().call(this,location,()=>{},()=>{})
        }
    }

//备份原方法
let originReplace = VueRouter.prototype.replace
//参数：
//location：路由跳转地址
//resolve,reject:promise对象的成功与失败的回调函数
    VueRouter.prototype.replace = function(location,resolve,reject){
        if(resolve && reject){
            originReplace.call(this,location,resolve,reject)
        }else{
            originReplace().call(this,location,()=>{},()=>{})
        }
    }

//call||apply区别
//相同点:都可以调用函数一次，都可以篡改函数的上下文(this)一次
//不同点: call与apply传递参数: cal1传递参数用逗号隔开（参数列表），apply方法执行，传递数组

```

二次封装axios

进度条的使用

nprgress（配合axios的请求与响应拦截器）
start() //进度条开始
done()  //进度条结束

防抖与节流 见 @script/debounce.js , @script/throttle.js


6)三级联动组件的路由跳转与传递参数
三级联动用户可以点击的:一级分类、二级分类、三级分类，当你点击的时候
Home模块跳转到Search模块，一级会把用户选中的产品(产品的名字、产品的ID)在路由跳转的时候，进行传递。
路由跳转:
声明式导航: router- link
编程式导航: push|replace

三级联动:如果使用声明式导航router-link,可以实现路由的跳转与传递参数。
但是需要注意，出现卡顿现象。
router-link:可以一个组件，当服务器的数据返回之后，循环出很多的router- link组件[创建组件实例的] 1000+
创建组件实例的时候，一瞬间 创建1000+很耗内存的，因此出现了卡顿现象。

//最好的解决方案:编程式导航+事件委派
//利用事件委派存在一些问题: 1:点击一定是a标签2:如何获取参数 [1、2、3级分 类的产品的名字、id]


复习:
1)商品分类的三级列表由静态变为动态形式[获取服务器数据:解决跨域问题]
2)函数防抖与节流[面试频率很高]
3)路由跳转:声明式导航(router-link) 、编程式导航
编程式导航解决这个问题:自定义属性
1)开发Search模块中的TypeNav商品分类菜单(过渡动画效果)
过渡动画:前提组件|元素务必要有v-if|v-show指令才可以进行过渡动画
2)现在咱们的商品分类三级列表可以进行优化?
在App根组件当中发请求[根组件mounted]执行一次
3)合并params与query参数?|



4)开发Home首页当中的ListContainer组件与Floor组件?
https://docschina.org/ 
但是这里需要知道件事情:服务器返回的数据 (接口)只有商品分类菜单 分类数据，对于ListContainer组件 与Floor组件数据服务器没有提
供的。
mock数据(模拟):如果你想mock数据，需要用到个插件mockjs
使用步骤:
1)在项目当中src文件夹中创建mock文件夹
2)第二步准备JSON数据(mock 文件夹中创建相应的JSON文件) -- 格式化一下，别留有空格(跑不起来的)
3)把mock数据需要的图片放置到public文件夹中[public文 件夹在打包的时候，会把相应的资源原封不动打包到dist文件夹中]
4)创建mockSerer.js通过mockjs插件实现模拟数据



