/**
 * Created by ruifengwei on 2017/4/8.
 */
'use strict';

const url = '127.0.0.1:4000';

function createCORSRequest(method, url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if(xhr.readyState == 4) {
            try {
                if((xhr.status >= 200 && xhr.status < 300) || xhr == 304) {
                    // 访问头部信息
                    console.log(xhr.getResponseHeader('Date'));
                    callback && callback(xhr.response);
                } else {
                    console.log('Request was unsuccessful: ' + xhr.status);
                }
            } catch(ex) {
                new Error(ex);
            }
        }
    };
    if('withCredentials' in xhr) {
        xhr.open(method,url, true);
    } else if(typeof XDomainRequest != 'undefined') {
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}

function corsWith(data) {
    $('#corsWith').html(data);
}

function cors(data) {
    $('#cors').html(data);
}

$(function(){
    let requestWith = createCORSRequest('get', `http://${url}/CORSWith/userInfo/12`,corsWith);
    if(requestWith) {
        requestWith.withCredentials = true;
        requestWith.send();
    }

    let request = createCORSRequest('get', `http://${url}/CORS/userInfo/12`,cors);
    if(request) {
        request.send();
    }

    let xhr = new XMLHttpRequest();
    xhr.open('PUT', `http://${url}/CORSWith/userGroup`, true);
    // 带上跨域的自定义请求头部，这样服务端可以对非简单请求头部进行过滤
    xhr.setRequestHeader('X-Custom-Header', 'value');
    xhr.onload = function() {
        if(xhr.readyState == 4) {
            try {
                if(xhr.status == 200) {
                    $('#put').html(xhr.response);
                    // OPTION请求
                } else if(xhr.status == 204){
                    $('#option').html('asass');
                } else {
                    console.log('Request was unsuccessful: ' + xhr.status);
                }
            } catch(ex) {
                new Error(ex);
            }
        }
    };
    xhr.send();


    /**
     * 在canvas上画图片
     * @param id
     * @param drawId
     * @param url
     * @param corsFlag
     */
    function drawCanvas(id, drawId, url, corsFlag) {
        let canvas = document.getElementById(id);
        let ctx = canvas.getContext('2d');

        var img = document.createElement('img');
        img.src = url;
        if(corsFlag) {
            img.crossOrigin = 'anonymous';
        }

        // 必须等到图片完全加载后才能对其进行操作。浏览器通常会在页面脚本执行的同时异步加载图片。如果试图在图片未完全加载之前就将其呈现到canvas上，那么canvas将不会显示任何图片
        if (img.complete) {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0 );
        } else {
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0 );
                const src = canvas.toDataURL(" image/jpeg", 0.3);
                $(drawId).attr('src', src);
            };
        }
    }

    // 图片跨域的情况
    drawCanvas('corsCanvas', '#canvasCorsImg', 'http://127.0.0.1:4000/imgs/headIcon.jpg', true);
    drawCanvas('canvas', '#canvasImg', 'http://127.0.0.1:4000/corsImg/headIcon.jpg');
});

