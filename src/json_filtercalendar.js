const json_rmns = require('./json_rmns');

module.exports = (o => {
  // if no items are specified, all items are kept,
  // else specifically listed items are kept
  o = (obj, arr) => Array.isArray(arr)
    ? Object.keys(o).reduce((prev, fnname) => (
      arr.includes(fnname.slice(2))
        ? prev
        : o[fnname](prev)
    ), obj) : obj;

  o.rmbuddhist = obj => json_rmns.rm(
    obj, 'dates.calendars.buddhist');

  o.rmchinese = obj => json_rmns.rm(
    obj, 'dates.calendars.chinese');

  o.rmcoptic = obj => json_rmns.rm(
    obj, 'dates.calendars.coptic');

  o.rmdangi = obj => json_rmns.rm(
    obj, 'dates.calendars.dangi');

  o.rmethiopic = obj => json_rmns.rm(
    obj, 'dates.calendars.ethiopic');

  o.rmethiopicAmeteAlem = obj => json_rmns.rm(
    obj, 'dates.calendars.ethiopic-amete-alem');

  o.rmgregorian = obj => json_rmns.rm(
    obj, 'dates.calendars.gregorian');

  o.rmhebrew = obj => json_rmns.rm(
    obj, 'dates.calendars.hebrew');

  o.rmindian = obj => json_rmns.rm(
    obj, 'dates.calendars.indian');

  o.rmislamic = obj => json_rmns.rm(
    obj, 'dates.calendars.islamic');

  o.rmislamicCivil = obj => json_rmns.rm(
    obj, 'dates.calendars.islamic-civil');

  o.rmjapanese = obj => json_rmns.rm(
    obj, 'dates.calendars.japanese');

  o.rmpersian = obj => json_rmns.rm(
    obj, 'dates.calendars.persian');

  o.rmroc = obj => json_rmns.rm(
    obj, 'dates.calendars.roc');

  return o;
})({});
