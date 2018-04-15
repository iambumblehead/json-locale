const json_filtercalendar = require('../src/json_filtercalendar'),
      json_rmns = require('../src/json_rmns'),
      json_opts = require('../src/json_opts');

describe('json_filtercalendar', () => {
  [ ['dates.calendars.buddhist', 'rmbuddhist'],
    ['dates.calendars.chinese', 'rmchinese'],
    ['dates.calendars.coptic', 'rmcoptic'],
    ['dates.calendars.dangi', 'rmdangi'],
    ['dates.calendars.ethiopic', 'rmethiopic'],
    ['dates.calendars.ethiopic-amete-alem', 'rmethiopicAmeteAlem'],
    ['dates.calendars.gregorian', 'rmgregorian'],
    ['dates.calendars.hebrew', 'rmhebrew'],
    ['dates.calendars.indian', 'rmindian'],
    ['dates.calendars.islamic', 'rmislamic'],
    ['dates.calendars.islamic-civil', 'rmislamicCivil'],
    ['dates.calendars.japanese', 'rmjapanese'],
    ['dates.calendars.persian', 'rmpersian'],
    ['dates.calendars.roc', 'rmroc'] ].map(([ns, fn]) => {
    it(`should remove '${ns.split('.').reverse()[0]}' calendar items`, () => {
      let en_UScodes = require('../JSONlocale/main/en_US.json');
      
      expect( typeof json_rmns.lookup(en_UScodes, ns) ).toBe( 'object' );
      
      en_UScodes = json_filtercalendar[fn](en_UScodes);

      expect( typeof json_rmns.lookup(en_UScodes, ns) ).toBe( 'undefined' );      
    });
  });

  it('should filter lists of calendars', () => {
    let en_UScodes = require('../JSONlocale/main/en_US.json');

    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.buddhist' ) ).toBe( 'object' );
    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.coptic' ) ).toBe( 'object' );
    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.ethiopic' ) ).toBe( 'object' );
    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.japanese' ) ).toBe( 'object' );

    en_UScodes = json_filtercalendar(en_UScodes, [
      'ethiopic',
      'japanese' ]);

    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.buddhist' ) ).toBe( 'undefined' );
    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.coptic' ) ).toBe( 'undefined' );
    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.ethiopic' ) ).toBe( 'object' );
    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.japanese' ) ).toBe( 'object' );
  });

  it('should retain all calendars, if no calendars specified', () => {
    let en_UScodes = require('../JSONlocale/main/en_US.json');

    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.buddhist' ) ).toBe( 'object' );
    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.coptic' ) ).toBe( 'object' );
    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.ethiopic' ) ).toBe( 'object' );
    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.japanese' ) ).toBe( 'object' );

    en_UScodes = json_filtercalendar(en_UScodes, false);

    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.buddhist' ) ).toBe( 'object' );
    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.coptic' ) ).toBe( 'object' );
    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.ethiopic' ) ).toBe( 'object' );
    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.japanese' ) ).toBe( 'object' );
  });

  it('should retain no calendars, if empty calendar set specified', () => {
    let en_UScodes = require('../JSONlocale/main/en_US.json');

    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.buddhist' ) ).toBe( 'object' );
    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.coptic' ) ).toBe( 'object' );
    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.ethiopic' ) ).toBe( 'object' );
    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.japanese' ) ).toBe( 'object' );

    en_UScodes = json_filtercalendar(en_UScodes, []);

    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.buddhist' ) ).toBe( 'undefined' );
    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.coptic' ) ).toBe( 'undefined' );
    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.ethiopic' ) ).toBe( 'undefined' );
    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.japanese' ) ).toBe( 'undefined' );
  });
});

