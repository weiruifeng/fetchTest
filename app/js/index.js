/**
 * Created by ruifengwei on 2017/4/7.
 */
let myImage = document.querySelector('img');

const imgUrl = '/img/flowers.jpg';

fetch(imgUrl)
    .then(function(response) {
        console.log(response.ok);
        return response.blob();
    })
    .then(function(myBlob) {
        let objectURL = URL.createObjectURL(myBlob);
        myImage.src = objectURL;
    });


const myHeaders = new Headers();

const myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
};

fetch(imgUrl,myInit)
    .then(function(response) {
        console.log(response.ok);
        return response.blob();
    })
    .then(function(myBlob) {
        var objectURL = URL.createObjectURL(myBlob);
        myImage.src = objectURL;
    });

fetch(imgUrl).then(function(response) {
    if(response.ok) {
        response.blob().then(function(myBlob) {
            var objectURL = URL.createObjectURL(myBlob);
            myImage.src = objectURL;
        });
    } else {
        console.log('Network response was not ok.');
    }
})
    .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    });

(function request() {
    const myHeaders = new Headers();

    const myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };

    const myRequest = new Request(imgUrl,myInit);

    fetch(myRequest,myInit)
        .then(function(response) {
            console.log(response.ok);
            return response.blob();
        })
        .then(function(myBlob) {
            var objectURL = URL.createObjectURL(myBlob);
            myImage.src = objectURL;
        });
})();


function fetchFun(option) {
    const fetchOption = {
        method: option.method,
        headers: {
            'Content-Type': 'application/json'
        },
        // 同源cookie
        credentials: 'same-origin'
    };
    if (option.params) {
        if (fetchOption.method === 'GET') {
            const paramsArr = [];
            for (const key in option.params) {
                paramsArr.push(key + '=' + encodeURIComponent(option.params[key]));
            }
            option.url += '?' + paramsArr.join('&');
        } else {
            fetchOption.body = JSON.stringify(option.params);
        }
    }

    fetch(option.url, fetchOption)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                const error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        })
        .then((response) => {
            if (Number(response.status) === 200) {
                option.success(response.data);
            } else {
                const error = new Error(response);
                error.response = response;
                throw error;
            }
        })
        .catch((error) => {
            if (option.error) {
                option.error(error.response);
            } else {
                console.log('request failed', error);
            }
        });
}
const prefix = '/fetch';
const ajax = {
    setFollow(option) {
        option.method = 'POST';
        option.url = `${prefix}/userInfo/12`;
        fetchFun(option);
    }
};

const option = {
    success(data) {
        console.log(data);
    },

    error(data) {
        console.log(data);
    },

    params: {
        suid: '23323232'
    }
};

ajax.setFollow(option);

// $(function() {
//     $.get(`http://10.2.24.129:4000/test/userInfo`, { sample: 'payload' }, function(response){
//         console.log(response);
//     })
//
// });