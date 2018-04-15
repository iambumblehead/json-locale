const path = require('path'),
      castas = require('castas');

module.exports = (o => {
  o = opts =>
    o.get(opts);
  
  o.get = (opt = {}) => {
    let finopt = {};
    
    finopt.inputDir = castas.str(opt.inputDir, path.join(__dirname, '/../JSONlocale/main'));
    finopt.outputDir = castas.str(opt.outputDir, './JSONlocaleNew');

    // three letter (639-1), two letter (639-2)
    finopt.isoType = /^639-[12]$/.test(opt.isoType)
      ? `ISO-${opt.isoType}`
      : 'ISO-639-2';

    finopt.localeDefault = castas.str(opt.localeDefault, '') || false;
    finopt.isConvert_yy = castas.bool(opt.isConvert_yy, true);
    finopt.isConvert_underscore = castas.bool(opt.isConvert_underscore, false);
    
    finopt.localeFilterArr = castas.arr(opt.localeFilter, false);
    
    finopt.keep = castas.arr(
      opt.keep, opt.keep === true ? [
        'identity',
        'languages',
        'scripts',
        'territories',
        'variants',
        'keys',
        'types',
        'measurements',
        'codePatterns',
        'layouts',
        'characters',
        'calendars',
        'currencies',
        'numbers',
        'units'
      ] : []);
    
    finopt.keepCalendars = castas.arr(
      opt.keepCalendars, opt.keepCalendars === false ? [] : [
        'buddhist',
        'chinese', 
        'coptic', 
        'dangi',
        'ethiopic',
        'ethiopicAmeteAlem',
        'gregorian',
        'hebrew', 
        'indian',
        'islamic', 
        'islamicCivil', 
        'japanese',
        'persian', 
        'roc'
      ]);

    finopt.keepCalendarsItems = castas.arr(
      opt.keepCalendarsItems, opt.keepCalendarsItems === false ? [] : [
        'months',
        'days',
        'quarters',
        'eras',
        'dateFormats',
        'timeFormats',
        'dateTimeFormats',
        'fields'
      ]);

    finopt.keepNumbersItems = castas.arr(
      opt.keepNumbersItems, opt.keepNumbersItems === false ? [] : [
        'currencyFormatsNumberSystemLatn',
        'symbolsNumberSystemLatn',
        'decimalFormatsNumberSystemLatn',
        'currencies'
      ]);

    return finopt;
  };

  return o;
})({});
