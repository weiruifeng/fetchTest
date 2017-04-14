/**
 * Created by Administrator on 2017/4/8.
 */
'use strict';
const bodyParser = require('koa-bodyparser');

module.exports = (router) => {
    router.get('/userInfo/:id', bodyParser(), function(ctx, next) {
        // 用bodyParser解析出来参数
        console.log(`get ${ctx.url}`, ctx.request);
        ctx.body = {
            status: 200,
            data: {
                explain: '我是不带credentials参数的请求，我的Access-Control-Allow-Origin头部可以为*，不携带身份凭证',
                params: ctx.params
            }
        };
    });
};