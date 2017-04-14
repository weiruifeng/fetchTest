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
});
