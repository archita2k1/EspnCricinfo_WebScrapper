const url = 'https://www.espncricinfo.com/series/ipl-2020-21-1210595';

const request = require('request')
const cheerio = require('cheerio')
const AllMatchObj = require("./allMatch");
request(url, cb);
function cb(error, response, html) {
  if(error) {
   console.log(error);
  }
  else {
   extractLink(html);
  }
}
function extractLink(html) {
 let $ = cheerio.load(html);
 let anchorElem = $('a[data-hover="View All Results"]');
 let link = anchorElem.attr('href');
 // console.log(link); this is adha link(only second half)

 let fullLink = 'https://www.espncricinfo.com'+link;
 console.log(fullLink);
 AllMatchObj.getAllMatches(fullLink);
}
