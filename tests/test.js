var interpolate = require('../index.js');

var inObj = [
    {
        ele: null
    },
    {
        ele: 2
    },
    {
        ele: 2
    },
        {
        ele: null
    },
        {
        ele: 5
    },
    {
        ele: null
    },
    {
        ele: null
    }
];

var testObj = [];

for (var i=0; i<10000; i++) {
    testObj.push(inObj[Math.floor(Math.random()*inObj.length)]);
}

var a = interpolate.interpolateObject(testObj, 'ele', function(err, data) {
    if (err) throw err;
    console.log(data.length);
});