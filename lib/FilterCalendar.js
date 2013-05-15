var util = require('util');

var FilterCalendar = module.exports = (function () {

  var getValueAtNamespaceStr = function (namespaceStr, obj) {
    // from carlocci in #javascript
    return namespaceStr.split('.').reduce(function(a, b) { 
      return (a) ? a[b] : null; 
    }, obj);
  };

  var filter = {
    getRmBuddhist : function (zendObj, opts) {
      if (getValueAtNamespaceStr('dates.calendars.buddhist', zendObj)) {
        delete zendObj.dates.calendars.buddhist;
      }
      return zendObj;
    },

    getRmChinese : function (zendObj) {
      if (getValueAtNamespaceStr('dates.calendars.chinese', zendObj)) {
        delete zendObj.dates.calendars.chinese;
      }
      return zendObj;
    },

    getRmCoptic : function (zendObj) {
      if (getValueAtNamespaceStr('dates.calendars.coptic', zendObj)) {
        delete zendObj.dates.calendars.coptic;
      }
      return zendObj;      
    },

    getRmDangi : function (zendObj) {
      if (getValueAtNamespaceStr('dates.calendars.dangi', zendObj)) {
        delete zendObj.dates.calendars.dangi;
      }
      return zendObj;      
    },

    getRmEthiopic : function (zendObj) {
      if (getValueAtNamespaceStr('dates.calendars.ethiopic', zendObj)) {
        delete zendObj.dates.calendars.ethiopic;
      }
      return zendObj;
    },

    getRmEthiopicAmeteAlem : function (zendObj) {
      if (getValueAtNamespaceStr('dates.calendars.ethiopic-amete-alem', zendObj)) {
        delete zendObj.dates.calendars['ethiopic-amete-alem'];
      }
      return zendObj;
    },

    getRmGregorian : function (zendObj) {
      if (getValueAtNamespaceStr('dates.calendars.gregorian', zendObj)) {
        delete zendObj.dates.calendars.gregorian;
      }
      return zendObj;
    },

    getRmHebrew : function (zendObj) {
      if (getValueAtNamespaceStr('dates.calendars.hebrew', zendObj)) {
        delete zendObj.dates.calendars.hebrew;
      }
      return zendObj;
    },

    getRmIndian : function (zendObj) {
      if (getValueAtNamespaceStr('dates.calendars.indian', zendObj)) {
        delete zendObj.dates.calendars.indian;
      }
      return zendObj;
    },

    getRmIslamic : function (zendObj) {
      if (getValueAtNamespaceStr('dates.calendars.islamic', zendObj)) {
        delete zendObj.dates.calendars.islamic;
      }
      return zendObj;    
    },

    getRmIslamicCivil : function (zendObj) {
      if (getValueAtNamespaceStr('dates.calendars.islamic-civil', zendObj)) {
        delete zendObj.dates.calendars['islamic-civil'];
      }
      return zendObj;    
    },

    getRmJapanese : function (zendObj) {
      if (getValueAtNamespaceStr('dates.calendars.japanese', zendObj)) {
        delete zendObj.dates.calendars.japanese;
      }
      return zendObj;
    },

    getRmPersion : function (zendObj) {
      if (getValueAtNamespaceStr('dates.calendars.persian', zendObj)) {
        delete zendObj.dates.calendars.persian;
      }
      return zendObj;
    },

    getRmRoc  : function (zendObj) {
      if (getValueAtNamespaceStr('dates.calendars.roc', zendObj)) {
        delete zendObj.dates.calendars.roc;
      }
      return zendObj;
    }
  };

  var filterMap = {
    buddhist          : filter.getRmBuddhist,
    chinese           : filter.getRmChinese,
    coptic            : filter.getRmCoptic,
    dangi             : filter.getRmDangi,
    ethiopic          : filter.getRmEthiopic,
    ethiopicAmeteAlem : filter.getRmEthiopicAmeteAlem,
    gregorian         : filter.getRmGregorian,
    hebrew            : filter.getRmHebrew,
    indian            : filter.getRmIndian,
    islamic           : filter.getRmIslamic,
    islamicCivil      : filter.getRmIslamicCivil,
    japanese          : filter.getRmJapanese,
    persian           : filter.getRmPersion,
    roc               : filter.getRmRoc
  };

  return {
    filterAll : function (obj, opts) {
      var calendarsArr = opts.keepCalendars || [];
      for (var o in filterMap) {
        if (filterMap.hasOwnProperty(o)) {
          if (calendarsArr.indexOf(o) === -1) {
            obj = filterMap[o](obj, opts);
          }
        }
      }
      return obj;
    }
  };

}());
