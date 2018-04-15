const json_filternumberitems = require('./json_filternumberitems'),
      json_filtercalendaritems = require('./json_filtercalendaritems'),
      json_filtercalendar = require('./json_filtercalendar'),
      json_rmns = require('./json_rmns'),
      json_iso = require('./json_iso');

module.exports = (o => {
  o = (obj, arr, opts) => {
    obj = Array.isArray(arr)
      ? Object.keys(o).reduce((prev, fnname) => (
        arr.includes(fnname.slice(2)) || !/^rm/.test(fnname)
          ? prev
          : o[fnname](prev)
      ), obj) : obj;

    if (obj.dates && obj.dates.calendars) {
      obj = json_filtercalendar(obj, opts && opts.keepCalendars);
      obj = json_filtercalendaritems(obj, opts && opts.keepCalendarsItems);

      if (opts.isConvert_yy)
        obj = json_filtercalendaritems.replace_yy(obj, opts);
    }

    if (obj.numbers)
      obj = json_filternumberitems(obj, opts.keepNumberItems);

    if (opts.isoType || opts.isConvert_underscore)
      obj = o.getISOConverted(obj, opts);

    return obj;
  };

  o.rmidentity = obj => json_rmns.rm(
    obj, 'identity');

  o.rmlanguages = obj => json_rmns.rm(
    obj, 'localeDisplayNames.languages');

  o.rmlistPatterns = obj => json_rmns.rm(
    obj, 'listPatterns');

  o.rmdisplayPattern = obj => json_rmns.rm(
    obj, 'localeDisplayNames.localeDisplayPattern');

  o.rmscripts = obj => json_rmns.rm(
    obj, 'localeDisplayNames.scripts');

  o.rmterritories = obj => json_rmns.rm(
    obj, 'localeDisplayNames.territories');

  o.rmvariants = obj => json_rmns.rm(
    obj, 'localeDisplayNames.variants');

  o.rmkeys = obj => json_rmns.rm(
    obj, 'localeDisplayNames.keys');

  o.rmtypes = obj => json_rmns.rm(
    obj, 'localeDisplayNames.types');

  o.rmmeasurements = obj => json_rmns.rm(
    obj, 'localeDisplayNames.measurementSystemNames');

  o.rmcodePatterns = obj => json_rmns.rm(
    obj, 'localeDisplayNames.codePatterns');

  o.rmdelimiters = obj => json_rmns.rm(
    obj, 'delimiters');

  o.rmlayouts = obj => json_rmns.rm(
    obj, 'layout');

  o.rmcharacters = obj => json_rmns.rm(
    obj, 'characters');

  o.rmcalendars = obj => json_rmns.rm(
    obj, 'dates.calendars');

  o.rmtimeZoneNames = obj => json_rmns.rm(
    obj, 'dates.timeZoneNames');

  o.rmnumbers = obj => json_rmns.rm(
    obj, 'numbers');

  o.rmcurrencies = obj => json_rmns.rm(
    obj, 'numbers.currencies');

  o.rmunits = obj => json_rmns.rm(
    obj, 'units');

  o.rmposix = obj => json_rmns.rm(
    obj, 'posix');

  // identity.language def is ISO
  // localeDisplayNames.languages[o] o is ISO
  //
  // return new object w/ some property names and definitions
  // replaced w/ user-given ISO equivalent
  o.getISOConverted = (obj, opts) => {
    obj = json_rmns.replace(obj, 'identity.language', val => (
      json_iso.getISOConvertedLang(opts, val)
    ));

    return json_rmns.replace(obj, 'localeDisplayNames.languages', langs => (
      Object.keys(langs).reduce((newlangs, langkey) => {
        newlangs[json_iso.getISOConvertedLang(opts, langkey) || langkey] = langs[langkey];

        return newlangs;
      }, {})
    ));
  };

  return o;
})({});
