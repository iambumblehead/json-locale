const jsonlocale = require('../');

require('child_process').execSync(
`node ../src/json.js \
  --outputDir=./locale \
  --keep=numbers,currencies,languages \
  --keepCalendars=gregorian \
  --keepCalendarItems=months,days,dateFormats,timeFormats \
  --keepNumberItems=symbolsFormatsNumberSystemLatn,currencies \
  --localeFilter=en_US,spa_ES,spa_CL
`, {stdio:'inherit'});

// scripted build...
jsonlocale({
  outputDir : './locale',
  isoType : '639-1',
  keep : [
    'numbers',
    'calendars' ],
  isConvert_yy: true,
  keepNumbersItems : [
    'currencyFormatsNumberSystemLatn',
    'symbolsNumberSystemLatn',
    'decimalFormatsNumberSystemLatn' ],
  localeDefault : 'de_DE',
  keepCalendars : [
    'coptic',
    'japanese' ],
  localeFilter : [
    'de_DE', 'de_AT', 'fr_FR', 'fr_BE', 'nl_NL', 'nl_BE'
  ]
}, (err, res) => {
  console.log('finished!');
});
