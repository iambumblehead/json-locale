
const json_rmns = require('./json_rmns');

module.exports = (o => {
  o.getRmBuddhist = obj => json_rmns.rm(
    obj, 'dates.calendars.buddhist');

  o.getRmChinese = obj => json_rmns.rm(
    obj, 'dates.calendars.chinese');

  o.getRmCoptic = obj => json_rmns.rm(
    obj, 'dates.calendars.coptic');

  o.getRmDangi = obj => json_rmns.rm(
    obj, 'dates.calendars.dangi');

  o.getRmEthiopic = obj => json_rmns.rm(
    obj, 'dates.calendars.ethiopic');

  o.getRmEthiopicAmeteAlem = obj => json_rmns.rm(
    obj, 'dates.calendars.ethiopic-amete-alem');

  o.getRmGregorian = obj => json_rmns.rm(
    obj, 'dates.calendars.gregorian');

  o.getRmHebrew = obj => json_rmns.rm(
    obj, 'dates.calendars.hebrew');

  o.getRmIndian = obj => json_rmns.rm(
    obj, 'dates.calendars.indian');

  o.getRmIslamic = obj => json_rmns.rm(
    obj, 'dates.calendars.islamic');

  o.getRmIslamicCivil = obj => json_rmns.rm(
    obj, 'dates.calendars.islamic-civil');

  o.getRmJapanese = obj => json_rmns.rm(
    obj, 'dates.calendars.japanese');

  o.getRmPersian = obj => json_rmns.rm(
    obj, 'dates.calendars.persian');

  o.getRmRoc = obj => json_rmns.rm(
    obj, 'dates.calendars.roc');

  // using rm prefix only...
  var filterMap = {
    buddhist          : o.getRmBuddhist,
    chinese           : o.getRmChinese,
    coptic            : o.getRmCoptic,
    dangi             : o.getRmDangi,
    ethiopic          : o.getRmEthiopic,
    ethiopicAmeteAlem : o.getRmEthiopicAmeteAlem,
    gregorian         : o.getRmGregorian,
    hebrew            : o.getRmHebrew,
    indian            : o.getRmIndian,
    islamic           : o.getRmIslamic,
    islamicCivil      : o.getRmIslamicCivil,
    japanese          : o.getRmJapanese,
    persian           : o.getRmPersian,
    roc               : o.getRmRoc
  };

  o.filterAll = (obj, opts) => {
    var calendarsArr = opts.keepCalendars || [];

    return Object.keys(filterMap).reduce((prev, key) => (
      calendarsArr.includes(key)
        ? prev
        : filterMap[key](prev)), obj);
  };

  return o;

})({});
