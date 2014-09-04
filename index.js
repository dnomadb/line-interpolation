function interpolateObject(inObj, field, callback) {
    var start = new Date();

    function interpolateBetween(fr, to, field) {
        var idRange = to.uid - fr.uid;
        var outPoints = [];
        var valueRange = fr[field] - to[field];
        for (var i = 1; i < idRange; i++) {
            var tOut = {
                uid: i + fr.uid
            };
            tOut[field] = (1 - (i / idRange)) * valueRange + to[field];
            outPoints.push(tOut);
        }
        return outPoints;
    }

    function buildObj(id, field, value) {
        var out = {
            uid: id
        };
        out[field] = value;
        return out;
    }

    function findBreaks(objArr, field) {
        var uVals = [];
        var firstNonNull = 0;
        for (var i = 0; i < objArr.length; i++) {
            var oObj;
            if (objArr[i][field] !== null && uVals.length === 0) {
                oObj = buildObj(i, field, objArr[i][field]);
                firstNonNull = i;
            } else if (objArr[i][field] !== null && objArr[i][field] !== uVals[uVals.length-1]) {
                oObj = buildObj(i, field, objArr[i][field]);
            } else if (i === objArr.length-1 && objArr[i][field] !== null) {
                oObj = buildObj(i, field, objArr[i][field]);
            } else if (i === objArr.length-1 && uVals.length !== 0) {
                oObj = buildObj(i, field, uVals[uVals.length-1][field]);
            }

            if (oObj) uVals.push(oObj);
        }
        return {
            breaks: uVals,
            startVal: firstNonNull
        };
    }

    function createBaseReturn(breaks) {
        var output = [];
        for (var i = 0; i<breaks.startVal+1;i++) {
            var tOut = {
                uid: i
            };
            tOut[field] = breaks.breaks[0][field];
            output.push(tOut);
        }
        return output;
    }

    var breaks = findBreaks(inObj, field);

    var output = createBaseReturn(breaks);

    for (var i=1; i< breaks.breaks.length; i++) {
        output = output.concat(interpolateBetween(breaks.breaks[i-1],breaks.breaks[i],field));
        output.push(breaks.breaks[i]);
    }
    console.log(new Date()-start);
    return callback(null, output);
}

module.exports = {
    interpolateObject: interpolateObject
};