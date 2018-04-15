const path = require('path'),
      jsonlocal = require('../');

describe('json', () => {
  it('should build files', done => {  
    jsonlocal.convert({  
      outputDir : path.join(__dirname, '/../test/locale/'),
      keep : [
        'numbers', 
        'languages', 
        'calendars'
      ],  
      keepCalendars : [
        'gregorian'
      ],
      keepCalendarItems : [
        'months',
        'days',
        'dateFormats',
        'timeFormats'
      ],
      keepNumberItems : [
        'symbolsFormatsNumberSystemLatn', 
        'currencies'
      ],

      isoType : '639-2', // two letter (639-1), three letter (639-2)
      localeDefault : 'eng_US',

      localeFilter : [
        'eng_US',
        'spa_ES',
        'spa_CL'
      ]
    }, (err, res) => {
      done();
    });
  });
});

