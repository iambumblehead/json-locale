const objobjwalk = require('objobjwalk'),
      json_rmns = require('./json_rmns');

module.exports = (o => {
  // if no items are specified, all items are kept,
  // else specifically listed items are kept
  o = (obj, arr) => Array.isArray(arr)
    ? Object.keys(o).reduce((prev, fnname) => (
      arr.includes(fnname.slice(2)) || !/^rm/.test(fnname)
        ? prev
        : o[fnname](prev)
    ), obj) : obj;

  // does not mutate the incoming obj, but returns copy w/ fn applied
  // to calendar items
  o.applycalendars = (obj, fn) => (
    json_rmns.replace(obj, 'dates.calendars', cals => (
      Object.keys(cals).reduce((newcals, calkey) => {
        newcals[calkey] = fn(cals[calkey]);

        return newcals;
      }, {}))));

  o.rmmonths = obj =>
    o.applycalendars(obj, cal => json_rmns.rm(cal, 'months'));

  o.rmdays = obj =>
    o.applycalendars(obj, cal => json_rmns.rm(cal, 'days'));

  o.rmquarters = obj =>
    o.applycalendars(obj, cal => json_rmns.rm(cal, 'quarters'));

  o.rmeras = obj =>
    o.applycalendars(obj, cal => json_rmns.rm(cal, 'eras'));

  o.rmdateFormats = obj =>
    o.applycalendars(obj, cal => json_rmns.rm(cal, 'dateFormats'));

  o.rmtimeFormats = obj =>
    o.applycalendars(obj, cal => json_rmns.rm(cal, 'timeFormats'));

  o.rmdateTimeFormats = obj =>
    o.applycalendars(obj, cal => json_rmns.rm(cal, 'dateTimeFormats'));

  o.rmfields = obj =>
    o.applycalendars(obj, cal => json_rmns.rm(cal, 'fields'));

  o.rmdayPeriods = obj =>
    o.applycalendars(obj, cal => json_rmns.rm(cal, 'dayPeriods'));

  o.replace_yy = obj =>
    json_rmns.replace(obj, 'dates.calendars.gregorian.dateFormats', formats => (
      objobjwalk(formats, f => {
        if (f.pattern) {
          f.pattern = f.pattern.replace(/([^y]|\b)(yy)([^y]|\b)/gi, a => (
            a.replace(/yy/, 'yyyy')
          ));
        }
        return f;
      })
    ));

  return o;
})({});
