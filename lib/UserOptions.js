var path = require('path'),
    util = require('util');

var UserOptions = module.exports = (function () {

  var userOptions = {
    inputDir : path.join(__dirname, '../JSONlocale/main'),
    outputDir : './JSONlocaleNew',
    isoType : 'ISO-639-2', // three letter (639-1), two letter (639-2)

    // `false` -all locales. 
    // empty array -no locales.
    // populated array -given locales.
    //
    // `locale` elements may be given in 639-1 or 639-2 format
    localeFilterArr : false,
    isConvert_yy : true,
    isConvert_underscore : false,

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
    isoTypes : {
      "639-2" : "ISO-639-2",
      "639-1" : "ISO-639-1"
    },

    getFullPath : function (p) {
      return p
        .replace(/^~(?=\/)/, process.env.HOME)
        .replace(/^.(?=\/)/, process.cwd());
    },
    optConvert : {
      isTrue : function (opt) {
        return opt === true || opt === 'true';
      },
      isFalse : function (opt) {
        return opt === false || opt === 'false';
      },
      getAsBoolOrArr : function (opt) {
        var fin = false;

        if (opt === true || opt === 'true') {
          fin = true;
        } else if (opt === false || opt === 'false') {
          fin = false;
        } else if (typeof opt === 'string') {
          fin = opt.split(',');      
        } else if (util.isArray(opt)) {
          fin = opt;      
        }

        return fin;
      }
    },
    getNew : function (spec) {
      var that = Object.create(userOptions),
          isTrue = this.optConvert.isTrue,
          isFalse = this.optConvert.isFalse,
          getAsBoolOrArr = this.optConvert.getAsBoolOrArr,
          keep, keepCalendars, keepNumbersItems, keepCalendarsItems;

      if (spec.inputDir) {
        //that.inputDir = spec.inputDir;
        that.inputDir = this.getFullPath(spec.inputDir);       
      }

      if (spec.outputDir) {
        //that.outputDir = this.getFullPath(spec.outputDir);       
        that.outputDir = spec.outputDir;       
      }

      if (spec.isoType && spec.isoType in this.isoTypes) {
        that.isoType = this.isoTypes[spec.isoType];
      }

      that.isConvert_yy = isFalse(spec.isConvert_yy) ? false : true;
      that.isConvert_underscore = isTrue(spec.isConvert_yy);

      that.localeFilterArr = getAsBoolOrArr(spec.localeFilter);

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
