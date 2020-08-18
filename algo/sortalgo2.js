/**
 * Sort a Array
 *
 * @param arr 
 * @param dir asc or des 
 *
 */

exports.sortArray=function(arr,dir){
    dir=dir||'asc';
    if (arr.length == 0) return [];

    var left = new Array();
    var right = new Array();
    var tp = arr[0];

    if(dir==='asc'){
        for (var i = 1; i < arr.length; i++) {
            arr[i] < tp ? left.push(arr[i]): right.push(arr[i]);
        }
    }else{
        for (var i = 1; i < arr.length; i++) {
            arr[i] > tp ? left.push(arr[i]): right.push(arr[i]);
        }
    }
    return _this.sort(left,dir).concat(tp, _this.sort(right,dir));
}