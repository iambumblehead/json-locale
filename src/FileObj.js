var fs = require('fs'),
    path = require('path'),
    util = require('util'),
    nodefs = require('node-fs'),
    pathpublic = require('pathpublic'),
    ISOUtil = require('./json_iso'),
    Filter = require('./json_filter');

module.exports = (o => {

  var fileObj = {
    filename : '',
    inputDir : '',
    outputDir : '',

    read : (filename, fn) => {
      fs.readFile(filename, 'utf8', fn);
    },

    write : function (filename, opts, content, fn) {
      var writename = ISOUtil.getISOConvertedFilename(opts, filename),
          writenamepath = pathpublic.get(writename, opts.outputDir);
      
      console.log('[...] write: ' + writenamepath);
      fs.writeFile(path.resolve(writenamepath), content, fn);
    },

    getOutputPathJSONFull : function () {
      var that = this,
          filename = that.filename,
          pathJSON = that.outputDir;

      return path.join(pathJSON, filename);          
    },

    getOutputPathJSONDefaultFull : function () {
      var that = this,
          filename = 'baseLangLocale.json',
          pathJSON = that.outputDir;

      return path.join(pathJSON, filename);          
    },

    getInputPathJSONFull : function () {
      var that = this,
          filename = that.filename,
          pathJSON = that.inputDir;

      return path.join(pathJSON, filename);          
    },

    // only creates the path if it does not exist
    // https://github.com/bpedro/node-fs/blob/master/lib/fs.js
    // 
    // create ISO related path
    createPath : function (directory, fn) {
      fs.stat(directory, function (err, stat) { 
        if (stat && stat.isDirectory()) {
          fn(null, directory);
        } else {
          nodefs.mkdir(directory, 0755, true, function (err, res) {
            if (err) return fn(err);
            fn(err, res);
          });
        }
      });
    },

    writeObjJSONToPath : function (obj, opts, path, fn) {
      var that = this,
          str = JSON.stringify(obj, null, 2);

      that.createPath(that.outputDir, function (err, res) {
        if (err) return fn(err);
        that.write(path, opts, str, fn);
      });    
    },

    writeObjJSON : function (obj, opts, fn) {
      this.writeObjJSONToPath(obj, opts, this.getOutputPathJSONFull(), fn);
    },

    writeObjDefaultJSON : function (obj, opts, fn) {
      this.writeObjJSONToPath(obj, opts, this.getOutputPathJSONDefaultFull(), fn);      
    },

    getFiltered : function (obj, opts, fn) {
      var that = this,
          pathJSONFull = that.getInputPathJSONFull();
          
      this.read(pathJSONFull, function (err, res) {
        if (err) return fn(err);
          
        res = JSON.parse(res);
        res = Filter.filterAll(res, opts);

        fn(null, res);
      });
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

})({});
