var http = require('http');
var url = require('url');
var router = require('./router');

// 创建 http 服务器
http.createServer((req, res) => {

    var pathname = url.parse(req.url).pathname;
    req.setEncoding('utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    router.router(res, req, pathname);


}).listen(3000, '127.0.0.1');

console.log('Server running at http://127.0.0.1:3000');