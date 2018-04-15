const fs = require('fs'),

      json_iso = require('./json_iso'),
      json_opts = require('./json_opts'),
      json_filter = require('./json_filter'),
      json_fileinfo = require('./json_fileinfo');

module.exports = (o => {
  o = (opts, fn) =>
    o.convert(opts, fn);

  o.writeLocaleFiles = (fileinfoarr, opts, fn) => {
    (function next (x, fileinfo) {
      if (!x--) return fn(null, '[...] json-locale: done.');
      fileinfo = fileinfoarr[x];

      json_fileinfo.readJSON(fileinfo, (err, obj) => {
        if (err) return fn(err);

        obj = json_filter(obj, opts.keep, opts);

        json_fileinfo.writeObjJSON(fileinfo, obj, opts, err => {
          if (err) return fn(err);

          next(x);
        });
      });
    }(fileinfoarr.length));
  };

  o.writeLocaleFileDefault = (fileinfoarr, opts, localeDefault, fn) => {
    if (!localeDefault)
      return fn(null, null);

    json_fileinfo.readJSON({
      filename : json_iso.getISOConvertedFilename(opts, localeDefault),
      inputDir : opts.outputDir
    }, (err, obj) => {
      if (obj) {
        json_fileinfo.writeObjJSON({
          filename : 'baseLangLocale.json',
          outputDir : opts.outputDir
        }, obj, opts, fn);
      } else
        return fn(null, null);
    });
  };

  o.convert = (opts, fn) => {
    opts = json_opts(opts);

    fs.readdir(opts.inputDir, (err, filenameArr) => {
      if (err) return fn(err);

      let fileinfoarr = json_fileinfo
        .filenamesFiltered(opts, filenameArr)
        .map(filename => json_fileinfo.create({
          filename,
          inputDir : opts.inputDir,
          outputDir : opts.outputDir }));

      o.writeLocaleFiles(fileinfoarr, opts, err => {
        if (err) return fn(err);

        o.writeLocaleFileDefault(fileinfoarr, opts, opts.localeDefault, fn);
      });
    });
  };

  return o;
})({});
