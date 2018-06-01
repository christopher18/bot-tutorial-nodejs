// Chris Version
var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

let dadTest = (dadString) => {
  if (dadString.includes("I'm") || dadString.includes("I am")) {
    return true
  }
  return false
}

let dadify = (dadString) => {
  if (dadString.includes("I'm")) {
    let index = dadString.indexOf("I'm")
    dadString = dadString.substring(index + 4, dadString.length + 1)
  } else {
    let index = dadString.indexOf("I am")
    dadString = dadString.substring(index + 5, dadString.length + 1)
  }
  return ("Hi " + dadString + ", I'm Dad!!")
}

function respond() {
  var request = JSON.parse(this.req.chunks[0]);

  if(request.text && dadTest(request.text)) {
    this.res.writeHead(200);
    postMessage(request.text);
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(userMessage) {
  var botResponse, options, body, botReq;

  botResponse = "hello";

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;