var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var _ = require('underscore');

var url = "http://palcomp3.com/cavaleirosdoforro/musicas.htm";
// var url = "http://palcomp3.com/gordinhocds/musicas.htm";
request(url, function(error, response, html) {
    // console.log(html);
    var $ = cheerio.load(html);
    $(".download").filter(function() {
        var data = $(this);
        var u = data.attr("href");
        var name = data.attr("download").replace("/", "");
        console.log(name, "cavaleiros/" + u);
        try {
            request(u).pipe(fs.createWriteStream(name));
        } catch (e) {
            console.log(e);
        }
    });
});
