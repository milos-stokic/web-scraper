var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var htmlVersionCodes = require('../utils/htmlVersionCode');
var validUrl = require('valid-url');
var probe = require('probe-image-size');

//responsible for POST request
router.post('/', function (req, res){
    //get site url from post parameters
    var siteUrl = req.body.siteUrl;


    //send request to site url that you want to anaylze
    request(siteUrl, async function(err, resp, html) {
        //if no error, it means that the site url is exist.
        if (!err){
            var start = new Date();
            var result = {};
            //analyze with cheerio 
            const $ = cheerio.load(html);

            //get html version using templates
            htmlVersionCodes.forEach(
                (version) => {
                  if(String(html).startsWith(version.code)){
                    result['version'] = version.version;
                  }
                }
            );
            //get page title using title tag of html
            result['title'] = $('title').text();
            //get headers using <h1> ~ <h6> tags
            var headers ={};
            headers['h1'] = $('body').find('h1').length;
            headers['h2'] = $('body').find('h2').length;
            headers['h3'] = $('body').find('h3').length;
            headers['h4'] = $('body').find('h4').length;
            headers['h5'] = $('body').find('h5').length;
            headers['h6'] = $('body').find('h6').length;
            
            result['heading'] = headers;

            result['imageCount'] = $('img').length;
            
            var maxImageUrl;
            var maxImageSize = 0;

            var imgSrcs = [];
            //get image 'src' attributes
            $('img').each(
                function(index, element) {
                    console.log(index);
                    var src = $(this).attr('src');
                    if(!validUrl.isUri(src))
                        src = siteUrl + src;
                    console.log(src);
                    imgSrcs.push(src);
                }
            );

            //get max size image
            for(var i = 0; i < imgSrcs.length; i ++) {  
                var url = imgSrcs[i];
                await probe(url)
                .then(size => {
                  console.log(size.width*size.height);
                  if(maxImageSize < size.width*size.height) {
                    console.log('found big');
                    maxImageSize = size.width*size.height;
                    maxImageUrl = url;
                  }
                }).catch(err => {});
            }
            var exLinks = [];
            var inLinks = [];

            //get links using <link> tag
            $('a').each(function(index, ele){
                var link = String($(this).attr('href'));
                if(!link.includes('http')){
                    link = siteUrl+link;
                }
                if(link.includes('#')){
                    inLinks.push(link);
                } else {
                    exLinks.push(link);
                }
            });
            result['externalLinks'] = exLinks;
            result['internalLinks'] = inLinks;
            result['maxImage'] = maxImageUrl;
            result['loadingTime'] = new Date()-start;
            console.log('end');

            //render page with collected information "result"
            res.status(200).render('pages/analy.ejs', {data: result});
        } else {
            res.status(404).send('Could not find siet');
        }
    });
});

module.exports = router;