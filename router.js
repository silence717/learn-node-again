var ParseDns = require('./parse-dns');
var MainIndex = require('./mian-index');

exports.router = (res, req, pathname) => {
    switch (pathname) {
        case '/parse':
            ParseDns.parseDns(res, req);
            break;
        default:
            MainIndex.goIndex(res, req);
    }
}