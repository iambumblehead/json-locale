const json_filternumberitems = require('../src/json_filternumberitems');
const json_rmns = require('../src/json_rmns');

describe('json_filternumberitems', () => {
  [ ['numbers.currencies', 'rmcurrencies'],
    ['numbers.decimalFormats-numberSystem-latn', 'rmdecimalFormatsNumberSystemLatn'],
    ['numbers.symbols-numberSystem-latn', 'rmsymbolsNumberSystemLatn'],
    ['numbers.currencyFormats-numberSystem-latn', 'rmcurrencyFormatsNumberSystemLatn'],
    ['numbers.currencyFormats-numberSystem-latn', 'rmcurrencyFormatsNumberSystemLatn'] ].map(([ns, fn]) => {
    it(`should remove '${ns.split('.').reverse()[0]}' calendar items`, () => {
      let en_UScodes = require('../JSONlocale/main/en_US.json');
      
      expect( typeof json_rmns.lookup(en_UScodes, ns) ).toBe( 'object' );
      
      en_UScodes = json_filternumberitems[fn](en_UScodes);

      expect( typeof json_rmns.lookup(en_UScodes, ns) ).toBe( 'undefined' );
    });
  });  

  it('should filter lists of numbers', () => {
    let en_UScodes = require('../JSONlocale/main/en_US.json');

    expect( typeof en_UScodes.numbers.currencies ).toBe( 'object' );
    expect( typeof en_UScodes.numbers['decimalFormats-numberSystem-latn'] ).toBe( 'object' );    
    expect( typeof en_UScodes.numbers['symbols-numberSystem-latn'] ).toBe( 'object' );
    expect( typeof en_UScodes.numbers['currencyFormats-numberSystem-latn'] ).toBe( 'object' );

    en_UScodes = json_filternumberitems(en_UScodes, [
      'currencyFormatsNumberSystemLatn',
      'symbolsNumberSystemLatn',
      'decimalFormatsNumberSystemLatn' ]);

    expect( typeof en_UScodes.numbers.currencies ).toBe( 'undefined' );
    expect( typeof en_UScodes.numbers['decimalFormats-numberSystem-latn'] ).toBe( 'object' );
    expect( typeof en_UScodes.numbers['symbols-numberSystem-latn'] ).toBe( 'object' );
    expect( typeof en_UScodes.numbers['currencyFormats-numberSystem-latn'] ).toBe( 'object' );    
  });
});
