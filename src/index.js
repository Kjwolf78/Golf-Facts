'use strict';
var Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.  
//Make sure to enclose your value in quotes, like this: var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
var APP_ID = "arn:aws:lambda:us-east-1:188921392272:function:ChampagneFact";

var SKILL_NAME = "Champagne Facts";
var GET_FACT_MESSAGE = "Here's your fact: ";
var HELP_MESSAGE = "You can say tell me a Champagne fact, or, you can say exit... What can I help you with?";
var HELP_REPROMPT = "What can I help you with?";
var STOP_MESSAGE = "Goodbye!";

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
var data = [
    "Marilyn Monroe bathed in Champagne which required 350 bottles to fill the tub.",
    "There are approximately 49 million bubbles in one 750 milliliter bottle of Champagne.",
    "Champagne has three times more gas than beer.",
    "The pressure inside one Champagne bottle is three times that of an average car tire.",
    "You are more likely to be killed by a flying Champagne cork than by a poisonous spider.",
    "Dom Pierre Perignon was a nearly blind monk who is credited for the creation of Champagne.",
    "More than a third of fatalities from Champagne corks occur at weddings.",
    "The most expensive bottle of Champagne cost 2.07 million dollars.",
    "It is usually less caloric than other alocholic beverages which makes it a prime selection of dieters.",
    "It is rumored the coupe glass was molded from Marie Antoinette\’s left breast.",
    "Sabrage is a term for opening a champagne bottle with an actual sword.",
    "The longest recorded flight of a champagne cork was 177 feet.",
    "There is currently 1 billion bottles of champagne in storage worldwide."
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