var fs = require('fs'); 
var url = require('url');

exports.goIndex =  function(res, req) {
    var readPath = __dirname + '/' + url.parse('index.html').pathname;
    var indexPage = fs.readFileSync(readPath);
    res.end(indexPage);
}