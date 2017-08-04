'use strict';
var Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.  
//Make sure to enclose your value in quotes, like this: var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
var APP_ID = "arn:aws:lambda:us-east-1:188921392272:function:GolfFactSkill";

var SKILL_NAME = "Golf Facts";
var GET_FACT_MESSAGE = "Here's your fact: ";
var HELP_MESSAGE = "You can say tell me a Golf fact, or, you can say exit... What can I help you with?";
var HELP_REPROMPT = "What can I help you with?";
var STOP_MESSAGE = "Goodbye!";

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
var data = [
    "The French word Cadet means youngest child and is where the word Caddy comes from.",
    "A golf ball will travel further on hot days because the air is less dense so it takes less velocity to travel.",
    "Golf balls used to be made from leather and chicken or goose feathers. One ball would cost ten to twenty dollars.",
    "Only twenty percent of golfers have a handicap below 18. A golfer with handicap of 18 is called a Bogey Golfer.",
    "Only two sports have ever been played while on the moon one is golf and the other is the javelin throw.",
    "Until the invention and rising popularity of the golf tee golfers played off of sand piles they built themselves.",
    "If you walked all eighteen holes instead of riding in a golf cart you would walk approximately four miles.",
    "The chances of making two holes in one in a round of golf are one in 67 million.",
    "The worlds first ever golf tournament for women was held on New Years Day in 1811 at Musselburgh.",
    "Arnold Palmer won 95 Professional tournaments.",
    "125,000 golf balls a year are hit into the water at the famous 17th hole of the Stadium Course at Sawgrass.",
    "The longest putt ever is a monstrous 375 feet.",
    "There are 336 dimples on a regulation golf ball."
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.  
//=========================================================================================================================================
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        var factArr = data;
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];
        var speechOutput = GET_FACT_MESSAGE + randomFact;
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    }
};