const path = require('path'),
      json_opts = require('../src/json_opts');

describe('json_opts', () => {
  it('should return options', () => {
    let opts = json_opts({
      outputDir : './locale',
      isoType : '639-1',
      keep : ['numbers'],
      keepNumberItems : [
        'currencyFormatsNumberSystemLatn',
        'symbolsNumberSystemLatn',
        'decimalFormatsNumberSystemLatn',
        'currencies'
      ],
      localeFilter : [
        'de_DE', 'de_AT', 'fr_FR', 'fr_BE', 'nl_NL', 'nl_BE'
      ]
    });

    expect( opts.inputDir ).toBe( path.join(__dirname, '/../JSONlocale/main') );
    expect( opts.outputDir ).toBe( './locale' );
    expect( opts.isoType ).toBe( 'ISO-639-1' );
    expect( opts.localeDefault ).toBe( false );
    expect( opts.isConvert_yy ).toBe( true );
    expect( opts.isConvert_underscore ).toBe( true );
    expect( opts.localeFilterArr.sort().join(',') )
      .toBe( 'de_AT,de_DE,fr_BE,fr_FR,nl_BE,nl_NL' );
    expect( opts.keep.sort().join(',') )
      .toBe( 'numbers' );
    expect( opts.keepCalendars.sort().join(',') )
      .toBe( 'buddhist,chinese,coptic,dangi,ethiopic,ethiopicAmeteAlem,gregorian,hebrew,indian,islamic,islamicCivil,japanese,persian,roc' );
    expect( opts.keepCalendarsItems.sort().join(',') )
      .toBe( 'dateFormats,dateTimeFormats,days,eras,fields,months,quarters,timeFormats' );
    expect( opts.keepNumbersItems.sort().join(',') )
      .toBe( 'currencies,currencyFormatsNumberSystemLatn,decimalFormatsNumberSystemLatn,symbolsNumberSystemLatn' );
  });
});
