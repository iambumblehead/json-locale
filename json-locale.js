var UserOptions = require('./lib/UserOptions'),
    FileObj = require('./lib/FileObj'),

    fs = require('fs'),
    util = require('util'),
    path = require('path'),
    argv = require('optimist').argv,
    opts = UserOptions.getNew(argv);

var converter = {
  convert : function (opts, fn) {
    var that = this, 
        fileObjArr = [],
        baseFilenameArr;

    fs.readdir(opts.inputDir, function (err, filenameArr) {
      if (err) return fn(err);

      filenameArr = filenameArr.filter(function (filename) {
        return filename.match(/\.json$/) ? true : false;
      });      


      console.log(opts, opts.inputDir, opts.outputDir);
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
          fileObj.writeObjJSON(filteredObj, function (err, res) {
            if (err) return fn(err);
            next(x);
          });
        });
      }(fileObjArr.length));      

    });
  }
};

converter.convert(opts, function (err, res) {
  if (err) return console.log(err);
  console.log('[...] finished.');
});