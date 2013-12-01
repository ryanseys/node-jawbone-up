node-jawbone-up
===============

Jawbone UP API Node.js Library

## Installation

`npm install jawbone-up --save`

## Usage

```javascript
var options = {
  access_token:  'zzz'  // **Required**: Access token for specific user
  client_id:     'xxx', // Optional: UP application api id (not used)
  client_secret: 'yyy', // Optional: UP application api secret (not used)
}

var up = require('jawbone-up')(options);
```

# Documentation

## User information

```javascript
up.me({}, callback)             // GET /nudge/api/v.1.0/users/@me

up.friends({}, callback)        // GET /nudge/api/v.1.0/users/@me/friends

up.mood.get({}, callback)       // GET /nudge/api/v.1.0/users/@me/mood

up.trends({}, callback)         // GET /nudge/api/v.1.0/users/@me/trends

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
up.sleeps.get({}, callback)                          // GET /nudge/api/v.1.0/users/@me/sleeps

up.sleeps.get({ xid : sleep_xid }, callback)          // GET /nudge/api/v.1.0/sleeps/{sleep_xid}

up.sleeps.image({ xid : sleep_xid }, callback)        // GET /nudge/api/v.1.0/sleeps/{sleep_xid}/image

up.sleeps.snapshot({ xid : sleep_xid }, callback)     // GET /nudge/api/v.1.0/sleeps/{sleep_xid}/snapshot

up.sleeps.delete({ xid : sleep_xid }, callback)       // DELETE /nudge/api/v.1.0/sleeps/{sleep_xid}
```

## Meals

```javascript
up.meals.get({}, callback)                   // GET /nudge/api/v.1.0/users/@me/meals

up.meals.create(options, callback)           // POST /nudge/api/v.1.0/users/@me/meals

up.meals.get({ xid : meal_xid }, callback)   // GET /nudge/api/v.1.0/meals/{meal_xid}
```

## Body Composition

```javascript
up.events.body.create()           // POST /nudge/api/v.1.0/users/@me/body_events

up.events.body.get()              // GET /nudge/api/v.1.0/users/@me/body_events

up.events.body.get(event_xid)     // GET /nudge/api/v.1.0/body_events/{event_xid}

up.events.body.delete(event_xid)  // DELETE /nudge/api/v.1.0/body_events/{event_xid}
```

## Cardiac Metrics

```javascript
up.events.cardiac.create()          // POST /nudge/api/v.1.0/users/@me/cardiac_events

up.events.cardiac.get()             // GET /nudge/api/v.1.0/users/@me/cardiac_events

up.events.cardiac.get(event_xid)    // GET /nudge/api/v.1.0/cardiac_events/{event_xid}

up.events.cardiac.delete(event_xid) // DELETE /nudge/api/v.1.0/cardiac_events/{event_xid}
```

## Generic Events

```javascript

// These are undocumented...
up.events.generic.get()           // GET /nudge/api/v.1.0/users/@me/generic_events
up.events.generic.get(event_xid)  // GET /nudge/api/v.1.0/generic_events/{event_xid}


up.events.generic.create()        // POST /nudge/api/v.1.0/users/@me/generic_events

```

## Mood

```javascript
up.mood.create()          // POST /nudge/api/v.1.0/users/@me/mood

up.mood.get()             // GET /nudge/api/v.1.0/users/@me/mood

up.mood.get(event_xid)    // GET /nudge/api/v.1.0/mood/{event_xid}

up.mood.delete(event_xid) // DELETE /nudge/api/v.1.0/mood/{event_xid}
```

## Time Zone

```javascript
up.timezone.get() // GET /nudge/api/v.1.0/users/@me/timezone
```
