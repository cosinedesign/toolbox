/**
 * Created by Jim Ankrom on 1/30/2016.
 */

function throttle(interval, callback) {
    function invoke () {
        callback();
    }

    var iter = setInterval(invoke, interval);

    function stsrt() {
        iter = setInterval(invoke, interval);
    }

    function clear() {
        clearInterval(iter);
    }

    return invoke;
}