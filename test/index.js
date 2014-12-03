var config = require('./config');
var should = require('should');
var nock = require('nock');
var up = require('../index')(config);

nock.disableNetConnect();
var baseApi = nock('https://jawbone.com:443');

describe('up', function(){
  describe('.moves', function(){
    describe('.get()', function(){
      it('should call correct url', function(done){
        var api = baseApi.matchHeader('Accept', 'application/json')
          .get('/nudge/api/v.1.1/users/@me/moves?')
          .reply(200, 'OK!');

        up.moves.get({}, function(err, body) {
          (err === null).should.be.true;
          body.should.equal('OK!');

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
          (err === null).should.be.true;
          body.should.equal('OK!');

          api.done();

          done();
        });
      });
    });
  });
});
