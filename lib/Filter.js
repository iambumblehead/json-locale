var Filter = module.exports = (function () {
  var filter = {
    getRmIdentity : function (zendObj) {
      if (zendObj.identity) {
        delete zendObj.identity;
      }
      return zendObj;
    },

    getRmLanguages : function (zendObj) {
      var localeDisplayNames = zendObj.localeDisplayNames,
          languages;

      if (localeDisplayNames) {
        languages = localeDisplayNames.languages;
        if (languages) {    
          delete zendObj.localeDisplayNames.languages;
        }
      }
      return zendObj;
    },

    getRmScripts : function (zendObj) {
      var localeDisplayNames = zendObj.localeDisplayNames,
          scripts;

      if (localeDisplayNames) {
        scripts = localeDisplayNames.scripts;
        if (scripts) {    
          delete zendObj.localeDisplayNames.scripts;
        }
      }
      return zendObj;
    },

        getRmTerritories : function (zendObj) {
      var localeDisplayNames = zendObj.localeDisplayNames,
          territories;

      if (localeDisplayNames) {
        territories = localeDisplayNames.territories;      
        if (territories) {    
          delete zendObj.localeDisplayNames.territories;
        }
      }
    
      return zendObj;
    },
    getRmVariants : function (zendObj) {
      var localeDisplayNames = zendObj.localeDisplayNames,
          variants;

      if (localeDisplayNames) {
        variants = localeDisplayNames.variants;
        if (variants) {    
          delete zendObj.localeDisplayNames.variants;
        }
      }
      return zendObj;
    },

    getRmKeys : function (zendObj) {
      var localeDisplayNames = zendObj.localeDisplayNames,
          keys,
          keyArr,
          keysNew = {};

      if (localeDisplayNames) {
        keys = localeDisplayNames.keys;
        if (keys) {    
          delete zendObj.localeDisplayNames.keys;
        }
      }

      return zendObj;
    },
    getRmTypes : function (zendObj) {
      var localeDisplayNames = zendObj.localeDisplayNames,
          types;      

      if (localeDisplayNames) {
        types = localeDisplayNames.types;
        if (types) {    
          delete zendObj.localeDisplayNames.types;
        }
      }
      return zendObj;
    },

    getRmMeasurements : function (zendObj) {
      var localeDisplayNames = zendObj.localeDisplayNames,
          measurementSystemNames;
      
      if (localeDisplayNames) {
        measurementSystemNames = localeDisplayNames.measurementSystemNames;
        if (measurementSystemNames) {    
          delete zendObj.localeDisplayNames.measurementSystemNames;
        }
      }
      return zendObj;
    },
    getRmCodePatterns : function (zendObj) {
      var localeDisplayNames = zendObj.localeDisplayNames,
          codePatterns;      

      if (localeDisplayNames) {
        codePatterns = localeDisplayNames.codePatterns;
        if (codePatterns) {    
          delete zendObj.localeDisplayNames.codePatterns;
        }
      }
      return zendObj;
    },

    getRmLayouts : function (zendObj) {
      var layout = zendObj.layout,
          layoutArr;

      if (layout) {        
        delete zendObj.layout;
      }

      return zendObj;
    },

    getRmCharacters : function (zendObj) {
      var characters = zendObj.characters;

      if (characters) {
        delete zendObj.characters;
      }
      return zendObj;
    },

    getRmCalendars : function (zendObj) {
      return zendObj;
    },

    getRmZones : function (zendObj) {
      var dates = zendObj.dates,
          timeZoneNames,
          zoneArr;

      if (dates) {
        timeZoneNames = dates.timeZoneNames;
        if (timeZoneNames) {
          zoneArr = timeZoneNames.zone; 
          if (zoneArr) {
            delete zendObj.dates.timeZoneNames.zone;            
          }
        }
      }

      return zendObj;
    },

    getRmMetaZones : function (zendObj) {
      var dates = zendObj.dates,
          timeZoneNames,
          metaZoneArr;
      
      if (dates) {
        timeZoneNames = dates.timeZoneNames;      
        if (timeZoneNames) {
          metaZoneArr = timeZoneNames.metazone;
          if (metaZoneArr) {
            delete zendObj.dates.timeZoneNames.metazone;
          }
        }
      }

      return zendObj;
    },

    getRmCurrencies : function (zendObj) {
      var numbers = zendObj.numbers,
          currencies;

      if (numbers) {
        currencies = numbers.currencies;
        if (currencies) {    
          delete zendObj.numbers.currencies;
        }
      }

      return zendObj;
    },

    getRmUnits : function (zendObj) {
      var units = zendObj.units;

      if (units) {
        delete zendObj.units;
      }
      return zendObj;
    }
  };

  var filterMap = {
    identity        : filter.getRmIdentity,
    languages       : filter.getRmLanguages,
    scripts         : filter.getRmScripts,
    territories     : filter.getRmTerritories,
    variants        : filter.getRmVariants,
    keys            : filter.getRmKeys,
    types           : filter.getRmTypes,
    measurements    : filter.getRmMeasurements,
    codePatterns    : filter.getRmCodePatterns,
    layouts         : filter.getRmLayouts,
    characters      : filter.getRmCharacters,
    calendars       : filter.getRmCalendars,
//    months          : filter.getRmMonths,//
//    days            : filter.getRmDays,//
//    quarters        : filter.getRmQuarters,//
//    eras            : filter.getRmEras,//
//    dateFormats     : filter.getRmDateFormats,//
//    timeFormats     : filter.getRmTimeFormats,//
//    dateTimeFormats : filter.getRmDateTimeFormats,//
//    fields          : filter.getRmFields, //
    zones           : filter.getRmZones,
    metaZones       : filter.getRmMetaZones,
    currencies      : filter.getRmCurrencies,
    units           : filter.getRmUnits
  };

  return {
    filterAll : function (obj, opts) {
      for (var o in filterMap) {
        if (filterMap.hasOwnProperty(o)) {
          // if `included`, else
          //console.log('o', o, Object.keys(obj));
          if (opts.keep.indexOf(o) === -1) {
            obj = filterMap[o](obj, opts);
          }
        }
      }
      return obj;
    }
  };

}());