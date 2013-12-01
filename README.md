node-jawbone-up
===============

Jawbone UP API Node.js Library

```javascript
var options = {
  access_token:  'zzz'   // Required: Access token for specific user
  client_id:     'xxx', // Optional: UP application api id (not used)
  client_secret: 'yyy', // Optional: UP application api secret (not used)
}

var up = require('jawbone-up')(options);
```

## User information

```javascript
up.me.get()       // GET /nudge/api/v.1.0/users/@me

up.friends.get()  // GET /nudge/api/v.1.0/users/@me/friends

up.mood.get()     // GET /nudge/api/v.1.0/users/@me/mood

up.trends.get()   // GET /nudge/api/v.1.0/users/@me/trends

up.goals.get()    // GET /nudge/api/v.1.0/users/@me/goals
```

## Moves

```javascript
up.moves.get({}, callback)              // GET /nudge/api/v.1.0/users/@me/moves

up.moves.get({ xid : move_xid }, callback)      // GET /nudge/api/v.1.0/moves/{move_xid}

up.moves.image({ xid : move_xid }, callback)    // GET /nudge/api/v.1.0/moves/{move_xid}/image

up.moves.snapshot({ xid : move_xid }, callback) // GET /nudge/api/v.1.0/moves/{move_xid}/snapshot

```

## Workouts

```javascript
up.workouts.get()                     // GET /nudge/api/v.1.0/users/@me/workouts

up.workouts.create()                  // POST /nudge/api/v.1.0/users/@me/workouts

up.workouts.get(workout_xid)          // GET /nudge/api/v.1.0/workouts/{workout_xid}

up.workouts.image.get(workout_xid)    // GET /nudge/api/v.1.0/workouts/{workout_xid}/image

up.workouts.snapshot.get(workout_xid) // GET /nudge/api/v.1.0/workouts/{workout_xid}/snapshot
```

## Sleeps

```javascript
up.sleeps.get()                   // GET /nudge/api/v.1.0/users/@me/sleeps

up.sleeps.get(sleep_xid)          // GET /nudge/api/v.1.0/sleeps/{sleep_xid}

up.sleeps.image.get(sleep_xid)    // GET /nudge/api/v.1.0/sleeps/{sleep_xid}/image

up.sleeps.snapshot.get(sleep_xid) // GET /nudge/api/v.1.0/sleeps/{sleep_xid}/snapshot

up.sleeps.delete(event_xid)       // DELETE /nudge/api/v.1.0/sleeps/{sleep_xid}
```

## Meals

```javascript
up.meals.get()          // GET /nudge/api/v.1.0/users/@me/meals

up.meals.create()       // POST /nudge/api/v.1.0/users/@me/meals

up.meals.get(meal_xid)  // GET /nudge/api/v.1.0/meals/{meal_xid}
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
