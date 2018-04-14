
const json_rmns = require('./json_rmns');

module.exports = (o => {
  o.getRmDecimalFormatsNumberSystemLatn = obj => json_rmns
    .rm(obj, 'numbers.decimalFormats-numberSystem-latn');

  o.getRmSymbolsNumberSystemLatn = obj => json_rmns
    .rm(obj, 'numbers.symbols-numberSystem-latn');

  o.getRmCurrencyFormatsNumberSystemLatn = obj => json_rmns
    .rm(obj, 'numbers.currencyFormats-numberSystem-latn');

  o.getRmCurrencies = obj => json_rmns
    .rm(obj, 'numbers.currencies');

  var filterMap = {
    currencyFormatsNumberSystemLatn : o.getRmCurrencyFormatsNumberSystemLatn,
    symbolsNumberSystemLatn         : o.getRmSymbolsNumberSystemLatn,
    decimalFormatsNumberSystemLatn  : o.getRmDecimalFormatsNumberSystemLatn,
    currencies                      : o.getRmCurrencies
  };

  // items listed in the filter are... kept
  o.filterAll = (obj, opts) => {
    var numbersArr = opts.keepNumbersItems || [];

    return Object.keys(filterMap).reduce((prev, key) => (
      numbersArr.includes(key)
        ? prev
        : filterMap[key](prev)), obj);
  };

  return o;

})({});
