const packagejson = require('./package.json');
const request = require('request');
const ERROR_NO_XID = 'Error: No xid provided. Please specify a xid.';
const ERROR_NOT_IMPLEMENTED = 'Error: Not yet implemented.';
const ERROR_BAD_PARAMS_CB = 'Error: Bad parameters. Callback function required.';
const ERROR_BAD_PARAMS_OPT = 'Error: Bad parameters. Options object required.';

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
function serialize(obj) {
  var str = [];
  for(var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  }
  return str.join("&");
}

function APIEndPoint(jb) {
  this._jb = jb;
}

function JawboneUp(options) {
  options = options || {};
  this._base_url = 'https://jawbone.com/nudge/api/v.1.0';
  this._client_id = options.client_id || null;
  this._client_secret = options.client_secret || null;
  this._access_token = options.access_token || null;
  this._version = packagejson.version;
  this._init(options);
}

JawboneUp.prototype = {

  get client_id() {
    return this._client_id;
  },

  get client_secret() {
    return this._client_secret;
  },

  get access_token() {
    return this._access_token;
  },

  get version() {
    return this._version;
  },

  _init: function(options){
    this.friends = new JawboneFriendsAPI(this);
    this.moves = new JawboneMovesAPI(this);
    this.workouts = new JawboneWorkoutsAPI(this);
    this.sleeps = new JawboneSleepsAPI(this);
    this.mood = new JawboneMoodAPI(this);
    this.meals = new JawboneMealsAPI(this);
    this.events = {};
    this.events.body = new JawboneBodyEventsAPI(this);
    this.events.cardiac = new JawboneCardiacEventsAPI(this);
    this.events.generic = new JawboneGenericEventsAPI(this);
    this.timezone = new JawboneTimezoneAPI(this);
  },

  _api_get: function(url_end, callback, fake) {
    if(!fake) {
      request({
        url: this._base_url + url_end,
        headers: {
          'Authorization': 'Bearer ' + this.access_token
        }
      },
      function(error, response, body) {
        callback(error, body);
      });
    }
    else {
      callback(null, this._base_url + url_end);
    }
  },

  _api_post: function(url_end, callback) {
    callback({error: true, message: ERROR_NOT_IMPLEMENTED });
  },

  _api_delete: function(url_end, callback) {
    callback({error: true, message: ERROR_NOT_IMPLEMENTED });
  }
};

var JawboneMovesAPI = APIEndPoint;

JawboneMovesAPI.prototype = {
  get: function(options, callback, fake) {
    if(typeof(callback) !== 'function') {
      return { error: true, message: ERROR_BAD_PARAMS_CB };
    }
    else if(typeof(options) !== 'object') {
      return callback({ error: true, message: ERROR_BAD_PARAMS_OPT }, null);
    }
    // GET /nudge/api/v.1.0/users/@me/moves
    // GET /nudge/api/v.1.0/moves/{move_xid}
    var xid = options.xid;
    var url = xid ? '/moves/' + xid : '/users/@me/moves?' + serialize(options);
    this._jb._api_get(url, callback, fake);
  },
  image: function(options, callback, fake) {
    if(typeof(callback) !== 'function') {
      return { error: true, message: ERROR_BAD_PARAMS_CB };
    }
    else if(typeof(options) !== 'object') {
      return callback({ error: true, message: ERROR_BAD_PARAMS_OPT }, null);
    }
    // GET /nudge/api/v.1.0/moves/{move_xid}/image
    var xid = options.xid;
    if(!xid) {
      callback({ error: true, message: ERROR_NO_XID }, null);
    }
    else {
      var url = '/moves/' + xid + '/image';
      this._jb._api_get(url, callback, fake);
    }
  },
  snapshot: function(options, callback, fake) {
    if(typeof(callback) !== 'function') {
      return { error: true, message: ERROR_BAD_PARAMS_CB };
    }
    else if(typeof(options) !== 'object') {
      return callback({ error: true, message: ERROR_BAD_PARAMS_OPT }, null);
    }
    // GET /nudge/api/v.1.0/moves/{move_xid}/snapshot
    var xid = options.xid;
    if(!xid) {
      return callback({ error: true, message: ERROR_NO_XID }, null);
    }
    else {
      var url = '/moves/' + xid + '/snapshot';
      this._jb._api_get(url, callback, fake);
    }
  }
};

var JawboneFriendsAPI = APIEndPoint;

JawboneFriendsAPI.prototype = {
  get: function() {
    // GET /nudge/api/v.1.0/users/@me/friends
  }
};

var JawboneMoodAPI = APIEndPoint;

JawboneMoodAPI.prototype = {
  get: function() {
    // GET /nudge/api/v.1.0/users/@me/mood
  }
};

var JawboneWorkoutsAPI = APIEndPoint;

JawboneWorkoutsAPI.prototype = {
  get: function() {
    // GET /nudge/api/v.1.0/users/@me/workouts
    // GET /nudge/api/v.1.0/workouts/{workout_xid}
  },
  create: function() {
    // POST /nudge/api/v.1.0/users/@me/workouts
  },
  image: function() {
    // GET /nudge/api/v.1.0/workouts/{workout_xid}/image
  },
  snapshot: function() {
    // GET /nudge/api/v.1.0/workouts/{workout_xid}/snapshot
  }
};

var JawboneSleepsAPI = APIEndPoint;

JawboneSleepsAPI.prototype = {
  get: function() {
    // GET /nudge/api/v.1.0/users/@me/sleeps
    // GET /nudge/api/v.1.0/sleeps/{sleep_xid}
  },
  create: function() {
    // POST /nudge/api/users/@me/sleeps
  },
  image: function() {
    // GET /nudge/api/v.1.0/sleeps/{sleep_xid}/image
  },
  snapshot: function() {
    // GET /nudge/api/v.1.0/sleeps/{sleep_xid}/snapshot
  }
};

var JawboneMealsAPI = APIEndPoint;

JawboneMealsAPI.prototype = {
  get: function() {
    // GET /nudge/api/v.1.0/users/@me/meals
    // GET /nudge/api/v.1.0/meals/{meal_xid}
  },
  create: function() {
    // POST /nudge/api/v.1.0/users/@me/meals
  }
};

var JawboneBodyEventsAPI = APIEndPoint;

JawboneBodyEventsAPI.prototype = {
  get: function() {
    // GET /nudge/api/v.1.0/users/@me/body_events
    // GET /nudge/api/v.1.0/body_events/{event_xid}
  },
  create: function() {
    // POST /nudge/api/v.1.0/users/@me/body_events
  },
  delete: function() {
    // DELETE /nudge/api/v.1.0/body_events/{event_xid}
  }
};

var JawboneCardiacEventsAPI = APIEndPoint;

JawboneCardiacEventsAPI.prototype = {
  get: function() {
    // GET /nudge/api/v.1.0/users/@me/cardiac_events
    // GET /nudge/api/v.1.0/cardiac_events/{event_xid}
  },
  create: function() {
    // POST /nudge/api/v.1.0/users/@me/cardiac_events
  },
  delete: function() {
    // DELETE /nudge/api/v.1.0/cardiac_events/{event_xid}
  }
};

var JawboneGenericEventsAPI = APIEndPoint;

JawboneGenericEventsAPI.prototype = {
  get: function() {
    // Undocumented...
    // GET /nudge/api/v.1.0/users/@me/generic_events
    // GET /nudge/api/v.1.0/generic_events/{event_xid}
  },
  create: function() {
    // POST /nudge/api/v.1.0/users/@me/generic_events
  },
  delete: function() {
    // DELETE /nudge/api/v.1.0/generic_events/{event_xid}
  }
};

var JawboneTimezoneAPI = APIEndPoint;

JawboneTimezoneAPI.prototype = {
  get: function() {
    // GET /nudge/api/v.1.0/users/@me/timezone
  }
};

module.exports = function(options) {
  return new JawboneUp(options);
};
