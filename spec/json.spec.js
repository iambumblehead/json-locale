var jsonlocal = require('../');

describe('json', () => {
  it('should build files', done => {  

    jsonlocal.convert({  
      inputDir : './JSONlocale/main',
      outputDir : './JSONlocaleNew',
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

      isoType : '639-1', // three letter (639-1), two letter (639-2)
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

