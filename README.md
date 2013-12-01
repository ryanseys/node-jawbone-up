node-jawbone-up
===============

Jawbone UP API Node.js Library

## Installation

`npm install jawbone-up`

## Usage

An `access_token` attribute is required in the options object!
See below for an example of how this could be done.

This library does not assist in getting an access_token through OAuth,
but once you get the token, it will apparently last for a **year**.

```javascript
var options = {
  access_token:  'zzz'  // **Required**: Access token for specific user.
  client_id:     'xxx', // Optional: UP application api id (not used)
  client_secret: 'yyy', // Optional: UP application api secret (not used)
}

var up = require('jawbone-up')(options);
```

# Documentation

## User information

```javascript
// get user info
up.me({}, callback)             // GET /nudge/api/v.1.0/users/@me

// get friends of user
up.friends({}, callback)        // GET /nudge/api/v.1.0/users/@me/friends

// get mood of user
up.mood.get({}, callback)       // GET /nudge/api/v.1.0/users/@me/mood

// get trends of user
up.trends({}, callback)         // GET /nudge/api/v.1.0/users/@me/trends

// get goals of user
up.goals({}, callback)          // GET /nudge/api/v.1.0/users/@me/goals
```

## Moves

```javascript
// get all moves (paginated results)
up.moves.get({}, callback)                      // GET /nudge/api/v.1.0/users/@me/moves

// get a specific moves
up.moves.get({ xid : move_xid }, callback)      // GET /nudge/api/v.1.0/moves/{move_xid}

// get a specific move image
up.moves.image({ xid : move_xid }, callback)    // GET /nudge/api/v.1.0/moves/{move_xid}/image

// get a specific move intensity
up.moves.snapshot({ xid : move_xid }, callback) // GET /nudge/api/v.1.0/moves/{move_xid}/snapshot
```

## Workouts

```javascript
// get all workouts (paginated results)
up.workouts.get({}, callback)                         // GET /nudge/api/v.1.0/users/@me/workouts

// create a new workout
up.workouts.create(options, callback)                 // POST /nudge/api/v.1.0/users/@me/workouts

// get a specific workout
up.workouts.get({ xid : workout_xid }, callback)      // GET /nudge/api/v.1.0/workouts/{workout_xid}

// get a specific workout image
up.workouts.image({ xid : workout_xid }, callback)    // GET /nudge/api/v.1.0/workouts/{workout_xid}/image

// get a specific workout intensity
up.workouts.snapshot({ xid : workout_xid }, callback) // GET /nudge/api/v.1.0/workouts/{workout_xid}/snapshot
```

## Sleeps

```javascript
// get all sleeps (paginated results)
up.sleeps.get({}, callback)                           // GET /nudge/api/v.1.0/users/@me/sleeps

// get a specific sleep
up.sleeps.get({ xid : sleep_xid }, callback)          // GET /nudge/api/v.1.0/sleeps/{sleep_xid}

// create a new sleep
up.sleeps.create(options, callback)                   // POST /nudge/api/v.1.0/users/@me/sleeps

// get a specific sleep image
up.sleeps.image({ xid : sleep_xid }, callback)        // GET /nudge/api/v.1.0/sleeps/{sleep_xid}/image

// get a specific sleep snapshot
up.sleeps.snapshot({ xid : sleep_xid }, callback)     // GET /nudge/api/v.1.0/sleeps/{sleep_xid}/snapshot

// delete a specific sleep
up.sleeps.delete({ xid : sleep_xid }, callback)       // DELETE /nudge/api/v.1.0/sleeps/{sleep_xid}
```

## Meals

```javascript
// get all meals (paginated results)
up.meals.get({}, callback)                   // GET /nudge/api/v.1.0/users/@me/meals

// create a new meal
up.meals.create(options, callback)           // POST /nudge/api/v.1.0/users/@me/meals

// get a specific meal
up.meals.get({ xid : meal_xid }, callback)   // GET /nudge/api/v.1.0/meals/{meal_xid}
```

## Body Composition

```javascript
// get all body events (paginated results)
up.events.body.get({}, callback)                      // GET /nudge/api/v.1.0/users/@me/body_events

// get a specific body event
up.events.body.get({ xid : event_xid }, callback)     // GET /nudge/api/v.1.0/body_events/{event_xid}

// create a new body event
up.events.body.create(options, callback)              // POST /nudge/api/v.1.0/users/@me/body_events

// delete a specific body event
up.events.body.delete({ xid : event_xid }, callback)  // DELETE /nudge/api/v.1.0/body_events/{event_xid}
```

## Cardiac Metrics

```javascript
// get all cardiac events (paginated results)
up.events.cardiac.get({}, callback)                      // GET /nudge/api/v.1.0/users/@me/cardiac_events

// get a specific cardiac event
up.events.cardiac.get({ xid : event_xid }, callback)     // GET /nudge/api/v.1.0/cardiac_events/{event_xid}

// create a new cardiac event
up.events.cardiac.create(options, callback)              // POST /nudge/api/v.1.0/users/@me/cardiac_events

// delete a specific cardiac event
up.events.cardiac.delete({ xid : event_xid }, callback)  // DELETE /nudge/api/v.1.0/cardiac_events/{event_xid}
```

## Generic Events

```javascript
// get all generic events (paginated results)
up.events.generic.get({}, callback)                      // GET /nudge/api/v.1.0/users/@me/generic_events

// get a specific generic event
up.events.generic.get({ xid : event_xid }, callback)     // GET /nudge/api/v.1.0/generic_events/{event_xid}

// create a new generic event
up.events.generic.create(options, callback)              // POST /nudge/api/v.1.0/users/@me/generic_events

// delete a specific generic event
up.events.generic.delete({ xid : event_xid }, callback)  // DELETE /nudge/api/v.1.0/generic_events/{event_xid}
```

## Mood

```javascript
// get all moods (paginated results)
up.mood.get({}, callback)                     // GET /nudge/api/v.1.0/users/@me/mood

// get a specific mood
up.mood.get({ xid : mood_xid }, callback)     // GET /nudge/api/v.1.0/mood/{mood_xid}

// create a new mood
up.mood.create(options, callback)             // POST /nudge/api/v.1.0/users/@me/mood

// delete a specific mood
up.mood.delete({ xid : mood_xid }, callback)  // DELETE /nudge/api/v.1.0/mood/{mood_xid}
```

## Time Zone

```javascript
// get a user's timezone
up.timezone.get({}, callback) // GET /nudge/api/v.1.0/users/@me/timezone
```

# License

MIT
