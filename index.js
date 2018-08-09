"use strict"

var express = require('express'); //
var app = express(); //


app.listen(process.env.PORT || 5000, function () {
    console.log('Server listening');

});

var bodyParser = require('body-parser'); //

app.use(bodyParser.json()); //
app.use(bodyParser.urlencoded({ extended: true })); //


var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('info.json', 'utf8'));

console.log('Answer: ' + obj['금동신발']['언제']['발견']); //// debugging

app.post('/', function (request, response) {
    console.log('request: \n' + JSON.stringify(request.body));

    var object = request.body.queryResult.parameters['object'];
    var what = request.body.queryResult.parameters['what'];
    var who = request.body.queryResult.parameters['who'];
    var when = request.body.queryResult.parameters['when'];
    var where = request.body.queryResult.parameters['where'];
    var how = request.body.queryResult.parameters['how'];
    var why = request.body.queryResult.parameters['why'];
    var SE = request.body.queryResult.parameters['SE'];
    var PE = request.body.queryResult.parameters['PE'];

    let action = (request.body.queryResult.action) ? request.body.queryResult.action: 'default';


    const actionHandlers = {
        'object.how.SE.PE': () => {
            let responseToUser = { fulfillmentText: obj[object][how][SE][PE]};
            sendResponse(responseToUser);
        },

        'object.how.SE': () => {
            let responseToUser = { fulfillmentText: obj[object][how][SE]};
            sendResponse(responseToUser);
        },

        'object.how.PE': () => {
            let responseToUser = { fulfillmentText: obj[object][how][PE]};
            sendResponse(responseToUser);
        },
        
                
        'object.who.PE': () => {
            let responseToUser = { fulfillmentText: obj[object][who][PE]};
            sendResponse(responseToUser);
        },
        
        
        'object.who.SE': () => {
            let responseToUser = { fulfillmentText: obj[object][who][SE]};
            sendResponse(responseToUser);
        },
       
        'object.when.PE': () => {
            let responseToUser = { fulfillmentText: obj[object][when][PE]};
            sendResponse(responseToUser);
        },
        
        'object.what.PE': () => {
            let responseToUser = { fulfillmentText: obj[object][what][PE]};
            sendResponse(responseToUser);
        },
        
        'object.what': () => {
            let responseToUser = { fulfillmentText: obj[object][what]};
            sendResponse(responseToUser);
        },
        
        'object.SE': () => {
            let responseToUser = { fulfillmentText: obj[object][SE]};
            sendResponse(responseToUser);
        },
        
        'object.what.SE': () => {
            let responseToUser = { fulfillmentText: obj[object][what][SE]};
            sendResponse(responseToUser);
        },
        
        'object.what.SE.PE': () => {
            let responseToUser = { fulfillmentText: obj[object][what][SE][PE]};
            sendResponse(responseToUser);
        },
        
        
         'object.where.PE': () => {
            let responseToUser = { fulfillmentText: obj[object][where][PE]};
            sendResponse(responseToUser);
        },
        
        
        'object.where.SE.PE': () => {
            let responseToUser = { fulfillmentText: obj[object][where][SE][PE]};
            sendResponse(responseToUser);
        },
        'object.why': () => {
            let responseToUser = { fulfillmentText: obj[object][why]};
            sendResponse(responseToUser);
        },
        'object.why.PE': () => {
            let responseToUser = { fulfillmentText: obj[object][why][PE]};
            sendResponse(responseToUser);
        },
        'object.why.SE': () => {
            let responseToUser = { fulfillmentText: obj[object][why][SE]};
            sendResponse(responseToUser);
        },
        'object.why.SE.PE': () => {
            let responseToUser = { fulfillmentText: obj[object][why][SE][PE]};
            sendResponse(responseToUser);
        },
        'object.where.SE': () => {
            let responseToUser = { fulfillmentText: obj[object][where][SE]};
            sendResponse(responseToUser);
        },
         'object.when.SE': () => {
            let responseToUser = { fulfillmentText: obj[object][when][SE]};
            sendResponse(responseToUser);
        },
        'object.SE.PE': () => {
            let responseToUser = { fulfillmentText: obj[object][SE][PE]};
            sendResponse(responseToUser);
        },
        'object.who': () => {
            let responseToUser = { fulfillmentText: obj[object][who]};
            sendResponse(responseToUser);
        },
        'object.who.SE.PE': () => {
            let responseToUser = { fulfillmentText: obj[object][who][SE][PE]};
            sendResponse(responseToUser);
        },
        
        'default': () => {
            let responseToUser = { fulfillmentText: '죄송합니다. 정보가 없는 내용입니다. 다른 궁금한건 없으신가요?' };
            sendResponse(responseToUser);
        }
    };

    if (!actionHandlers[action]) {
         action = 'default';
    }

    actionHandlers[action]();

    function sendResponse(responseToUser) {
        if (typeof responseToUser === 'string') {
            let responseJson = { fulfillmentText: responseToUser };
            response.json(responseJson);
        }
        else {
            let responseJson = {};
            responseJson.fulfillmentText = responseToUser.fulfillmentText;
            if (responseToUser.fulfillmentMessages) {
                responseJson.fulfillmentMessages = responseToUser.fulfillmentMessages;
            }
            if (responseToUser.outputContexts) {
                responseJson.outputContexts = responseToUser.outputContexts;
            }
            response.json(responseJson);
        }
    }
});

