const json_iso = require('../src/json_iso');

describe('json_iso.getISOObjForLang', () => {
  it('should return an object for "es"', () => {
    expect( json_iso.getISOObjForLang('es').code )
      .toBe( 'spa' );
  });

  it('should return null for "yue"', () => {
    expect( json_iso.getISOObjForLang('yue') )
      .toBe( null );
  });
});


