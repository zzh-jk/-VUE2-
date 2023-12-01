  const throttle = (func, delay) => {
      let valid = true //默认开启节流阀
      return function() {
          if (valid) {
              valid = false //进入之后直接关闭阀门
              setTimeout(() => {
                  func.apply(this, arguments)
                  valid = true //事件执行完毕打开阀门
              }, delay);
          }
      }
  }



  export default throttle