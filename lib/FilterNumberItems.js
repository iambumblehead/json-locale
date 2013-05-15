var util = require('util');

var FilterNumberItems = module.exports = (function () {

  var getValueAtNamespaceStr = function (namespaceStr, obj) {
    // from carlocci in #javascript
    return namespaceStr.split('.').reduce(function(a, b) { 
      return (a) ? a[b] : null; 
    }, obj);
  };

  var filter = {

    getRmDecimalFormatsNumberSystemLatn : function (zendObj) {
      if (getValueAtNamespaceStr('numbers.decimalFormats-numberSystem-latn', zendObj)) {
        delete zendObj.numbers['decimalFormats-numberSystem-latn'];
      }
      return zendObj;
    },

    getRmSymbolsNumberSystemLatn : function (zendObj) {
      if (getValueAtNamespaceStr('numbers.symbols-numberSystem-latn', zendObj)) {
        delete zendObj.numbers['symbols-numberSystem-latn'];
      }
      return zendObj;
    },


    getRmCurrencyFormatsNumberSystemLatn : function (zendObj) {
      if (getValueAtNamespaceStr('currencyFormats-numberSystem-latn', zendObj)) {
        delete zendObj.numbers['currencyFormats-numberSystem-latn'];
      }
      return zendObj;
    },



    getRmCurrencies : function (zendObj) {
      if (getValueAtNamespaceStr('numbers.currencies', zendObj)) {
        delete zendObj.numbers.currencies;
      }
      return zendObj;
    }
  };


  var filterMap = {
    currencyFormatsNumberSystemLatn : filter.getRmCurrencyFormatsNumberSystemLatn,
    symbolsNumberSystemLatn         : filter.getRmSymbolsNumberSystemLatn,
    decimalFormatsNumberSystemLatn  : filter.getRmDecimalFormatsNumberSystemLatn,
    currencies                      : filter.getRmCurrencies
  };
  

  return {
    filterAll : function (obj, opts) {
      var numbersArr = opts.keepNumbersItems || [];
      for (var o in filterMap) {
        if (filterMap.hasOwnProperty(o)) {
          if (numbersArr.indexOf(o) === -1) {
            obj = filterMap[o](obj, opts);
          }
        }
      }
      return obj;
    }
  };

}());
