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

    // if no items are specified, all items are kept.
    finopt.keep = castas.arr(
      opt.keep, /true/i.test(opt.keep));

    finopt.keepCalendars = castas.arr(
      opt.keepCalendars, /true/i.test(opt.keepCalendars));

    finopt.keepCalendarsItems = castas.arr(
      opt.keepCalendarsItems, /true/i.test(opt.keepCalendarsItems));

    finopt.keepNumberItems = castas.arr(
      opt.keepNumberItems, /true/i.test(opt.keepNumberItems));

    return finopt;
  };

  return o;
})({});
