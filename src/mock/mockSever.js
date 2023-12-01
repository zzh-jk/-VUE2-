import Mock from "mockjs";
import banner from './banner'
import floor from './floor'
//webpack默认对外暴露JSON数据格式，图片
//mock数据：第一个参数 请求地址 第二个参数：请求数据
Mock.mock("/mock/banner", { code: 200, data: banner })
Mock.mock("/mock/floor", { code: 200, data: floor })