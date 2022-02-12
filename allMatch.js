const request = require('request')
const cheerio = require('cheerio')
const scoreCardObj = require("./scorecard")

function getAllMatch(url) {
 request(url, function (error, response, html) {
  if(error) {
   console.log(error);
  }
  else {
   getAllLinks(html);
  }
 })
}
function getAllLinks(html) {
 let $ = cheerio.load(html);
 let scorecardElems = $('a[data-hover="Scorecard"]');
 for(let i=0; i<scorecardElems.length; i++) {
  let link = $(scorecardElems[i]).attr('href');
  // console.log(link);
  let fullLink = 'https://www.espncricinfo.com' + link;
  console.log(fullLink);
  scoreCardObj.ps(fullLink);
 }
}
module.exports = {
 getAllMatches: getAllMatch
}