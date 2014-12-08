var up = require('../index')({});
var assert = require('assert');
var nock = require('nock');

nock.disableNetConnect();
var baseApi = nock('https://jawbone.com')
  .matchHeader('Authorization', /.*/);

describe('up', function(){
  describe('.moves', function(){
    describe('.get()', function(){
      it('should call correct url', function(done){
        var api = baseApi.matchHeader('Accept', 'application/json')
          .get('/nudge/api/v.1.1/users/@me/moves?')
          .reply(200, 'OK!');

        up.moves.get({}, function(err, body) {
          assert.equal(err, void 0);
          assert.equal(body, 'OK!');

          api.done();

          done();
        });
      });
    });

    describe('.get({ xid: 123 })', function(){
      it('should return correct url', function(done){
        var api = baseApi.matchHeader('Accept', 'application/json')
          .get('/nudge/api/v.1.1/moves/123')
          .reply(200, 'OK!');

        up.moves.get({ xid: 123 }, function(err, body) {
          assert.equal(err, void 0);
          assert.equal(body, 'OK!');

          api.done();

          done();
        });
      });
    });
  });
});
