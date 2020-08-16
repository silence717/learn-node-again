var querystring = require('querystring');
var dns = require('dns');

exports.parseDns = function(res, req) {
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

function getDns(postData, callback) {
    var domain = querystring.parse(postData).search_dns;
    dns.resolve(domain, (err, addresses) => {
        if (!addresses) {
            addresses = ['不存在域名'];
        }
        callback(domain, addresses);
    });
}