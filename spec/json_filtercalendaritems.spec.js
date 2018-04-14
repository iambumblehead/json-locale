const json_filtercalendaritems = require('../src/json_filtercalendaritems');
const json_rmns = require('../src/json_rmns');

describe('json_filtercalendaritems', () => {
  [['dates.calendars.coptic.months', 'getRmMonths'],
   ['dates.calendars.coptic.days', 'getRmDays'],
   ['dates.calendars.coptic.quarters', 'getRmQuarters'],
   ['dates.calendars.coptic.eras', 'getRmEras'],
   ['dates.calendars.coptic.dateFormats', 'getRmDateFormats'],
   ['dates.calendars.coptic.timeFormats', 'getRmTimeFormats'],
   ['dates.calendars.coptic.dateTimeFormats', 'getRmDateTimeFormats'],
   ['dates.calendars.gregorian.fields', 'getRmFields'],
   ['dates.calendars.coptic.dayPeriods', 'getRmDayPeriods']].map(([ns, fn]) => {
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

    en_UScodes = json_filtercalendaritems.filterAll(en_UScodes, { keepCalendarsItems : [
      'months',
      'dateFormats' ] });

    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.coptic.months' ) ).toBe( 'object' );
    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.coptic.days' ) ).toBe( 'undefined' );
    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.coptic.dateFormats' ) ).toBe( 'object' );
    expect( typeof json_rmns.lookup(en_UScodes, 'dates.calendars.coptic.timeFormats' ) ).toBe( 'undefined' );
  });

  it('should convert yy to yyyy whe `isConvert_yy`', () => {

    let en_UScodes = require('../JSONlocale/main/en_US.json');

    expect(
      json_rmns.lookup(en_UScodes, 'dates.calendars.gregorian.dateFormats.short.dateFormat.pattern' )
    ).toBe( 'M/d/yy' );
    
    en_UScodes = json_filtercalendaritems.filterAll(en_UScodes, {
      isConvert_yy : true,
      keepCalendarsItems : [
        'months',
        'dateFormats'
      ]
    });

    expect(
      json_rmns.lookup(en_UScodes, 'dates.calendars.gregorian.dateFormats.short.dateFormat.pattern' )
    ).toBe( 'M/d/yyyy' );
  });
});
