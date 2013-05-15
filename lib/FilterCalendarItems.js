var util = require('util');

var FilterCalendarItems = module.exports = (function () {

  var eachElemOrObj = function (o, fn) {
    if (util.isArray(o)) {
      o.map(fn);
    } else if (typeof o === 'object') {
      fn(o);
    } else if (typeof o === 'string') {
      fn(o);
    }
  };

  var forEachCalendar = function (zendObj, fn) {
    var dates = zendObj.dates, calendars;
    if (dates) {
      calendars = dates.calendars;
      if (calendars) {
        for (var o in calendars) {
          if (calendars.hasOwnProperty(o)) {
            fn(calendars[o]);
          }
        }
      }
    }
  };

  var filter = {
    getRmMonths : function (zendObj, opts) {
      forEachCalendar(zendObj, function (cal) {
        if (typeof cal === 'object' && cal.months) {
          delete cal.months;
        }
      });
      return zendObj;
    },

    getRmDays : function (zendObj) {
      forEachCalendar(zendObj, function (cal) {
        if (typeof cal === 'object' && cal.days) {
          delete cal.days;
        }
      });
      return zendObj;
    },

    getRmQuarters : function (zendObj) {
      forEachCalendar(zendObj, function (cal) {
        if (typeof cal === 'object' && cal.quarters) {
          delete cal.quarters;
        }
      });
      return zendObj;
    },  

    getRmEras : function (zendObj) {
      forEachCalendar(zendObj, function (cal) {
        if (typeof cal === 'object' && cal.eras) {
          delete cal.eras;
        }
      });
      return zendObj;
    },

    getRmDateFormats : function (zendObj) {
      forEachCalendar(zendObj, function (cal) {
        if (typeof cal === 'object' && cal.dateFormats) {
          delete cal.dateFormats;
        }
      });
      return zendObj;
    },

    getRmTimeFormats : function (zendObj) {
      forEachCalendar(zendObj, function (cal) {
        if (typeof cal === 'object' && cal.timeFormats) {
          delete cal.timeFormats;
        }
      });
      return zendObj;
    },

    getRmDateTimeFormats : function (zendObj) {
      forEachCalendar(zendObj, function (cal) {
        if (typeof cal === 'object' && cal.dateTimeFormats) {
          delete cal.dateTimeFormats;
        }
      });
      return zendObj;
    },

    getRmFields : function (zendObj) {
      forEachCalendar(zendObj, function (cal) {
        if (typeof cal === 'object' && cal.fields) {
          delete cal.fields;
        }
      });
      return zendObj;
    },

    getRmDayPeriods : function (zendObj) {
      forEachCalendar(zendObj, function (cal) {
        if (typeof cal === 'object' && cal.dayPeriods) {
          delete cal.dayPeriods;
        }
      });
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
    fields          : filter.getRmFields,
    dayPeriods      : filter.getRmDayPeriods
  };

  return {
    filterAll : function (obj, opts) {
      var calendarsItemsArr = opts.keepCalendarsItems || [];
      for (var o in filterMap) {
        if (filterMap.hasOwnProperty(o)) {
          if (calendarsItemsArr.indexOf(o) === -1) {
            obj = filterMap[o](obj, opts);
          }
        }
      }
      return obj;
    }
  };

}());
