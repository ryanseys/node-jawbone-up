var config = {
  client_id:     process.env.UP_CLIENT_ID, // UP application api id
  client_secret: process.env.UP_CLIENT_SECRET, // UP application api secret
  access_token:  process.env.UP_ACCESS_TOKEN, // access token for specific user
};

var debug = true;

var up = require('./index.js')(config);

up.moves.get({ }, function(err, body) {
  console.log('GET: ' + body);
}, debug);

up.moves.get('BAD', function(err, body) {
  console.log(err, body);
}, debug);

up.moves.get({ xid: 'V0LxXTZyNYs5TO4Atrtuig' }, function(err, body) {
  console.log('GET: ' + body);
}, debug);

up.moves.get({ date: 20131130, page_token: 1335074239 }, function(err, body) {
  console.log('GET: ' + body);
}, debug);

up.moves.image({ xid: 'V0LxXTZyNYs5TO4Atrtuig' }, function(err, body) {
  console.log('GET: ' + body);
}, debug);

up.moves.snapshot({ xid: 'V0LxXTZyNYs5TO4Atrtuig' }, function(err, body) {
  console.log('GET: ' + body);
}, debug);

// Example values to test:
  // move_xid: V0LxXTZyNYs5TO4Atrtuig
