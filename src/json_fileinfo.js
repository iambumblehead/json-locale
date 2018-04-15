const fs = require('fs'),
      path = require('path'),
      nodefs = require('node-fs'),
      pathpublic = require('pathpublic'),

      json_iso = require('./json_iso');

module.exports = (o => {
  o.read = (filename, fn) =>
    fs.readFile(filename, 'utf8', fn);

  o.write = (filename, opts, content, fn) => {
    const writename = json_iso.getISOConvertedFilename(opts, filename),
          writenamepath = pathpublic.get(writename, opts.outputDir);

    console.log(`[...] write: ${writenamepath}`);
    fs.writeFile(path.resolve(writenamepath), content, fn);
  };

  // only creates the path if it does not exist
  // https://github.com/bpedro/node-fs/blob/master/lib/fs.js
  //
  // create ISO related path
  o.createPath = (directory, fn) =>
    fs.stat(directory, (err, stat) => (
      stat && stat.isDirectory()
        ? fn(null, directory)
        : nodefs.mkdir(directory, 755, true, fn)));

  o.writeObjJSONToPath = (info, obj, opts, path, fn) =>
    o.createPath(info.outputDir, err => {
      if (err) return fn(err);

      o.write(path, opts, JSON.stringify(obj, null, 2), fn);
    });

  o.writeObjJSON = (info, obj, opts, fn) =>
    o.writeObjJSONToPath(
      info, obj, opts, path.join(info.outputDir, info.filename), fn);

  o.readJSON = (info, fn) => {
    o.read(path.join(info.inputDir, info.filename), (err, res) => {
      if (err) return fn(err);

      try {
        res = JSON.parse(res);
      } catch (e) {
        console.error(e);
      }

      fn(null, res);
    });
  };

  o.filenamesFiltered = (opts, filenamearr) => {
    filenamearr = filenamearr.filter(filename => (
      filename.match(/\.json$/)));

    if (opts.localeFilterArr) {
      filenamearr = filenamearr.filter(filename => (
        json_iso.isFilenameInFilter(opts, filename)
      ));
    }

    return filenamearr;
  };

  o.create = ({ filename, inputDir, outputDir }) => ({
    filename,
    inputDir,
    outputDir
  });

  return o;
})({});
