const json_filter = require('../src/json_filter');
const json_opts = require('../src/json_opts');
const json_rmns = require('../src/json_rmns');

describe('json_filter', () => {
  [ ['identity', 'rmidentity'],
    ['localeDisplayNames.languages', 'rmlanguages'],
    ['listPatterns', 'rmlistPatterns'],
    ['localeDisplayNames.localeDisplayPattern', 'rmdisplayPattern'],
    ['localeDisplayNames.scripts', 'rmscripts'],
    ['localeDisplayNames.territories', 'rmterritories'],
    ['localeDisplayNames.variants', 'rmvariants'],
    ['localeDisplayNames.keys', 'rmkeys'],
    ['localeDisplayNames.types', 'rmtypes'],
    ['localeDisplayNames.measurementSystemNames', 'rmmeasurements'],
    ['localeDisplayNames.codePatterns', 'rmcodePatterns'],
    ['delimiters', 'rmdelimiters'],
    ['layout', 'rmlayouts'],
    ['characters', 'rmcharacters'],
    ['dates.calendars', 'rmcalendars'],
    ['dates.timeZoneNames', 'rmtimeZoneNames'],
    ['numbers', 'rmnumbers'],
    ['numbers.currencies', 'rmcurrencies'],
    ['units', 'rmunits'],
    ['posix', 'rmposix'],
    ['layout', 'rmlayouts'] ].map(([ns, fn]) => {
    it(`should remove '${ns.split('.').reverse()[0]}' item`, () => {
      let en_UScodes = require('../JSONlocale/main/en_US.json');
      
      expect( typeof json_rmns.lookup(en_UScodes, ns) ).toBe( 'object' );
      
      en_UScodes = json_filter[fn](en_UScodes);

      expect( typeof json_rmns.lookup(en_UScodes, ns) ).toBe( 'undefined' );      
    });
  });

  it('should filter lists of items', () => {
    let en_UScodes = require('../JSONlocale/main/en_US.json');

    expect( typeof json_rmns.lookup(en_UScodes, 'identity' ) ).toBe( 'object' );
    expect( typeof json_rmns.lookup(en_UScodes, 'localeDisplayNames.localeDisplayPattern' ) ).toBe( 'object' );
    expect( typeof json_rmns.lookup(en_UScodes, 'localeDisplayNames.types' ) ).toBe( 'object' );
    expect( typeof json_rmns.lookup(en_UScodes, 'localeDisplayNames.codePatterns' ) ).toBe( 'object' );
    expect( typeof json_rmns.lookup(en_UScodes, 'localeDisplayNames.keys' ) ).toBe( 'object' );
    expect( typeof json_rmns.lookup(en_UScodes, 'layout' ) ).toBe( 'object' );

    en_UScodes = json_filter(en_UScodes, [
      'identity',
      'displayPattern',
      'types'
    ], {});

    expect( typeof json_rmns.lookup(en_UScodes, 'identity' ) ).toBe( 'object' );
    expect( typeof json_rmns.lookup(en_UScodes, 'localeDisplayNames.localeDisplayPattern' ) ).toBe( 'object' );
    expect( typeof json_rmns.lookup(en_UScodes, 'localeDisplayNames.types' ) ).toBe( 'object' );
    expect( typeof json_rmns.lookup(en_UScodes, 'localeDisplayNames.codePatterns' ) ).toBe( 'undefined' );
    expect( typeof json_rmns.lookup(en_UScodes, 'localeDisplayNames.keys' ) ).toBe( 'undefined' );
    expect( typeof json_rmns.lookup(en_UScodes, 'layout' ) ).toBe( 'undefined' );
  });
});

describe('json_filter.getISOConverted', () => {
  it('should update inline data ISO-639-2', () => {
    let en_UScodes = require('../JSONlocale/main/en_US.json');

    expect( json_rmns.lookup(en_UScodes, 'identity.language' ) ).toBe( 'en' );
    expect( en_UScodes.localeDisplayNames.languages.jpn ).toBe( undefined );

    en_UScodes = json_filter.getISOConverted(en_UScodes, {
      isoType: 'ISO-639-2'
    });

    expect( json_rmns.lookup(en_UScodes, 'identity.language' ) ).toBe( 'eng' );
    expect( en_UScodes.localeDisplayNames.languages.jpn ).toBe( 'Japanese');
  });

  it('should update inline data ISO-639-1', () => {
    let en_UScodes = require('../JSONlocale/main/en_US.json');

    expect( json_rmns.lookup(en_UScodes, 'identity.language' ) ).toBe( 'en' );
    
    en_UScodes = json_filter.getISOConverted(en_UScodes, {
      isoType: 'ISO-639-1'
    });

    expect( json_rmns.lookup(en_UScodes, 'identity.language' ) ).toBe( 'en' );    
  });  
});

