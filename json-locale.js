var UserOptions = require('./lib/UserOptions'),
    FileObj = require('./lib/FileObj'),
    ISOUtil = require('./lib/ISO/isoutil.js'),

    fs = require('fs'),
    util = require('util'),
    path = require('path'),
    argv = require('optimist').argv;

var converter = module.exports = {
  convert : function (opts, fn) {

    console.log('convert co', opts);

    var fileObjArr = [];

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


      (function next(x, fileObj) {
        if (!x--) return fn(null, '[...] done.'); 
        fileObj = fileObjArr[x];
        fileObj.getFiltered(fileObj, opts, function (err, filteredObj) {
          if (err) return fn(err);
          fileObj.writeObjJSON(filteredObj, opts, function (err, res) {
            if (err) return fn(err);
            next(x);
          });
        });
      }(fileObjArr.length));      
    });
  }
};

// if called from command line...
if (require.main === module) {
  var opts = UserOptions.getNew(argv);
  converter.convert(opts, function (err, res) {
    if (err) return console.log(err);
    console.log('[...] finished.');
  });
} 

