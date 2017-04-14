/**
 * Created by ruifengwei on 2017/4/8.
 */
'use strict';

const Koa = require('koa');

const Router = require('koa-router');

const serve = require('koa-static');

const cors = require('koa2-cors');

const routes = require('./routes');

const routesCORS = require('./routesCORS');
const routesCORSWith = require('./routesCORSWith');


const packageData = require("../package.json");

const app = new Koa();

const host = packageData.url;

const port = 4000;

let router = new Router({prefix: '/fetch'});

let routerCORS = new Router({prefix: '/CORS'});
let routerCORSWith = new Router({prefix: '/CORSWith'});

// 配置Python那边的路由
routes(router);
routesCORS(routerCORS);
routesCORSWith(routerCORSWith);

app.use(cors({
    origin: function(ctx) {
        const regexp = new RegExp('/CORS');
        const regexpWith = new RegExp('/CORSWith');
        if (regexpWith.test(ctx.url)) {
            return `http://${packageData.url}:7000`;
        } else if(regexp.test(ctx.url)) {
            return '*'
        } else if(~String(ctx.url).indexOf('/imgs/')) {
            return `http://${packageData.url}:7000`
            // return '*'
        }
        return false;
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}));

app.use(router.routes());
app.use(router.allowedMethods());

app.use(routerCORS.routes());
app.use(routerCORS.allowedMethods());

app.use(routerCORSWith.routes());
app.use(routerCORSWith.allowedMethods());

app.use(serve(__dirname));

app.listen(port, host, () => {
    console.log(`启动成功，请访问：${host}:${port}`);
});