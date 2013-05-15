var path = require('path'),
    util = require('util');

var UserOptions = module.exports = (function () {

  var userOptions = {
    inputDir : './JSONlocale/main',
    outputDir : './JSONlocaleNew',

    keep : [
      "identity",
      "languages",
      "scripts",
      "territories",
      "variants",
      "keys",
      "types",
      "measurements",
      "codePatterns",
      "layouts",
      "characters",
      "calendars",
      "currencies",
      "numbers",
      "units"
    ],

    keepCalendars : [
      "buddhist", 
      "chinese", 
      "coptic", 
      "dangi",
      "ethiopic", 
      "ethiopicAmeteAlem",
      "gregorian",
      "hebrew", 
      "indian",
      "islamic", 
      "islamicCivil", 
      "japanese",
      "persian", 
      "roc"
    ],

    keepCalendarsItems : [
      "months",
      "days",
      "quarters",
      "eras",
      "dateFormats",
      "timeFormats",
      "dateTimeFormats",
      "fields"      
    ],

    keepNumbersItems : [
      "currencyFormatsNumberSystemLatn",
      "symbolsNumberSystemLatn",
      "decimalFormatsNumberSystemLatn",
      "currencies"
    ]
  };
  
  return {
    getNew : function (spec) {
      var that = Object.create(userOptions),
          homeDir = process.env.HOME + '/',
          keep, keepCalendars, keepNumbersItems, keepCalendarsItems,

          isTrue = function (opt) {
            return opt === true || opt === 'true';
          },
          isFalse = function (opt) {
            return opt === false || opt === 'false';
          },
          getAsBoolOrArr = function (opt) {
            if (opt === true || opt === 'true') {
              return true;
            } else if (typeof opt === 'string') {
              return opt.split(',');      
            } else if (util.isArray(opt)) {
              return opt;      
            }
          };
          

      if (spec.inputDir) {
        that.inputDir = spec.inputDir;       
      }

      if (spec.outputDir) {
        that.outputDir = spec.outputDir;       
      }

      keep = getAsBoolOrArr(spec.keep);
      if (keep && keep.length) {
        that.keep = keep;
      }

      keepCalendars = getAsBoolOrArr(spec.keepCalendars);
      if (keepCalendars && keepCalendars.length) {
        that.keepCalendars = keepCalendars;
      }

      keepCalendarsItems = getAsBoolOrArr(spec.keepCalendarItems);
      if (keepCalendarsItems && keepCalendarsItems.length) {
        that.keepCalendarsItems = keepCalendarsItems;
      }

      keepNumbersItems = getAsBoolOrArr(spec.keepNumberItems);
      if (keepNumbersItems && keepNumbersItems.length) {
        that.keepNumbersItems = keepNumbersItems;
      }

      return that;
    }
  };
}());
