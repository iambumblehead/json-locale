const json_filternumberitems = require('./json_filternumberitems'),
      json_filtercalendaritems = require('./json_filtercalendaritems'),
      json_filtercalendar = require('./json_filtercalendar'),
      json_rmns = require('./json_rmns'),
      json_iso = require('./json_iso');

module.exports = (o => {
  o.getRmIdentity = obj => json_rmns.rm(
    obj, 'identity');

  o.getRmLanguages = obj => json_rmns.rm(
    obj, 'localeDisplayNames.languages');

  o.getRmListPatterns = obj => json_rmns.rm(
    obj, 'listPatterns');

  o.getRmDisplayPattern = obj => json_rmns.rm(
    obj, 'localeDisplayNames.localeDisplayPattern');

  o.getRmScripts = obj => json_rmns.rm(
    obj, 'localeDisplayNames.scripts');

  o.getRmTerritories = obj => json_rmns.rm(
    obj, 'localeDisplayNames.territories');

  o.getRmVariants = obj => json_rmns.rm(
    obj, 'localeDisplayNames.variants');

  o.getRmKeys = obj => json_rmns.rm(
    obj, 'localeDisplayNames.keys');

  o.getRmTypes = obj => json_rmns.rm(
    obj, 'localeDisplayNames.types');

  o.getRmMeasurements = obj => json_rmns.rm(
    obj, 'localeDisplayNames.measurementSystemNames');

  o.getRmCodePatterns = obj => json_rmns.rm(
    obj, 'localeDisplayNames.codePatterns');

  o.getRmDelimiters = obj => json_rmns.rm(
    obj, 'delimiters');

  o.getRmLayouts = obj => json_rmns.rm(
    obj, 'layout');

  o.getRmCharacters = obj => json_rmns.rm(
    obj, 'characters');

  o.getRmCalendars = obj => json_rmns.rm(
    obj, 'dates.calendars');

  o.getRmTimeZoneNames = obj => json_rmns.rm(
    obj, 'dates.timeZoneNames');

  o.getRmNumbers = obj => json_rmns.rm(
    obj, 'numbers');

  o.getRmCurrencies = obj => json_rmns.rm(
    obj, 'numbers.currencies');

  o.getRmUnits = obj => json_rmns.rm(
    obj, 'units');

  o.getRmPosix = obj => json_rmns.rm(
    obj, 'posix');

  var filterMap = {
    identity       : o.getRmIdentity,
    languages      : o.getRmLanguages,
    displayPattern : o.getRmDisplayPattern,
    scripts        : o.getRmScripts,
    territories    : o.getRmTerritories,
    variants       : o.getRmVariants,
    keys           : o.getRmKeys,
    types          : o.getRmTypes,
    measurements   : o.getRmMeasurements,
    codePatterns   : o.getRmCodePatterns,
    delimiters     : o.getRmDelimiters,
    layouts        : o.getRmLayouts,
    listPatterns   : o.getRmListPatterns,
    characters     : o.getRmCharacters,
    calendars      : o.getRmCalendars,
    timeZoneNames  : o.getRmTimeZoneNames,
    numbers        : o.getRmNumbers,
    currencies     : o.getRmCurrencies,
    units          : o.getRmUnits,
    posix          : o.getRmPosix
  };

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

  o.filterAll = (obj, opts) => {
    obj = Object.keys(filterMap).reduce((prev, key) => (
      opts.keep.includes(key)
        ? prev
        : filterMap[key](prev)), obj);    
    
    if (obj.dates && obj.dates.calendars) {
      obj = json_filtercalendar.filterAll(obj, opts);
      obj = json_filtercalendaritems.filterAll(obj, opts);
    }

    if (obj.numbers)
      obj = json_filternumberitems.filterAll(obj, opts);

    if (opts.isoType || opts.isConvert_underscore)
      obj = o.getISOConverted(obj, opts);

    return obj;
  };

  return o;
})({});
