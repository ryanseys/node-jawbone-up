/**
 * JawboneUp
 *
 * @module jawbone-up
 * @author Ryan Seys <ryan@ryanseys.com>
 */

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
   * @tutorial http://stackoverflow.com/a/1714899/2953164
   * @private
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

  var api_delete = function(options, callback) {
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

  /**
   * Get all moves (paginated) or a specific move
   * by specifying the `xid` in options.
   * @method moves.get
   * @param  {Object}   options  All options to be used in the request
   * @param  {Function} callback A callback to fire when response is recieved.
   */
  var moves_get = function(options, callback, fake) {
    if(good_params(options, callback)) {
      // GET /nudge/api/v.1.0/users/@me/moves
      // GET /nudge/api/v.1.0/moves/{move_xid}
      var xid = options.xid;
      var url = BASE_URL + (xid ? '/moves/' + xid : '/users/@me/moves?' + serialize(options));
      api_get({ url: url, fake: fake }, callback);
    }
  };

  /**
   * Get an image for a specific move `xid`.
   *
   * @method moves.image
   * @param  {Object}   options  All options to be used in the request
   * @param  {Function} callback A callback to fire when response is recieved.
   */
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

  /**
   * Get the snapshot of a specific move `xid`.
   *
   * @method moves.snapshot
   * @param  {Object}   options  All options to be used in the request.
   * @param  {Function} callback A callback to fire when response is recieved.
   */
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

  /**
   * Get a generic event by specifying an `xid` or all events (paginated).
   *
   * @method events.generic.get
   * @param  {Object}   options  All options to be used in the request.
   * @param  {Function} callback A callback to fire when response is recieved.
   */
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

  /**
   * Create a generic event.
   *
   * @method events.generic.create
   * @param  {Object}   data     A key/value set of data params to be used for creation.
   * @param  {Function} callback A callback to fire when response is recieved.
   */
  var generic_events_create = function(data, callback, fake) {
    // POST /nudge/api/v.1.0/users/@me/generic_events
    if(good_params(data, callback)) {
      var url = BASE_URL + '/users/@me/generic_events';
      api_post({ url: url, fake: fake, data: data }, callback);
    }
  };

  /**
   * Delete a generic event specified by an `xid`.
   *
   * @method events.generic.delete
   * @param  {Object}   options  All options to be used in the request. Should specify an `xid` value.
   * @param  {Function} callback A callback to fire when response is recieved.
   */
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

  /**
   * Get a cardiac event by specifying an `xid` or all events (paginated).
   *
   * @method events.cardiac.get
   * @param  {Object}   options  All options to be used in the request.
   * @param  {Function} callback A callback to fire when response is recieved.
   */
  var cardiac_events_get = function(options, callback, fake) {
    // GET /nudge/api/v.1.0/users/@me/cardiac_events
    // GET /nudge/api/v.1.0/cardiac_events/{event_xid}
    if(good_params(options, callback)) {
      var xid = options.xid;
      var url = BASE_URL + (xid ? '/cardiac_events/' + xid : '/users/@me/cardiac_events?' + serialize(options));
      api_get({ url: url, fake: fake }, callback);
    }
  };

  /**
   * Create a cardiac event.
   *
   * @method events.cardiac.create
   * @param  {Object}   data     A key/value set of data params to be used for creation.
   * @param  {Function} callback A callback to fire when response is recieved.
   */
  var cardiac_events_create = function(data, callback, fake) {
    // POST /nudge/api/v.1.0/users/@me/cardiac_events
    if(good_params(data, callback)) {
      var url = BASE_URL + '/users/@me/cardiac_events';
      api_post({ url: url, fake: fake, data: data }, callback);
    }
  };

  /**
   * Delete a cardiac event specified by an `xid`.
   *
   * @method events.cardiac.delete
   * @param  {Object}   options  All options to be used in the request. Should specify an `xid` value.
   * @param  {Function} callback A callback to fire when response is recieved.
   */
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

  /**
   * Get a body event by specifying an `xid` or all events (paginated).
   *
   * @method events.body.get
   * @param  {Object}   options  All options to be used in the request.
   * @param  {Function} callback A callback to fire when response is recieved.
   */
  var body_events_get = function(options, callback, fake) {
    // GET /nudge/api/v.1.0/users/@me/body_events
    // GET /nudge/api/v.1.0/body_events/{event_xid}
    if(good_params(options, callback)) {
      var xid = options.xid;
      var url = BASE_URL + (xid ? '/body_events/' + xid : '/users/@me/body_events?' + serialize(options));
      api_get({ url: url, fake: fake }, callback);
    }
  };

  /**
   * Create a body event.
   *
   * @method events.body.create
   * @param  {Object}   data     A key/value set of data params to be used for creation.
   * @param  {Function} callback A callback to fire when response is recieved.
   */
  var body_events_create = function(data, callback, fake) {
    // POST /nudge/api/v.1.0/users/@me/body_events
    if(good_params(data, callback)) {
      var url = BASE_URL + '/users/@me/body_events';
      api_post({ url: url, fake: fake, data: data }, callback);
    }
  };

  /**
   * Delete a body event specified by an `xid`.
   *
   * @method events.body.delete
   * @param  {Object}   options  All options to be used in the request. Should specify an `xid` value.
   * @param  {Function} callback A callback to fire when response is recieved.
   */
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

  /**
   * Get a meal by specifying an `xid` or all meals (paginated) by not specifying an `xid`.
   *
   * @method meals.get
   * @param  {Object}   options  All options to be used in the request.
   * @param  {Function} callback A callback to fire when response is recieved.
   */
  var meals_get = function(options, callback, fake) {
    // GET /nudge/api/v.1.0/users/@me/meals
    // GET /nudge/api/v.1.0/meals/{meal_xid}
    if(good_params(options, callback)) {
      var xid = options.xid;
      var url = BASE_URL + (xid ? '/meals/' + xid : '/users/@me/meals?' + serialize(options));
      api_get({ url: url, fake: fake }, callback);
    }
  };

  /**
   * Create a meal.
   *
   * @method meals.create
   * @param  {Object}   data     A key/value set of data params to be used for creation.
   * @param  {Function} callback A callback to fire when response is recieved.
   */
  var meals_create = function(data, callback, fake) {
    // POST /nudge/api/v.1.0/users/@me/meals
    if(good_params(data, callback)) {
      var url = BASE_URL + '/users/@me/meals';
      api_post({ url: url, fake: fake, data: data }, callback);
    }
  };

  /**
   * Delete a meal specified by an `xid`.
   *
   * @method meals.delete
   * @param  {Object}   options  All options to be used in the request. Should specify an `xid` value.
   * @param  {Function} callback A callback to fire when response is recieved.
   */
  var meals_delete = function(options, callback, fake) {
    // DELETE /nudge/api/v.1.0/meals/{sleep_xid}
    if(good_params(options, callback)) {
      var xid = options.xid;
      if(!xid) {
        return callback({ error: true, message: ERROR_NO_XID }, null);
      }
      else {
        var url = BASE_URL + '/meals/' + xid;
        api_delete({ url: url, fake: fake }, callback);
      }
    }
  };

  /**
   * Get a sleep by specifying an `xid` or all sleeps (paginated) by not specifying an `xid`.
   *
   * @method sleeps.get
   * @param  {Object}   options  All options to be used in the request.
   * @param  {Function} callback A callback to fire when response is recieved.
   */
  var sleeps_get = function(options, callback, fake) {
    // GET /nudge/api/v.1.0/users/@me/sleeps
    // GET /nudge/api/v.1.0/sleeps/{sleep_xid}
    if(good_params(options, callback)) {
      var xid = options.xid;
      var url = BASE_URL + (xid ? '/sleeps/' + xid : '/users/@me/sleeps?' + serialize(options));
      api_get({ url: url, fake: fake }, callback);
    }
  };

  /**
   * Create a sleep.
   *
   * @method sleeps.create
   * @param  {Object}   data     A key/value set of data params to be used for creation.
   * @param  {Function} callback A callback to fire when response is recieved.
   */
  var sleeps_create = function(data, callback, fake) {
    // POST /nudge/api/users/@me/sleeps
    if(good_params(data, callback)) {
      var url = BASE_URL + '/users/@me/sleeps';
      api_post({ url: url, fake: fake, data: data }, callback);
    }
  };

  /**
   * Delete a sleep specified by an `xid`.
   *
   * @method sleeps.delete
   * @param  {Object}   options  All options to be used in the request. Should specify an `xid` value.
   * @param  {Function} callback A callback to fire when response is recieved.
   */
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

  /**
   * Get an image for a specific sleep `xid`.
   *
   * @method sleeps.image
   * @param  {Object}   options  All options to be used in the request
   * @param  {Function} callback A callback to fire when response is recieved.
   */
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

  /**
   * Get the snapshot of a specific sleep `xid`.
   *
   * @method sleeps.snapshot
   * @param  {Object}   options  All options to be used in the request.
   * @param  {Function} callback A callback to fire when response is recieved.
   */
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

  /**
   * Get a workout by specifying an `xid` or all workouts (paginated) by not specifying an `xid`.
   *
   * @method workouts.get
   * @param  {Object}   options  All options to be used in the request.
   * @param  {Function} callback A callback to fire when response is recieved.
   */
  var workouts_get = function(options, callback, fake) {
    // GET /nudge/api/v.1.0/users/@me/workouts
    // GET /nudge/api/v.1.0/workouts/{workout_xid}
    if(good_params(options, callback)) {
      var xid = options.xid;
      var url = BASE_URL + (xid ? '/workouts/' + xid : '/users/@me/workouts?' + serialize(options));
      api_get({ url: url, fake: fake }, callback);
    }
  };

  /**
   * Create a workout.
   *
   * @method workouts.create
   * @param  {Object}   data     A key/value set of data params to be used for creation.
   * @param  {Function} callback A callback to fire when response is recieved.
   */
  var workouts_create = function(options, callback, fake) {
    // POST /nudge/api/v.1.0/users/@me/workouts
    if(good_params(data, callback)) {
      var url = BASE_URL + '/users/@me/workouts';
      api_post({ url: url, fake: fake, data: data }, callback);
    }
  };

  /**
   * Get an image for a specific workout `xid`.
   *
   * @method workouts.image
   * @param  {Object}   options  All options to be used in the request
   * @param  {Function} callback A callback to fire when response is recieved.
   */
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

  /**
   * Get the snapshot of a specific workout `xid`.
   *
   * @method workouts.snapshot
   * @param  {Object}   options  All options to be used in the request.
   * @param  {Function} callback A callback to fire when response is recieved.
   */
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

  /**
   * Get mood for user.
   *
   * @method mood.get
   * @param  {Object}   options  All options to be used in the request.
   * @param  {Function} callback A callback to fire when response is recieved.
   */
  var mood_get = function(options, callback, fake) {
    // GET /nudge/api/v.1.0/users/@me/mood
    if(good_params(options, callback)) {
      var url = BASE_URL + '/users/@me/mood';
      api_get({ url: url, fake: fake }, callback);
    }
  };

  /**
   * Get friends for user.
   *
   * @method friends.get
   * @param  {Object}   options  All options to be used in the request.
   * @param  {Function} callback A callback to fire when response is recieved.
   */
  var friends_get = function(options, callback, fake) {
    // GET /nudge/api/v.1.0/users/@me/friends
    if(good_params(options, callback)) {
      var url = BASE_URL + '/users/@me/friends';
      api_get({ url: url, fake: fake }, callback);
    }
  };

  /**
   * Get timezone of user.
   *
   * @method timezone.get
   * @param  {Object}   options  All options to be used in the request.
   * @param  {Function} callback A callback to fire when response is recieved.
   */
  var timezone_get = function(options, callback, fake) {
    // GET /nudge/api/v.1.0/users/@me/timezone
    if(good_params(options, callback)) {
      var url = BASE_URL + '/users/@me/timezone';
      api_get({ url: url, fake: fake }, callback);
    }
  };

  /**
   * Create a mood.
   *
   * @method mood.create
   * @param  {Object}   data     A key/value set of data params to be used for creation.
   * @param  {Function} callback A callback to fire when response is recieved.
   */
  var mood_create = function(options, callback, fake) {
    if(good_params(data, callback)) {
      var url = BASE_URL + '/users/@me/mood';
      api_post({ url: url, fake: fake, data: data }, callback);
    }
  };

  /**
   * Delete a mood specified by an `xid`.
   *
   * @method mood.delete
   * @param  {Object}   options  All options to be used in the request. Should specify an `xid` value.
   * @param  {Function} callback A callback to fire when response is recieved.
   */
  var mood_delete = function(options, callback, fake) {
    if(good_params(options, callback)) {
      var xid = options.xid;
      if(!xid) {
        return callback({ error: true, message: ERROR_NO_XID }, null);
      }
      else {
        var url = BASE_URL + '/mood/' + xid;
        api_delete({ url: url, fake: fake }, callback);
      }
    }
  };

  /**
   * Get trends of user.
   *
   * @method trends.get
   * @param  {Object}   options  All options to be used in the request.
   * @param  {Function} callback A callback to fire when response is recieved.
   */
  var trends_get = function(options, callback, fake) {
    if(good_params(options, callback)) {
      var url = BASE_URL + '/users/@me/trends';
      api_get({ url: url, fake: fake }, callback);
    }
  };

  /**
   * Get goals of user.
   *
   * @method goals.get
   * @param  {Object}   options  All options to be used in the request.
   * @param  {Function} callback A callback to fire when response is recieved.
   */
  var goals_get = function(options, callback, fake) {
    if(good_params(options, callback)) {
      var url = BASE_URL + '/users/@me/goals';
      api_get({ url: url, fake: fake }, callback);
    }
  };

  var to_export = {
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
    /** @class moves */
    moves: {
      get: moves_get,
      image: moves_image,
      snapshot: moves_snapshot
    },
    /** @class meals */
    meals: {
      get: meals_get,
      create: meals_create,
      'delete': meals_delete
    },
    /** @class events */
    events: {
      /** @class events.body */
      body: {
        get: body_events_get,
        create: body_events_create,
        'delete': body_events_delete
      },
      /** @class events.cardiac */
      cardiac: {
        get: cardiac_events_get,
        create: cardiac_events_create,
        'delete': cardiac_events_delete
      },
      /** @class events.generic */
      generic: {
        get: generic_events_get,
        create: generic_events_create,
        'delete': generic_events_delete
      }
    },
    /** @class timezone */
    timezone: {
      get: timezone_get
    },
    /** @class friends */
    friends: {
      get: friends_get
    },
    /** @class mood */
    mood: {
      get: mood_get,
      create: mood_create,
      'delete': mood_delete
    },
    /** @class workouts */
    workouts: {
      get: workouts_get,
      create: workouts_create,
      image: workouts_image,
      snapshot: workouts_snapshot,
      'delete': null // unknown & undocumented
    },
    /** @class trends */
    trends: {
      get: trends_get
    },
    /** @class goals */
    goals: {
      get: goals_get
    },
    /** @class sleeps */
    sleeps: {
      get: sleeps_get,
      image: sleeps_image,
      snapshot: sleeps_snapshot,
      create: sleeps_create,
      'delete': sleeps_delete // undocumented
    }
  };

  return to_export;
};
