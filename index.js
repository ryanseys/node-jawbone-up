/**
 * JawboneUp API wrapper for Node.js
 *
 * @module jawbone-up
 * @author Ryan Seys
 */

const packagejson = require('./package.json');
const request = require('request');
const BASE_URL = 'https://jawbone.com/nudge/api/v.1.1';
const ERROR_NO_XID = 'Error: No xid provided. Please specify a xid.';
const ERROR_NOT_IMPLEMENTED = 'Error: Not yet implemented.';
const ERROR_BAD_PARAMS_CB = 'Error: Bad parameters. Callback function required.';
const ERROR_BAD_PARAMS_OPT = 'Error: Bad parameters. Options object required.';
const ERROR_NO_CLIENT_SECRET = "Error: No client secret provided.";
const ERROR_NO_URL_PROVIDED = "Error: No URL provided.";

module.exports = function(options) {

  var self = this;

  if(typeof(options) !== 'object') {
    options = {};
  }

  var version = packagejson.version;
  var client_id = options.client_id;
  var client_secret = options.client_secret;
  var access_token = options.access_token;

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

  /**
   * Checks if params are good. If they are, returns true.
   * Else it will return false and call the callback with an error (if available).
   *
   * @private
   * @param  {Object}   options  Object part of params to check.
   * @param  {Function} callback Callback function part of params to check.
   * @return {Boolean}           true if params are good, false otherwise.
   */
  var good_params = function(options, callback) {
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

  /**
   * Makes a GET request to the API with options.
   *
   * @private
   * @param  {Object}   options  Options that includes the `url` to GET.
   * @param  {Function} callback Function to callback with response.
   */
  var api_get = function(options, callback) {
    request({
      url: options.url,
      headers: {
        'Authorization': 'Bearer ' + access_token,
        'Accept': 'application/json'
      }
    },
    function(error, response, body) {
      callback(error, body);
    });
  };

  /**
   * Makes a POST request to the API with options.
   *
   * @private
   * @param  {Object}   options  Options that includes the `url` to POST and
   * `data` object to include in POST request.
   *
   * @param  {Function} callback Function to callback with response.
   */
  var api_post = function(options, callback) {
    request({
      method: 'post',
      url: options.url,
      headers: {
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: options.data
    },
    function(error, response, body) {
      callback(error, body);
    });
  };

  /**
   * Makes a DELETE request to the API with options.
   *
   * @private
   * @param  {Object}   options  Options that includes the `url` to DELETE.
   * @param  {Function} callback Function to callback with response.
   */
  var api_delete = function(options, callback) {
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
  };

  function create_getter_xid(str) {
    return function(options, callback) {
      if(good_params(options, callback)) {
        var xid = options.xid;
        var url = BASE_URL + (xid ? '/' + str + '/' + xid : '/users/@me/' + str + '?' + serialize(options));
        api_get({ url: url }, callback);
      }
    };
  }

  function create_getter(str) {
    return function(options, callback) {
      if(good_params(options, callback)) {
        var url = BASE_URL + '/users/@me/' + str;
        api_get({ url: url }, callback);
      }
    };
  }

  function create_getter_type(obj_str, str_type) {
    return function(options, callback) {
      if(good_params(options, callback)) {
        var xid = options.xid;
        if(!xid) {
          callback({ error: true, message: ERROR_NO_XID }, null);
        }
        else {
          var url = BASE_URL + '/'+ obj_str + '/' + xid + '/' + str_type;
          api_get({ url: url }, callback);
        }
      }
    };
  }

  function create_creator(obj_str) {
    return function(data, callback) {
      if(good_params(data, callback)) {
        var url = BASE_URL + '/users/@me/' + obj_str;
        api_post({ url: url, data: data }, callback);
      }
    };
  }

  function create_deletor(obj_str) {
    return function(options, callback) {
      if(good_params(options, callback)) {
        var xid = options.xid;
        if(!xid) {
          return callback({ error: true, message: ERROR_NO_XID }, null);
        }
        else {
          var url = BASE_URL + '/' + obj_str + '/' + xid;
          api_delete({ url: url }, callback);
        }
      }
    };
  }

  function create_updater(obj_str) {
    return function(options, callback) {
      if(good_params(options, callback)) {
        var xid = options.xid;
        if(!xid) {
          return callback({ error: true, message: ERROR_NO_XID }, null);
        }
        else {
          var url = BASE_URL + '/' + obj_str + '/' + xid + '/partialUpdate';
          api_post({ url: url, data: options.data }, callback);
        }
      }
    };
  }

  var get_refreshToken = function(callback) {
    if(client_secret) {
      var url = BASE_URL + '/users/@me/refreshToken';
      api_post({ url: url, data: { secret: client_secret } }, callback);
    }
    else {
      var error = { error: true, message: ERROR_NO_CLIENT_SECRET };
      callback(error, null);
      return false;
    }
  };

  var create_webhook = function(webhook_url, callback) {
    if(webhook_url) {
      var url = BASE_URL + '/users/@me/pubsub?webhook=' + webhook_url;
      api_post({ url: url }, callback);
    }
    else {
      var error = { error: true, message: ERROR_NO_URL_PROVIDED };
      callback(error, null);
      return false;
    }
  };

  var delete_webhook = function(callback) {
    if(good_params(options, callback)) {
      var url = BASE_URL + '/users/@me/pubsub';
      api_delete({ url: url }, callback);
    }
  };

  return {

    get access_token() {
      return access_token;
    },

    set access_token(token) {
      if(typeof(token) === 'string') {
        access_token = token;
      }
    },

    get version() {
      return version;
    },

    /** @class me */
    me: {
      get: create_getter('')
    },
    /** @class moves */
    moves: {
      get: create_getter_xid('moves'),
      image: create_getter_type('moves', 'image'),
      ticks: create_getter_type('moves', 'ticks')
    },
    /** @class meals */
    meals: {
      get: create_getter_xid('meals'),
      create: create_creator('meals'),
      'delete': create_deletor('meals'),
      update: create_updater('meals')
    },
    /** @class events */
    events: {
      /** @class events.body */
      body: {
        get: create_getter_xid('body_events'),
        create: create_creator('body_events'),
        'delete': create_deletor('body_events')
      },
      /** @class events.cardiac */
      cardiac: {
        get: create_getter_xid('cardiac_events'),
        create: create_creator('cardiac_events'),
        'delete': create_deletor('cardiac_events')
      },
      /** @class events.generic */
      generic: {
        get: create_getter_xid('generic_events'),
        create: create_creator('generic_events'),
        update: create_updater('generic_events'),
        'delete': create_deletor('generic_events')
      },
      band: {
        get: create_getter('bandevents')
      }
    },
    /** @class timezone */
    timezone: {
      get: create_getter('timezone')
    },
    /** @class friends */
    friends: {
      get: create_getter('friends')
    },
    /** @class mood */
    mood: {
      get: create_getter_xid('mood'),
      create: create_creator('mood'),
      'delete': create_deletor('mood')
    },
    /** @class workouts */
    workouts: {
      get: create_getter_xid('workouts'),
      create: create_creator('workouts'),
      image: create_getter_type('workouts', 'image'),
      ticks: create_getter_type('workouts', 'ticks'),
      update: create_updater('workouts'),
      'delete': create_deletor('workouts')
    },
    /** @class trends */
    trends: {
      get: create_getter('trends')
    },
    /** @class goals */
    goals: {
      get: create_getter('goals')
    },
    /** @class sleeps */
    sleeps: {
      get: create_getter_xid('sleeps'),
      image: create_getter_type('sleeps', 'image'),
      ticks: create_getter_type('sleeps', 'ticks'),
      create: create_creator('sleeps'),
      'delete': create_deletor('sleeps')
    },
    refreshToken: {
      get: get_refreshToken
    },
    settings: {
      get: create_getter('settings')
    },
    webhook: {
      create: create_webhook,
      'delete': delete_webhook
    }
  };
};
