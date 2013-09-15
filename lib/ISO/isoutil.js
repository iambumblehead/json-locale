var path = require('path'),
    langArr = require('./langArr.js');

var IsoUtil = module.exports = (function() {

  return {
    isoTypes : {
      ISO_632_2 : "ISO-639-2",
      ISO_632_1 : "ISO-639-1"
    },

    getISOObjForLang : function (lang) {
      for (var x = langArr.length; x--;) {
        if (langArr[x].code === lang ||
            langArr[x].language.indexOf(lang) !== -1) {
          return langArr[x];
        }
      }
      
      return null;
    },

    // two-letter language code is not always first
    // element in language array. fix later.
    getISOConvertedLang : function (opts, lang) {
      var langObj = this.getISOObjForLang(lang),
          langFin = null;

      if (langObj) {
        if (opts.isoType === this.isoTypes.ISO_639_1 &&
            langObj.language[0].match(/\S\S\S?/)) {
          langFin = langObj.language[0];
        } else {
          langFin = langObj.code;          
        }
      }

      return langFin;
    },

    // takes a single filename and returns the final filename
    // as determined by ISO type
    // 
    // az_Latn_AZ.json aze_Latn_AZ 
    getISOConvertedFilename : function (opts, filename) {
      var that = this,
          basename = path.basename(filename),
          newfname = basename.replace(/^[a-z]*/, function (match) {
            return that.getISOConvertedLang(opts, match) || match;
          });

      console.log('newfname');
      return filename.replace(basename, newfname);
    },

    getISOLangLocaleAtStr : function (opts, filename) {
      var that = this, ISOLang, langLocale,
          extname = path.extname(filename);

      langLocale = filename.replace(/^[a-z]*/, function (match) {
        return that.getISOConvertedLang(opts, match) || match;
      });

      langLocale = path.basename(langLocale, extname);
      return langLocale;
    },
    
    isFilenameInFilter : function(opts, filename) {
      var that = this, 
          isFilename = false,
          localeFilterArr = opts.localeFilterArr,
          ISOLangAtFilename  = that.getISOLangLocaleAtStr(opts, filename);      

      localeFilterArr.map(function (locale) {
        // en-US,
        // spa-ES,
        // spa-CL
        var ISOFilter = that.getISOLangLocaleAtStr(opts, locale);        
        if (ISOFilter === ISOLangAtFilename) {
          isFilename = true;
        }
      });


      return isFilename;
    }

    /*
    type : {
      Lang : 'Lang',
      Locale : 'Locale',
      LangLocale : 'LangLocale'
    },

    // determine if filename string is 'base'.
    // 'baseLang.json', true
    // 'baseLocale.md', true
    // 'base.md',       false
    // 'somenotes.txt', false
    getBaseType : function (filename) {
      var type = this.type,
          baseFilename,
          baseType,

          baseLangRe = /^baseLang/,
          baseLocaleRe = /^baseLocale/,
          baseLangLocaleRe = /^baseLangLocale/;

      if (typeof filename === 'string') {
        baseFilename = path.basename(filename);

        if (baseFilename.match(baseLangLocaleRe)) {
          baseType = type.LangLocale;
        } else if (baseFilename.match(baseLocaleRe)) {
          baseType = type.Locale;
        } else if (baseFilename.match(baseLangRe)) {
          baseType = type.Lang;
        }
      }


      return baseType;
    },

    isBaseFilename : function (filename) {
      return this.getBaseType(filename) ? true : false;
    },

    // based on type, return all possible filename combinations
    // needed to support the given type, with given lang and locale supports.
    getFilenameArr : function (ISOType, opts) {
      var langArr = opts.supportedLangArr,
          localeArr = opts.supportedLocaleArr,
          ISOTypes = this.type,
          filenameArr = [];

      if (ISOType === ISOTypes.Lang) {
        filenameArr = langArr;
      } else if (ISOType === ISOTypes.Locale) {
        filenameArr = localeArr;
      } else if (ISOType === ISOTypes.LangLocale) {
        langArr.map(function (lang) {
          localeArr.map(function (locale) {
            filenameArr.push(lang + '_' + locale);
          });
        });
      }

      return filenameArr;
    }
     */
  };

}());