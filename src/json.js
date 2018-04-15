const json_build = require('./json_build'),
      json_fileinfo = require('./json_fileinfo'),
      json_filter = require('./json_filter'),
      json_filternumberitems = require('./json_filternumberitems'),
      json_fileinfocalendar = require('./json_filtercalendar'),
      json_fileinfocalendaritems = require('./json_filtercalendaritems'),
      json_iso = require('./json_iso'),
      json_opts = require('./json_opts'),
      json_rmns = require('./json_rmns');

// if called from command line...
if (require.main === module) {
  console.log('[...] json-locale: begin.');
  json_build(require('yargs').argv, (err, res) => {
    if (err) return console.log(err);
    console.log('[...] finished.');
  });
} 

module.exports = (o => {
  o = (opts, fn) =>
    json_build(opts, fn);

  o.convert = (opts, fn) =>
    json_build(opts, fn);    

  o.json_build = json_build;
  o.json_fileinfo = json_fileinfo;
  o.json_fileinfocalendar = json_fileinfocalendar;
  o.json_fileinfocalendaritems = json_fileinfocalendaritems;
  o.json_filter = json_filter;
  o.json_filternumberitems = json_filternumberitems;
  o.json_iso = json_iso;
  o.json_opts = json_opts;
  o.json_rmns = json_rmns;

  return o;
})();

