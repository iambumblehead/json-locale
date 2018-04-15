const json_filtercalendaritems = require('../src/json_filtercalendaritems');
//const json_filter = require('../src/json_filter');
const json_rmns = require('../src/json_rmns');

describe('json_filtercalendaritems', () => {
  [['dates.calendars.coptic.months', 'rmmonths'],
   ['dates.calendars.coptic.days', 'rmdays'],
   ['dates.calendars.coptic.quarters', 'rmquarters'],
   ['dates.calendars.coptic.eras', 'rmeras'],
   ['dates.calendars.coptic.dateFormats', 'rmdateFormats'],
   ['dates.calendars.coptic.timeFormats', 'rmtimeFormats'],
   ['dates.calendars.coptic.dateTimeFormats', 'rmdateTimeFormats'],
   ['dates.calendars.gregorian.fields', 'rmfields'],
   ['dates.calendars.coptic.dayPeriods', 'rmdayPeriods']].map(([ns, fn]) => {
     it(`should remove '${ns.split('.').reverse()[0]}' calendar items`, () => {      
       let en_UScodes = require('../JSONlocale/main/en_US.json');

       expect( typeof json_rmns.lookup(en_UScodes, ns) ).toBe( 'object' );

       en_UScodes = json_filtercalendaritems[fn](en_UScodes);

       expect( typeof json_rmns.lookup(en_UScodes, ns) ).toBe( 'undefined' );
     });
   });

  it('should filter lists of calendarsitems', () => {
    let en_UScodes = require('../JSONlocale/main/en_US.json');

    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.coptic.months' ) ).toBe( 'object' );
    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.coptic.days' ) ).toBe( 'object' );
    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.coptic.dateFormats' ) ).toBe( 'object' );
    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.coptic.timeFormats' ) ).toBe( 'object' );

    en_UScodes = json_filtercalendaritems(en_UScodes, [
      'months',
      'dateFormats' ]);

    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.coptic.months' ) ).toBe( 'object' );
    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.coptic.days' ) ).toBe( 'undefined' );
    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.coptic.dateFormats' ) ).toBe( 'object' );
    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.coptic.timeFormats' ) ).toBe( 'undefined' );
  });
});

describe('json_filtercalendaritems.replace_yy', () => {
  it('should convert yy to yyyy whe `isConvert_yy`', () => {

    let en_UScodes = require('../JSONlocale/main/en_US.json');

    expect(
      json_rmns.lookup(en_UScodes, 'dates.calendars.gregorian.dateFormats.short.dateFormat.pattern' )
    ).toBe( 'M/d/yy' );
    
    en_UScodes = json_filtercalendaritems.replace_yy(en_UScodes);

    expect(
      json_rmns.lookup(en_UScodes, 'dates.calendars.gregorian.dateFormats.short.dateFormat.pattern' )
    ).toBe( 'M/d/yyyy' );
  });
});
