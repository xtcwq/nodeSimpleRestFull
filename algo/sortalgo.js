/////////////////////////////////////////////////
// Bucket 
/////////////////////////////////////////////////
var _this = this  ;
var L = require('linklist');
/**
 * 
 *
 * @param arr 
 * @param num numbre of bucket
 *
 */
exports.sortBucket = function (arr, count) {
    if (arr.length == 0) return [];
    count = count || (count > 1 ? count : 10);

    
    var min = arr[0], max = arr[0];
    for (var i = 1; i < arr.length; i++) {
        min = min < arr[i] ? min : arr[i];
        max = max > arr[i] ? max : arr[i];
    }
    var tps = (max - min + 1) / count;
     console.log(min+","+max+","+tps);

    
    var buckets = [];

  
    for (var i = 0; i < arr.length; i++) {
        var idx = Math.floor((arr[i] - min) / tps); 

        if (buckets[idx]) {
            var bucket = buckets[idx];
            var insert = false;//point
            L.reTraversal(bucket, function (item, done) {
                if (arr[i] <= item.v) {//if small insert left
                    L.append(item, _val(arr[i]));
                    insert = true;
                    done();
                }
            });
            if (!insert) { //if big insert right
                L.append(bucket, _val(arr[i]));
            }
        } else { //if vide
            var bucket = L.init();
            L.append(bucket, _val(arr[i]));
            buckets[idx] = bucket; 
        }
    }

    var result = [];
    for (var i = 0, j = 0; i < count; i++) {
        L.reTraversal(buckets[i], function (item) {
            // console.log(i+":"+item.v);
            result[j++] = item.v;
        });
    }
    return result;
}

function _val(v) {
    return {v: v}
}