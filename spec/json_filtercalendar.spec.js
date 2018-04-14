const json_filtercalendar = require('../src/json_filtercalendar');
const json_rmns = require('../src/json_rmns');

describe('json_filtercalendar', () => {
  [ ['dates.calendars.buddhist', 'getRmBuddhist'],
    ['dates.calendars.chinese', 'getRmChinese'],
    ['dates.calendars.coptic', 'getRmCoptic'],
    ['dates.calendars.dangi', 'getRmDangi'],
    ['dates.calendars.ethiopic', 'getRmEthiopic'],
    ['dates.calendars.ethiopic-amete-alem', 'getRmEthiopicAmeteAlem'],
    ['dates.calendars.gregorian', 'getRmGregorian'],
    ['dates.calendars.hebrew', 'getRmHebrew'],
    ['dates.calendars.indian', 'getRmIndian'],
    ['dates.calendars.islamic', 'getRmIslamic'],
    ['dates.calendars.islamic-civil', 'getRmIslamicCivil'],
    ['dates.calendars.japanese', 'getRmJapanese'],
    ['dates.calendars.persian', 'getRmPersian'],
    ['dates.calendars.roc', 'getRmRoc'] ].map(([ns, fn]) => {
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

    en_UScodes = json_filtercalendar.filterAll(en_UScodes, { keepCalendars : [
      'ethiopic',
      'japanese' ] });

    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.buddhist' ) ).toBe( 'undefined' );
    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.coptic' ) ).toBe( 'undefined' );
    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.ethiopic' ) ).toBe( 'object' );
    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.japanese' ) ).toBe( 'object' );
  });
});

