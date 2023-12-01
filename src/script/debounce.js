// 为什么要防抖
// 有的操作是高频触发的，但是其实触发一次就好了，比如我们短时间内多次缩放页面，那么我们不应该每次缩放都去执行操作，应该只做一次就好。再比如说监听输入框的输入，不应该每次都去触发监听，应该是用户完成一段输入后在进行触发。

// 防抖就是防止抖动，避免事件的重复触发

const debounce = (func, delay) => {
        // 缓存一个定时器id
        let timer = 0
            // 这里返回的函数是每次用户实际调用的防抖函数
            // 如果已经设定过定时器了就清空上一次的定时器
            // 开始一个新的定时器，延迟执行用户传入的方法
        return function() {
            clearTimeout(timer)
            timer = setTimeout(() => {
                func.apply(this, arguments)
            }, delay);
        }
    }
    // 函数debounce返回的匿名函数调用了timer,导致timer脱离debounce函数的作用域存活于内存中，直到匿名函数也执行完毕，才会被回收。故当点击间隔小于delay毫秒时，timer就会不断更新值，导致setTimeout内的匿名函数无法执行(因为setTimeout内的函数会延迟delay毫秒执行)，直到没有新的调用事件时，fn才会正常延迟到delay毫秒后执行。

export default debounce