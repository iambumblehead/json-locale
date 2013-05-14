var fs = require('fs'),
    path = require('path'),
    util = require('util'),
    Filter = require('./Filter');

var FileObj = module.exports = (function() {

  var fileObj = {
    filename : '',
    inputDir : '',
    outputDir : '',

    read : function (filename, fn) {
      fs.readFile(filename, 'utf8', fn);
    },
    write : function (filename, content, fn) {
      console.log('[...] write: ' + filename);
      fs.writeFile(filename, content, fn);
    },

    getOutputPathJSONFull : function () {
      var that = this,
          filename = that.filename,
          pathJSON = that.outputDir;

      return path.join(pathJSON, filename);          
    },

    writeObjJSON : function (obj, fn) {
      var that = this,
          pathJSONFull = that.getOutputPathJSONFull(),
          str = JSON.stringify(obj, null, 2);

      that.write(pathJSONFull, str, fn);
    },

    getFiltered : function (obj, opts, fn) {
      obj = Filter.filterAll(obj, opts);
      fn(null, obj);
    }
    
  };

  return {
    getNew : function (spec) {  
      var that = Object.create(fileObj);
      that.filename = spec.filename;
      that.inputDir = spec.inputDir;
      that.outputDir = spec.outputDir;
      return that;
    }
  };

}());