// 服务器创建
var http = require('http');
// DNS 解析当前dns域名，返回dns服务器ip地址
var dns = require('dns');
// 文件操作
var fs = require('fs'); 
// url 模块处理文件路径
var url = require('url');
// 处理前端传回的字符串解析
var querystring = require('querystring');


function getDns(postData, callback) {
    var domain = querystring.parse(postData).search_dns;
    dns.resolve(domain, (err, addresses) => {
        if (!addresses) {
            addresses = ['不存在域名'];
        }
        callback(domain, addresses);
    });
}

function parseDns(res, req) {
    var postData = '';

    req.addListener('data', postDataChunk => {
        postData += postDataChunk;
    });

    req.addListener('end', () => {
        var retData = getDns(postData, (domain, addresses) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<html><head><meta charset="UTF-8"><title>Document</title></head><body><div style="text-align: center;">Domain: <span style="color: red;">' + domain + '</span>IP: <span style="color: red;">' + addresses.join(',') + '</span></div></body></html>')
        });
        return;
    });
}



function goIndex(res, req) {
    var readPath = __dirname + '/' + url.parse('index.html').pathname;
    var indexPage = fs.readFileSync(readPath);
    res.end(indexPage);
}

function router(res, req, pathname) {
    switch (pathname) {
        case '/parse':
            parseDns(res, req);
            break;
        default:
            goIndex(res, req);
    }
}

http.createServer((req, res) => {

    var pathname = url.parse(req.url).pathname;
    req.setEncoding('utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    router(res, req, pathname);


}).listen(3000, '127.0.0.1');

console.log('Server running at http://127.0.0.1:3000');