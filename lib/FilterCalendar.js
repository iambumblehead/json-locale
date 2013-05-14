var util = require('util');

var FilterCalendar = module.exports = (function () {

  var eachElemOrObj = function (o, fn) {
    if (util.isArray(o)) {
      o.map(fn);
    } else if (typeof o === 'object') {
      fn(o);
    } else if (typeof o === 'string') {
      fn(o);
    }
  };

  var filter = {
    getRmMonths : function (zendObj) {
      var months = zendObj.months;

      if (months) {
        delete zendObj.months;
      }
    
      return zendObj;
    },

    getRmDays : function (zendObj) {
      var days = zendObj.days;
      if (days) {
        delete zendObj.days;
      }
      
      return zendObj;
    },
    getRmQuarters : function (zendObj) {
      var quarters = zendObj.quarters;

      if (quarters) {
        delete zendObj.quarters;
      }
      
      return zendObj;
    },  
    getRmEras : function (zendObj) {
      var eras = zendObj.eras;
      
      if (eras) {
        delete zendObj.eras;
      }

      return zendObj;
    },
    getRmDateFormats : function (zendObj) {
      var dateFormats = zendObj.dateFormats;

      if (dateFormats) {    
        delete zendObj.dateFormats;
      }

      return zendObj;
    },
    getRmTimeFormats : function (zendObj) {
      var timeFormats = zendObj.timeFormats;

      if (timeFormats) {
        delete zendObj.timeFormats;
      }

      return zendObj;
    },
    getRmDateTimeFormats : function (zendObj) {
      var dateTimeFormats = zendObj.dateTimeFormats;

      if (dateTimeFormats) {    
        delete zendObj.dateTimeFormats;
      }

      return zendObj;
    },
    getRmFields : function (zendObj) {
      var fields = zendObj.fields;

      if (fields) {    
        delete zendObj.fields;
      }

      return zendObj;
    }
  };

  var filterMap = {
    months          : filter.getRmMonths,
    days            : filter.getRmDays,
    quarters        : filter.getRmQuarters,
    eras            : filter.getRmEras,
    dateFormats     : filter.getRmDateFormats,
    timeFormats     : filter.getRmTimeFormats,
    dateTimeFormats : filter.getRmDateTimeFormats,
    fields          : filter.getRmFields
  };

  return {
    filterAll : function (obj, opts) {
      for (var o in filterMap) {
        if (filterMap.hasOwnProperty(o)) {
          if (opts.keepCalendars.indexOf(o) === -1) {
            obj = filterMap[o](obj, opts);
          }
        }
      }
      return obj;
    }
  };

}());