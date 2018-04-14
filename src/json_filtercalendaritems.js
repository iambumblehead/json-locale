
const json_rmns = require('./json_rmns');
const objobjwalk = require('objobjwalk');

module.exports = (o => {

  // does not mutate the incoming obj, but returns copy w/ fn applied
  // to calendar items
  o.applycalendars = (obj, fn) => (
    json_rmns.replace(obj, 'dates.calendars', cals => (
      Object.keys(cals).reduce((newcals, calkey) => {
        newcals[calkey] = fn(cals[calkey]);

        return newcals;
      }, {}))));

  o.getRmMonths = obj =>
    o.applycalendars(obj, cal => json_rmns.rm(cal, 'months'));

  o.getRmDays = obj =>
    o.applycalendars(obj, cal => json_rmns.rm(cal, 'days'));

  o.getRmQuarters = obj =>
    o.applycalendars(obj, cal => json_rmns.rm(cal, 'quarters'));

  o.getRmEras = obj =>
    o.applycalendars(obj, cal => json_rmns.rm(cal, 'eras'));

  o.getRmDateFormats = obj =>
    o.applycalendars(obj, cal => json_rmns.rm(cal, 'dateFormats'));

  o.getRmTimeFormats = obj =>
    o.applycalendars(obj, cal => json_rmns.rm(cal, 'timeFormats'));

  o.getRmDateTimeFormats = obj =>
    o.applycalendars(obj, cal => json_rmns.rm(cal, 'dateTimeFormats'));

  o.getRmFields = obj =>
    o.applycalendars(obj, cal => json_rmns.rm(cal, 'fields'));

  o.getRmDayPeriods = obj =>
    o.applycalendars(obj, cal => json_rmns.rm(cal, 'dayPeriods'));

  var filterMap = {
    months          : o.getRmMonths,
    days            : o.getRmDays,
    quarters        : o.getRmQuarters,
    eras            : o.getRmEras,
    dateFormats     : o.getRmDateFormats,
    timeFormats     : o.getRmTimeFormats,
    dateTimeFormats : o.getRmDateTimeFormats,
    fields          : o.getRmFields,
    dayPeriods      : o.getRmDayPeriods
  };

  o.filterAll = (obj, opts) => {
    var calendarsItemsArr = opts.keepCalendarsItems || [],
        dateFormats;

    obj = Object.keys(filterMap).reduce((prev, key) => (
      calendarsItemsArr.includes(key)
        ? prev
        : filterMap[key](prev)), obj);
    
    if (opts.isConvert_yy) {
      obj = json_rmns.replace(obj, 'dates.calendars.gregorian.dateFormats', formats => (
        objobjwalk(formats, f => {
          if (f.pattern) {
            f.pattern = f.pattern.replace(/([^y]|\b)(yy)([^y]|\b)/gi, (a, b) => (
              a.replace(/yy/, 'yyyy')
            ));
          }
          return f;
        })));
    }

    return obj;
  };

  return o;

})({});
