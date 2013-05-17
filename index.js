var JSONLocale = require('./json-locale'),
    UserOptions = require('./lib/UserOptions.js');

module.exports = {
  convert : function (ops, fn) {
    var o = UserOptions.getNew(ops);
    JSONLocale.convert(o, fn);
  }  
};