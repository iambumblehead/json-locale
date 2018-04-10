var UserOptions = require('./lib/UserOptions'),
    FileObj = require('./lib/FileObj'),
    ISOUtil = require('./lib/ISO/isoutil.js'),

    fs = require('fs'),
    util = require('util'),
    path = require('path'),
    argv = require('optimist').argv;

var converter = module.exports = {

  writeLocaleFiles : function (fileObjArr, opts, fn) {
    (function next(x, fileObj) {
      if (!x--) return fn(null, '[...] json-locale: done.'); 
      fileObj = fileObjArr[x];

      fileObj.getFiltered(fileObj, opts, function (err, filteredObj) {
        if (err) return fn(err);
        fileObj.writeObjJSON(filteredObj, opts, function (err, res) {
          if (err) return fn(err);

          next(x);
        });
      });
    }(fileObjArr.length));      
  },

  writeLocaleFileDefault : function (fileObjArr, opts, localeDefault, fn) {
    var defaultFileObj = fileObjArr.filter(function (fileObj) {
      return ISOUtil.getISOConvertedFilename(opts, fileObj.filename).indexOf(localeDefault) !== -1;
    })[0];

    if (defaultFileObj) {
      defaultFileObj.getFiltered(defaultFileObj, opts, function (err, filteredObj) {
        if (err) return fn(err);
        
        defaultFileObj.writeObjDefaultJSON(filteredObj, opts, fn);
      });
    } else {
      fn(null);
    }
  },

  convert : function (opts, fn) {
    var fileObjArr = [];

    opts = UserOptions.getNew(opts);
    
    fs.readdir(opts.inputDir, function (err, filenameArr) {
      if (err) return fn(err);

      filenameArr = filenameArr.filter(function (filename) {
        return filename.match(/\.json$/) ? true : false;
      });      

      if (opts.localeFilterArr) {
        filenameArr = filenameArr.filter(function (filename) {
            return ISOUtil.isFilenameInFilter(opts, filename);
        });
      }

      fileObjArr = filenameArr.map(function (filename) {
        return FileObj.getNew({
          filename : filename,
          inputDir : opts.inputDir,
          outputDir : opts.outputDir
        });
      });

      converter.writeLocaleFiles(fileObjArr, opts, function (err, res) {
        if (err) return fn(err);

        converter.writeLocaleFileDefault(fileObjArr, opts, opts.localeDefault, fn);
      });
    });
  }
};

// if called from command line...
if (require.main === module) {
  //var opts = UserOptions.getNew(argv);

  console.log('[...] json-locale: begin.');
  converter.convert(argv, function (err, res) {
    if (err) return console.log(err);
    console.log('[...] finished.');
  });
} 

