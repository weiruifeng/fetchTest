/**
 * Created by Administrator on 2017/4/8.
 */
'use strict';
const bodyParser = require('koa-bodyparser');

module.exports = (router) => {
    router.get('/userInfo/:id', bodyParser(), function(ctx, next) {
        // 用bodyParser解析出来参数
        console.log('get CORS', ctx.request.body);
        ctx.body = {
            status: 200,
            data: {
                nickname: '天涯路远',
                token: 'get token',
                params: ctx.params
            }
        };
    });

    router.post('/userInfo/:id', bodyParser(), function(ctx, next) {
        // 用bodyParser解析出来参数
        console.log('post CORS', ctx.request.body);
        ctx.body = {
            status: 200,
            data: {
                nickname: '天涯路远',
                token: 'post token',
                params: ctx.params
            }
        };
    })
};