node-jawbone-up
===============

Jawbone UP API Node.js Library 

```javascript
var up_config = { 
  client_id: 'xxx', // UP application api id
  client_secret: 'yyy', // UP application api secret
  access_token:'zzz' // access token for specific user
}

var up = require('jawbone-up')(up_config);

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
up.moves.get()              // GET /nudge/api/v.1.0/users/@me/moves

up.moves.get(move_xid)      // GET /nudge/api/v.1.0/moves/{move_xid}

up.moves.image(move_xid)    // GET /nudge/api/v.1.0/moves/{move_xid}/image

up.moves.snapshot(move_xid) // GET /nudge/api/v.1.0/moves/{move_xid}/snapshot

```

## Workouts

```javascript
up.workouts.all()                     // GET /nudge/api/v.1.0/users/@me/workouts

up.workouts.create()                  // POST /nudge/api/v.1.0/users/@me/workouts

up.workouts.get(workout_xid)          // GET /nudge/api/v.1.0/workouts/{workout_xid}

up.workouts.image.get(workout_xid)    // GET /nudge/api/v.1.0/workouts/{workout_xid}/image

up.workouts.snapshot.get(workout_xid) // GET /nudge/api/v.1.0/workouts/{workout_xid}/snapshot
```

## Sleeps

```javascript
up.sleeps.all()                   // GET /nudge/api/v.1.0/users/@me/sleeps

up.sleeps.get(sleep_xid)          // GET /nudge/api/v.1.0/sleeps/{sleep_xid}

up.sleeps.image.get(sleep_xid)    // GET /nudge/api/v.1.0/sleeps/{sleep_xid}/image

up.sleeps.snapshot.get(sleep_xid) // GET /nudge/api/v.1.0/sleeps/{sleep_xid}/snapshot
```

## Meals

```javascript
up.meals.all()          // GET /nudge/api/v.1.0/users/@me/meals

up.meals.create()       // POST /nudge/api/v.1.0/users/@me/meals

up.meals.get(meal_xid)  // GET /nudge/api/v.1.0/meals/{meal_xid}
```

## Body Composition

```javascript
up.body_events.create() // POST /nudge/api/v.1.0/users/@me/body_events

up.body_events.all() // GET /nudge/api/v.1.0/users/@me/body_events

up.body_events.get(event_xid) // GET /nudge/api/v.1.0/body_events/{event_xid}

up.body_events.delete(event_xid) // DELETE /nudge/api/v.1.0/body_events/{event_xid}
```

## Cardiac Metrics

```javascript
up.cardiac_events.create()          // POST /nudge/api/v.1.0/users/@me/cardiac_events

up.cardiac_events.all()             // GET /nudge/api/v.1.0/users/@me/cardiac_events

up.cardiac_events.get(event_xid)    // GET /nudge/api/v.1.0/cardiac_events/{event_xid}

up.cardiac_events.delete(event_xid) // DELETE /nudge/api/v.1.0/cardiac_events/{event_xid}
```

## Generic Events

```javascript
up.generic_events.create() // POST /nudge/api/v.1.0/users/@me/generic_events
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
