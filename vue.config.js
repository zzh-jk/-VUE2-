const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    //代理跨域
    devServer: {
        proxy: {
            '/api': {
                target: ' http://gmall-h5-api.atguigu.cn',
                // pathRewrite: { '^/api': '' }
            }
        },

        //配置默认打开浏览器为Chrome
        host: '127.0.0.1',
        port: '8080',
        open: { app: { name: 'chrome' } },

    }
})