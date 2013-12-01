const packagejson = require('./package.json');
const request = require('request');



module.exports = function(options) {
  const BASE_URL = 'https://jawbone.com/nudge/api/v.1.0';
  const ERROR_NO_XID = 'Error: No xid provided. Please specify a xid.';
  const ERROR_NOT_IMPLEMENTED = 'Error: Not yet implemented.';
  const ERROR_BAD_PARAMS_CB = 'Error: Bad parameters. Callback function required.';
  const ERROR_BAD_PARAMS_OPT = 'Error: Bad parameters. Options object required.';

  var self = this;

  if(typeof(options) !== 'object') {
    options = {};
  }

  var version = packagejson.version;

  this.client_id = options.client_id;
  this.client_secret = options.client_secret;
  this.access_token = options.access_token;

  /**
   * Serializes an object into a parameter string
   * for use with making REST API calls.
   *
   * Example:
   *   Input: { date: 20131130, page_token: 1335074239 }
   *  Output: 'date=20131130&page_token=1335074239'
   *
   * Source: http://stackoverflow.com/a/1714899/2953164
   *
   * @param  {Object} obj Object to serialize.
   * @return {String}     String representation of object as param string.
  */
  var serialize = function(obj) {
    var str = [];
    for(var p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    }
    return str.join("&");
  };

  var good_params = function(options, callback, fake) {
    if(typeof(callback) !== 'function') {
      return false;
    }
    else if(typeof(options) !== 'object') {
      var error = { error: true, message: ERROR_BAD_PARAMS_OPT };
      callback(error, null);
      return false;
    }
    else {
      return true;
    }
  };

  var api_get = function(options, callback) {
    if(!options.fake) {
      request({
        url: options.url,
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      },
      function(error, response, body) {
        callback(error, body);
      });
    }
    else {
      callback(null, options.url);
    }
  };

  var api_post = function(options, callback) {
    if(!options.fake) {
      request({
        method: 'post',
        url: options.url,
        headers: {
          'Authorization': 'Bearer ' + access_token
        },
        form: options.data
      },
      function(error, response, body) {
        callback(error, body);
      });
    }
    else {
      callback(null, options.url);
    }
  };

  var api_delete = function(url_end, callback) {
    if(!options.fake) {
      request({
        method: 'delete',
        url: options.url,
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      },
      function(error, response, body) {
        callback(error, body);
      });
    }
    else {
      callback(null, options.url);
    }
  };

  var moves_get = function(options, callback, fake) {
    if(good_params(options, callback)) {
      // GET /nudge/api/v.1.0/users/@me/moves
      // GET /nudge/api/v.1.0/moves/{move_xid}
      var xid = options.xid;
      var url = BASE_URL + (xid ? '/moves/' + xid : '/users/@me/moves?' + serialize(options));
      api_get({ url: url, fake: fake }, callback);
    }
  };

  var moves_image =  function(options, callback, fake) {
    if(good_params(options, callback)) {
    // GET /nudge/api/v.1.0/moves/{move_xid}/image
      var xid = options.xid;
      if(!xid) {
        callback({ error: true, message: ERROR_NO_XID }, null);
      }
      else {
        var url = BASE_URL + '/moves/' + xid + '/image';
        api_get({ url: url, fake: fake }, callback);
      }
    }
  };

  var moves_snapshot = function(options, callback, fake) {
    if(good_params(options, callback)) {
      var xid = options.xid;
      if(!xid) {
        return callback({ error: true, message: ERROR_NO_XID }, null);
      }
      else {
        // GET /nudge/api/v.1.0/moves/{move_xid}/snapshot
        var url = BASE_URL + '/moves/' + xid + '/snapshot';
        api_get({ url: url, fake: fake }, callback);
      }
    }
  };

  var generic_events_get =  function(options, callback, fake) {
    // Undocumented...
    // GET /nudge/api/v.1.0/users/@me/generic_events
    // GET /nudge/api/v.1.0/generic_events/{event_xid}
    if(good_params(options, callback)) {
      var xid = options.xid;
      var url = BASE_URL + (xid ? '/generic_events/' + xid : '/users/@me/generic_events?' + serialize(options));
      api_get({ url: url, fake: fake }, callback);
    }
  };

  var generic_events_create = function(data, callback, fake) {
    // POST /nudge/api/v.1.0/users/@me/generic_events
    if(good_params(data, callback)) {
      var url = BASE_URL + '/users/@me/generic_events';
      api_post({ url: url, fake: fake, data: data }, callback);
    }
  };

  var generic_events_delete = function(options, callback, fake) {
    // DELETE /nudge/api/v.1.0/generic_events/{event_xid}
    if(good_params(options, callback)) {
      var xid = options.xid;
      if(!xid) {
        return callback({ error: true, message: ERROR_NO_XID }, null);
      }
      else {
        var url = BASE_URL + '/generic_events/' + xid;
        api_delete({ url: url, fake: fake }, callback);
      }
    }
  };

  var cardiac_events_get = function(options, callback, fake) {
    // GET /nudge/api/v.1.0/users/@me/cardiac_events
    // GET /nudge/api/v.1.0/cardiac_events/{event_xid}
    if(good_params(options, callback)) {
      var xid = options.xid;
      var url = BASE_URL + (xid ? '/cardiac_events/' + xid : '/users/@me/cardiac_events?' + serialize(options));
      api_get({ url: url, fake: fake }, callback);
    }
  };

  var cardiac_events_create = function(data, callback, fake) {
    // POST /nudge/api/v.1.0/users/@me/cardiac_events
    if(good_params(data, callback)) {
      var url = BASE_URL + '/users/@me/cardiac_events';
      api_post({ url: url, fake: fake, data: data }, callback);
    }
  };

  var cardiac_events_delete = function(options, callback, fake) {
    // DELETE /nudge/api/v.1.0/cardiac_events/{event_xid}
    if(good_params(options, callback)) {
      var xid = options.xid;
      if(!xid) {
        return callback({ error: true, message: ERROR_NO_XID }, null);
      }
      else {
        var url = BASE_URL + '/cardiac_events/' + xid;
        api_delete({ url: url, fake: fake }, callback);
      }
    }
  };

  var body_events_get = function(options, callback, fake) {
    // GET /nudge/api/v.1.0/users/@me/body_events
    // GET /nudge/api/v.1.0/body_events/{event_xid}
    if(good_params(options, callback)) {
      var xid = options.xid;
      var url = BASE_URL + (xid ? '/body_events/' + xid : '/users/@me/body_events?' + serialize(options));
      api_get({ url: url, fake: fake }, callback);
    }
  };

  var body_events_create = function(data, callback, fake) {
    // POST /nudge/api/v.1.0/users/@me/body_events
    if(good_params(data, callback)) {
      var url = BASE_URL + '/users/@me/body_events';
      api_post({ url: url, fake: fake, data: data }, callback);
    }
  };

  var body_events_delete = function(options, callback, fake) {
    // DELETE /nudge/api/v.1.0/body_events/{event_xid}
    if(good_params(options, callback)) {
      var xid = options.xid;
      if(!xid) {
        return callback({ error: true, message: ERROR_NO_XID }, null);
      }
      else {
        var url = BASE_URL + '/body_events/' + xid;
        api_delete({ url: url, fake: fake }, callback);
      }
    }
  };

  var meals_get = function(options, callback, fake) {
    // GET /nudge/api/v.1.0/users/@me/meals
    // GET /nudge/api/v.1.0/meals/{meal_xid}
    if(good_params(options, callback)) {
      var xid = options.xid;
      var url = BASE_URL + (xid ? '/meals/' + xid : '/users/@me/meals?' + serialize(options));
      api_get({ url: url, fake: fake }, callback);
    }
  };

  var meals_create = function(data, callback, fake) {
    // POST /nudge/api/v.1.0/users/@me/meals
    if(good_params(data, callback)) {
      var url = BASE_URL + '/users/@me/meals';
      api_post({ url: url, fake: fake, data: data }, callback);
    }
  };

  var sleeps_get = function(options, callback, fake) {
    // GET /nudge/api/v.1.0/users/@me/sleeps
    // GET /nudge/api/v.1.0/sleeps/{sleep_xid}
    if(good_params(options, callback)) {
      var xid = options.xid;
      var url = BASE_URL + (xid ? '/sleeps/' + xid : '/users/@me/sleeps?' + serialize(options));
      api_get({ url: url, fake: fake }, callback);
    }
  };

  var sleeps_create = function(data, callback, fake) {
    // POST /nudge/api/users/@me/sleeps
    if(good_params(data, callback)) {
      var url = BASE_URL + '/users/@me/sleeps';
      api_post({ url: url, fake: fake, data: data }, callback);
    }
  };


  var sleeps_delete = function(options, callback, fake) {
    // Undocumented! (but tested + works)
    // DELETE /nudge/api/v.1.0/sleeps/{sleep_xid}
    if(good_params(options, callback)) {
      var xid = options.xid;
      if(!xid) {
        return callback({ error: true, message: ERROR_NO_XID }, null);
      }
      else {
        var url = BASE_URL + '/sleeps/' + xid;
        api_delete({ url: url, fake: fake }, callback);
      }
    }
  };

  var sleeps_image = function(options, callback, fake) {
    // GET /nudge/api/v.1.0/sleeps/{sleep_xid}/image
    if(good_params(options, callback)) {
      var xid = options.xid;
      if(!xid) {
        return callback({ error: true, message: ERROR_NO_XID }, null);
      }
      else {
        var url = BASE_URL + '/sleeps/' + xid + '/image';
        api_get({ url: url, fake: fake }, callback);
      }
    }
  };

  var sleeps_snapshot = function(options, callback, fake) {
    // GET /nudge/api/v.1.0/sleeps/{sleep_xid}/snapshot
    if(good_params(options, callback)) {
      var xid = options.xid;
      if(!xid) {
        return callback({ error: true, message: ERROR_NO_XID }, null);
      }
      else {
        var url = BASE_URL + '/sleeps/' + xid + '/snapshot';
        api_get({ url: url, fake: fake }, callback);
      }
    }
  };

  var workouts_get = function(options, callback, fake) {
    // GET /nudge/api/v.1.0/users/@me/workouts
    // GET /nudge/api/v.1.0/workouts/{workout_xid}
    if(good_params(options, callback)) {
      var xid = options.xid;
      var url = BASE_URL + (xid ? '/workouts/' + xid : '/users/@me/workouts?' + serialize(options));
      api_get({ url: url, fake: fake }, callback);
    }
  };

  var workouts_create = function(options, callback, fake) {
    // POST /nudge/api/v.1.0/users/@me/workouts
    if(good_params(data, callback)) {
      var url = BASE_URL + '/users/@me/workouts';
      api_post({ url: url, fake: fake, data: data }, callback);
    }
  };

  var workouts_image = function(options, callback, fake) {
    // GET /nudge/api/v.1.0/workouts/{workout_xid}/image
    if(good_params(options, callback)) {
      var xid = options.xid;
      if(!xid) {
        return callback({ error: true, message: ERROR_NO_XID }, null);
      }
      else {
        var url = BASE_URL + '/workouts/' + xid + '/image';
        api_get({ url: url, fake: fake }, callback);
      }
    }
  };

  var workouts_snapshot = function(options, callback, fake) {
    // GET /nudge/api/v.1.0/workouts/{workout_xid}/snapshot
    if(good_params(options, callback)) {
      var xid = options.xid;
      if(!xid) {
        return callback({ error: true, message: ERROR_NO_XID }, null);
      }
      else {
        var url = BASE_URL + '/workouts/' + xid + '/snapshot';
        api_get({ url: url, fake: fake }, callback);
      }
    }
  };

  var mood_get = function(options, callback, fake) {
    // GET /nudge/api/v.1.0/users/@me/mood
    if(good_params(options, callback)) {
      var url = BASE_URL + '/users/@me/mood';
      api_get({ url: url, fake: fake }, callback);
    }
  };

  var friends_get = function(options, callback, fake) {
    // GET /nudge/api/v.1.0/users/@me/friends
    if(good_params(options, callback)) {
      var url = BASE_URL + '/users/@me/friends';
      api_get({ url: url, fake: fake }, callback);
    }
  };

  var timezone_get = function(options, callback, fake) {
    // GET /nudge/api/v.1.0/users/@me/timezone
    if(good_params(options, callback)) {
      var url = BASE_URL + '/users/@me/timezone';
      api_get({ url: url, fake: fake }, callback);
    }
  };

  return {
    get client_id() {
      return self.client_id;
    },
    set client_id(id) {
      if(typeof(id) === 'string') {
        self.client_id = id;
      }
    },
    get client_secret() {
      return self.client_secret;
    },
    set client_secret(secret) {
      if(typeof(secret) === 'string') {
        self.client_secret = secret;
      }
    },
    get access_token() {
      return self.access_token;
    },
    set access_token(token) {
      if(typeof(token) === 'string') {
        self.access_token = token;
      }
    },
    get version() {
      return version;
    },
    moves: {
      get: moves_get
    },
    timezone: {
      get: timezone_get
    },
    sleeps: {
      create: sleeps_create,
      'delete': sleeps_delete // undocumented
    }
  };
};
