const url = 'https://www.espncricinfo.com/series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard';

const request = require('request')
const cheerio = require('cheerio')

function processScorecard() {
 request(url, cb);
}
request(url, cb);
function cb(error, response, html) {
  if(error) {
   console.log(error);
  }
  else {
   extractMatchDetails(html);
  }
}
function extractMatchDetails(html) {
 // Venue date result runs balls fours sixes sr
 // Venue date result - common result
 // .header-info .description

 // .match-info-MATCH .status-text span

 let $ = cheerio.load(html);
 let descElem = $('.header-info .description');
 let result = $(".match-info-MATCH .status-text span"); 
 // console.log(descElem.text());
 let desArray = descElem.text().split(",");
 let venue = desArray[1].trim();
 let date = desArray[2].trim();
 // console.log(venue);
 // console.log(date);
 result = result.text();
 // console.log(result);
 let innings = $(".card.content-block.match-scorecard-table>.Collapsible");
 // let htmlString = "";
 for(let i=0; i<innings.length; i++) {
  // htmlString = $(innings[i]).html();
  // htmlString += $(innings[i]).html();
  let teamName = $(innings[i]).find("h5").text();
  teamName = teamName.split("INNINGS")[0].trim();
  let opponentIndix = (i==0) ? 1 :0;
  let opponentName = $(innings[opponentIndix]).find("h5").text();
  console.log(opponentName);
  opponentName= opponentName.split("INNINGS")[0].trim();
  console.log(`${venue} | ${date}| ${teamName}| ${opponentName} ${result}`);
  let currentInning = $(innings[i]);
  let allRows = currentInning.find(".table.batsman tbody tr");
  for(let j=0; j<allRows.length; j++) {
   let allCols = $(allRows[j]).find("td");
   let isWorthy = $(allCols[0]).hasClass("batsman-cell");
   if(isWorthy) {
    // console.log(allCols.text());
    let playerName = $(allCols[0]).text().trim();
    let runs = $(allCols[2]).text().trim();
    let balls = $(allCols[3]).text().trim();
    let fours = $(allCols[5]).text().trim();
    let sixes = $(allCols[6]).text().trim();
    let sr = $(allCols[7]).text().trim();
    console.log(`${playerName} ${runs} ${balls} ${fours} ${sixes} ${sr}`);
   }
  }
 }
 // console.log(htmlString);
 // Player runs balls fours sixes sr


}
module.exports = {
 ps : processScorecard
}