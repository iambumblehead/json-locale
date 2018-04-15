const path = require('path'),
      langArr = require('./json_langarr');

module.exports = (o => {
  // ex, 'es',
  //
  // { code: 'spa',
  //   language: [
  //     'es', 'Spanish; Castilian', 'espagnol; castillan'
  //   ]
  // }
  //
  o.getISOObjForLang = lang => langArr.find(
    ({ code, language }) => code === lang || language.includes(lang)) || null;

  // two-letter language code is not always first
  // element in language array. fix later.
  o.getISOConvertedLang = (opts, lang) => {
    var langObj = o.getISOObjForLang(lang),
        langFin = null;

    if (langObj) {
      if (opts.isoType === 'ISO-639-1' &&
          langObj.language[0].match(/\S\S\S?/)) {

        langFin = langObj.language.sort(
          (langa, langb) => langa.length > langb.length ? 1 : -1)[0];
      } else {
        langFin = langObj.code;          
      }

      if (opts.isConvert_underscore)
        langFin = langFin.replace(/_/, '-');
    }

    return langFin;
  };

  // takes a single filename and returns the final filename
  // as determined by ISO type
  // 
  // az_Latn_AZ.json aze_Latn_AZ 
  o.getISOConvertedFilename = (opts, filename) => {
    var basename = path.basename(filename),
        newfname = basename.replace(/^[a-z]*/, match => (
          o.getISOConvertedLang(opts, match) || match));

    if (opts.isConvert_underscore)
      newfname = newfname.replace(/_/, '-');          

    if (path.extname(newfname) !== '.json')
      newfname += '.json';

    return filename.replace(basename, newfname);
  };

  o.getISOLangLocaleAtStr = (opts, filename) => {
    var ISOLang,
        langLocale,
        extname = path.extname(filename);

    langLocale = filename.replace(/^[a-z]*/, match => (
      o.getISOConvertedLang(opts, match) || match));

    langLocale = path.basename(langLocale, extname);
    return langLocale;
  };
  
  o.isFilenameInFilter = (opts, filename) => {
    var isFilename = false,
        localeFilterArr = opts.localeFilterArr,
        ISOLangAtFilename  = o.getISOLangLocaleAtStr(opts, filename);      

    localeFilterArr.map(function (locale) {
      // en-US,
      // spa-ES,
      // spa-CL
      var ISOFilter = o.getISOLangLocaleAtStr(opts, locale);        
      if (ISOFilter.replace(/-|_/gi, 'x') === ISOLangAtFilename.replace(/-|_/gi, 'x')) {
        isFilename = true;
      }
    });

    return isFilename;
  };

  return o;
})({});
