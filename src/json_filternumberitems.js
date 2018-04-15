const json_rmns = require('./json_rmns');

module.exports = (o => {
  // if no items are specified, all items are kept,
  // else specifically listed items are kept
  o = (obj, arr) => Array.isArray(arr)
    ? Object.keys(o).reduce((prev, fnname) => (
      arr.includes(fnname.slice(2)) || !/^rm/.test(fnname)
        ? prev
        : o[fnname](prev)
    ), obj) : obj;

  o.rmdecimalFormatsNumberSystemLatn = obj => json_rmns
    .rm(obj, 'numbers.decimalFormats-numberSystem-latn');

  o.rmsymbolsNumberSystemLatn = obj => json_rmns
    .rm(obj, 'numbers.symbols-numberSystem-latn');

  o.rmcurrencyFormatsNumberSystemLatn = obj => json_rmns
    .rm(obj, 'numbers.currencyFormats-numberSystem-latn');

  o.rmcurrencies = obj => json_rmns
    .rm(obj, 'numbers.currencies');

  return o;
})({});
