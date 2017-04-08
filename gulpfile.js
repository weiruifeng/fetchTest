const gulp = require('gulp');

const browserSync = require('browser-sync').create();

const proxyMiddleware = require('http-proxy-middleware');

const packageData = require("./package.json");

const option = {
    src: 'app/',
    index: 'index.html',
    watch: [
        'app/**'
    ]
};

var proxy = proxyMiddleware(['/fetch'], {
        target: `http://${packageData.url}:4000`,
        changeOrigin: false
    }
);

gulp.task('server',function() {
    browserSync.init({
        server: {
            baseDir: [option.src],
            index: option.index
        },
        ui: {
            port: 9000
        },
        host: packageData.url,
        open: 'external',
        port: 7000,
        // 关掉多设备同步
        ghostMode: false,
        middleware: [proxy]
    });
    gulp.watch(option.watch).on('change',browserSync.reload);
});
