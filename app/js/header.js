/**
 * Created by ruifengwei on 2017/4/7.
 */
const content = "Hello World";

const myHeaders = new Headers({
    "Content-Type": "text/plain",
    "Content-Length": content.length.toString(),
    "X-Custom-Header": "ProcessThisImmediately",
});

console.log(myHeaders.has('Content-Type'));

var myBody = new Blob();

addEventListener('fetch', function(event) {
    event.respondWith(new Response(myBody, {
        headers: { "Content-Type" : "text/plain" }
    }));
});