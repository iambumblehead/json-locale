var path = require('path'),
    util = require('util');

var UserOptions = module.exports = (function () {

  var userOptions = {
    //xmlDir : './ZendXML',
    inputDir : './JSONlocale',
    outputDir : './JSONlocaleNew',

    keep : [
      "ldml",
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
//      "months",
//      "days",
//      "quarters",//
//      "eras",
//      "dateFormats",
//      "timeFormats",
//      "dateTimeFormats",
//      "fields",
      "zones",
      "metaZones",
      "currencies",
      "units"
    ]
  };
  
  return {
    getNew : function (spec) {
      var that = Object.create(userOptions),
          homeDir = process.env.HOME + '/',
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

      var keep = getAsBoolOrArr(spec.keep);
      if (keep && keep.length) {
        that.keep = keep;
      }

      return that;
    }
  };
}());
