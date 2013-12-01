# node-jawbone-up

Jawbone UP API Node.js Library

## Installation

`npm install jawbone-up`

## Usage

An `access_token` attribute is required in the options object!
See below for an example of how this could be done. This library does not
assist in getting an `access_token` through OAuth, but once you get the token,
it will apparently last for a **year**.

```javascript
var options = {
  // ** REQUIRED **
  access_token:  'xyz'  // Access token for specific user
}

var up = require('jawbone-up')(options);
```

# Documentation

Generated docs hosted here: [ryanseys.github.io/node-jawbone-up/docs](http://ryanseys.github.io/node-jawbone-up/docs/)

You can generate docs yourself:

```
npm install
node_modules/.bin/jsdoc . -d docs
```

Or see below for an overview...

## User information

```javascript
// get user info
up.me.get({}, callback)             // GET /nudge/api/v.1.0/users/@me

// get friends of user
up.friends.get({}, callback)        // GET /nudge/api/v.1.0/users/@me/friends

// get mood of user
up.mood.get({}, callback)           // GET /nudge/api/v.1.0/users/@me/mood

// get trends of user
up.trends.get({}, callback)         // GET /nudge/api/v.1.0/users/@me/trends

// get goals of user
up.goals.get({}, callback)          // GET /nudge/api/v.1.0/users/@me/goals
```

## Moves

[Moves Documentation](http://ryanseys.github.io/node-jawbone-up/docs/moves.html)

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

[Workouts Documentation](http://ryanseys.github.io/node-jawbone-up/docs/workouts.html)

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

[Sleeps Documentation](http://ryanseys.github.io/node-jawbone-up/docs/sleeps.html)

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

[Meals Documentation](http://ryanseys.github.io/node-jawbone-up/docs/meals.html)

```javascript
// get all meals (paginated results)
up.meals.get({}, callback)                   // GET /nudge/api/v.1.0/users/@me/meals

// create a new meal
up.meals.create(options, callback)           // POST /nudge/api/v.1.0/users/@me/meals

// get a specific meal
up.meals.get({ xid : meal_xid }, callback)   // GET /nudge/api/v.1.0/meals/{meal_xid}
```

## Body Composition

[Body Events Documentation](http://ryanseys.github.io/node-jawbone-up/docs/events.body.html)

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

[Cardiac Events Documentation](http://ryanseys.github.io/node-jawbone-up/docs/events.cardiac.html)

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

[Generic Events Documentation](http://ryanseys.github.io/node-jawbone-up/docs/events.generic.html)

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

[Mood Documentation](http://ryanseys.github.io/node-jawbone-up/docs/mood.html)

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

[Timezone Documentation](http://ryanseys.github.io/node-jawbone-up/docs/timezone.html)

```javascript
// get a user's timezone
up.timezone.get({}, callback) // GET /nudge/api/v.1.0/users/@me/timezone
```

## Tests

Tests can be found in the `test` folder.

To run tests:

Make sure you first have dependencies installed by running

```bash
npm install
```

Then you may run all the tests with

```bash
npm test
```

# License

The MIT License (MIT)

Copyright (c) 2013 Ryan Seys

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

