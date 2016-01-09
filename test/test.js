/**
 * Created by xialei on 2016/1/9 0009.
 */
require('should');
var cache = require('../index');
describe('test cache modules', function() {
	it('should success', function(done) {
		cache.set('test1', 'xialei').then(function() {
			done();
		}).catch(function(e) {
			done(e);
		});
	});
	it('should equal xialei', function(done) {
		cache.get('test1').then(function(data) {
			data.should.equal('xialei');
			done();
		}).catch(function(e) {
			done(e);
		});
	});
	it('should remove cache', function(done) {
		cache.remove('test').then(function() {
			done();
		}).catch(function(e) {
			done(e);
		});
	});
	it('should clean cache', function(done) {
		cache.clean().then(function() {
			done();
		}).catch(function(e) {
			done(e);
		});
	});
});