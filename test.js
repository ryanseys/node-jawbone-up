var config = require('./config');

var debug = true;

var up = require('./index')(config);

console.log(up.version);
console.log(up.access_token);

// up.moves.get({ }, function(err, body) {
//   console.log('GET: ' + body);
// }, debug);

up.timezone.get({}, function(err, body) {
  console.log('GET: ' + body);
}, debug);

up.timezone.get(function(err, body) {
  console.log('GET: ' + body);
}, debug);

up.sleeps.create({ time_created: 1385877310, time_completed: 1385878310, tz: 'America/Toronto' }, function(err, body) {
  console.log('POST: ' + body);
});
