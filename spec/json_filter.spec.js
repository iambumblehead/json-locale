const json_filter = require('../src/json_filter');
const json_rmns = require('../src/json_rmns');

describe('json_filter', () => {
  [ ['identity', 'getRmIdentity'],
    ['localeDisplayNames.languages', 'getRmLanguages'],
    ['listPatterns', 'getRmListPatterns'],
    ['localeDisplayNames.localeDisplayPattern', 'getRmDisplayPattern'],
    ['localeDisplayNames.scripts', 'getRmScripts'],
    ['localeDisplayNames.territories', 'getRmTerritories'],
    ['localeDisplayNames.variants', 'getRmVariants'],
    ['localeDisplayNames.keys', 'getRmKeys'],
    ['localeDisplayNames.types', 'getRmTypes'],
    ['localeDisplayNames.measurementSystemNames', 'getRmMeasurements'],
    ['localeDisplayNames.codePatterns', 'getRmCodePatterns'],
    ['delimiters', 'getRmDelimiters'],
    ['layout', 'getRmLayouts'],
    ['characters', 'getRmCharacters'],
    ['dates.calendars', 'getRmCalendars'],
    ['dates.timeZoneNames', 'getRmTimeZoneNames'],
    ['numbers', 'getRmNumbers'],
    ['numbers.currencies', 'getRmCurrencies'],
    ['units', 'getRmUnits'],
    ['posix', 'getRmPosix'],
    ['layout', 'getRmLayouts'] ].map(([ns, fn]) => {
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

    en_UScodes = json_filter.filterAll(en_UScodes, {
      keep : [
        'identity',
        'displayPattern',
        'types'
      ]
    });

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
