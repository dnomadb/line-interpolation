var interpolate = require('../index.js');
var assert = require("assert");
var testers = require('../tests/fixtures/testarrays.js');

describe('Should return the expected results', function() {
    it('should work with a mixed array', function(done) {
        var expected = '[{"uid":0,"ele":2},{"uid":1,"ele":2},{"uid":2,"ele":5},{"uid":3,"ele":10},{"uid":3,"ele":10},{"uid":3,"ele":10},{"uid":4,"ele":8.333333333333334},{"uid":5,"ele":6.666666666666667},{"uid":6,"ele":5},{"uid":7,"ele":5}]'
        var a = interpolate.interpolateObject(testers.inObj, 'ele', function(err, data) {
            assert.equal(expected, JSON.stringify(data));
            done()
        });
    });
    it('should return all nulls if no values present', function(done) {
        var expected = '[{"ele":null},{"ele":null},{"ele":null}]'
        var a = interpolate.interpolateObject(testers.nullObj, 'ele', function(err, data) {
            assert.equal(expected, JSON.stringify(data));
            done()
        });
    });
});
