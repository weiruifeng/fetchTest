/**
 * Created by ruifengwei on 2017/4/8.
 */
'use strict';

const url = '127.0.0.1:4000';

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if(xhr.readyState == 4) {
            try {
                if((xhr.status >= 200 && xhr.status < 300) || xhr == 304) {
                    console.log(xhr.response);
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

var requestWith = createCORSRequest('get', `http://${url}/CORSWith/userInfo/12`);
if(requestWith) {
    requestWith.withCredentials = true;
    requestWith.send();
}

var request = createCORSRequest('get', `http://${url}/CORS/userInfo/12`);
if(request) {
    request.send();
}