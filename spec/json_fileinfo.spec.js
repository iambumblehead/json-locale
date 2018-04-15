const fs = require('fs'),
      json_opts = require('../src/json_opts'),
      json_fileinfo = require('../src/json_fileinfo');

describe('json_fileinfo.filenamesFiltered', () => {

  it(`should return json files only`, done => {
    const opts = json_opts({});
    
    fs.readdir(opts.inputDir, (err, filenamearr) => {
      if (err) throw new Error(err);

      filenamearr = json_fileinfo.filenamesFiltered(opts, filenamearr);

      expect( filenamearr.length > 1 && filenamearr
              .every(name => /\.json$/.test(name)) ).toBe( true );

      done();
    });
  });

  it(`should return localeFilterArr files only`, done => {
    const opts = json_opts({
      localeFilter: [
        'de_DE', 'de_AT', 'fr_FR', 'fr_BE', 'nl_NL', 'nl_BE' ]
    });
    
    fs.readdir(opts.inputDir, (err, filenamearr) => {
      if (err) throw new Error(err);

      filenamearr = json_fileinfo.filenamesFiltered(opts, filenamearr);

      expect( filenamearr.sort().join() )
        .toBe( 'de_AT.json,de_DE.json,fr_BE.json,fr_FR.json,nl_BE.json,nl_NL.json' );

      done();
    });
  });  
});
